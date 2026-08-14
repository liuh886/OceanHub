import { createClient } from 'npm:@supabase/supabase-js@2';

const allowedOrigins = new Set([
  'https://liuh886.github.io',
  'http://localhost:4321',
  'http://127.0.0.1:4321'
]);

const evidenceTypes = new Set([
  'reference-project',
  'field-asset',
  'dataset-deliverable',
  'procedure-method',
  'certification-accreditation',
  'personnel-credential',
  'publication-paper',
  'third-party-assessment'
]);

const idPattern = /^[a-z0-9][a-z0-9-]{0,119}$/;

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && allowedOrigins.has(origin) ? origin : 'https://liuh886.github.io';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin'
  };
}

function jsonResponse(origin: string | null, status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
  });
}

function cleanText(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function cleanId(value: unknown) {
  const id = cleanText(value, 120);
  return idPattern.test(id) ? id : '';
}

function uniqueStrings(values: unknown[]) {
  return [...new Set(values.filter((value): value is string => typeof value === 'string' && value.length > 0))];
}

function sameSet(left: string[], right: string[]) {
  if (left.length !== right.length) return false;
  const set = new Set(left);
  return right.every((value) => set.has(value));
}

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const secretKeyMap = Deno.env.get('SUPABASE_SECRET_KEYS');
const legacyServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const secretKey = secretKeyMap ? JSON.parse(secretKeyMap).default : legacyServiceRole;

if (!supabaseUrl || !secretKey) {
  throw new Error('Supabase Edge Function secrets are unavailable.');
}

const admin = createClient(supabaseUrl, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== 'POST') {
    return jsonResponse(origin, 405, { error: 'Method not allowed.' });
  }

  if (origin && !allowedOrigins.has(origin)) {
    return jsonResponse(origin, 403, { error: 'Origin not allowed.' });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(origin, 400, { error: 'Invalid JSON body.' });
  }

  const action = cleanText(body.action, 40);

  if (action === 'create_request') {
    const projectContext = cleanText(body.projectContext, 1200);
    const lifecycleStage = cleanText(body.lifecycleStage, 80);
    const decisionFocus = cleanText(body.decisionFocus, 120);
    const requiredCapabilities = Array.isArray(body.requiredCapabilities) ? body.requiredCapabilities : [];
    const providerRequests = Array.isArray(body.providerRequests) ? body.providerRequests : [];

    const requiredCapabilityIds = uniqueStrings(requiredCapabilities.map((item) => cleanId((item as Record<string, unknown>)?.id))).filter(Boolean);
    if (!projectContext || !lifecycleStage || !decisionFocus || requiredCapabilityIds.length < 1 || requiredCapabilityIds.length > 64) {
      return jsonResponse(origin, 400, { error: 'EOI request context or capability requirements are invalid.' });
    }
    if (providerRequests.length < 2 || providerRequests.length > 5) {
      return jsonResponse(origin, 400, { error: 'Select between 2 and 5 providers.' });
    }

    const normalizedProviders = providerRequests.map((raw) => {
      const item = raw as Record<string, unknown>;
      const providerId = cleanId(item.providerId);
      const providerName = cleanText(item.providerName, 240);
      const capabilityIds = uniqueStrings((Array.isArray(item.capabilityIds) ? item.capabilityIds : []).map(cleanId)).filter(Boolean);
      return { providerId, providerName, capabilityIds };
    });

    const providerIds = normalizedProviders.map((provider) => provider.providerId);
    const requiredSet = new Set(requiredCapabilityIds);
    const providersValid = normalizedProviders.every((provider) =>
      provider.providerId &&
      provider.providerName &&
      provider.capabilityIds.length > 0 &&
      provider.capabilityIds.every((capabilityId) => requiredSet.has(capabilityId))
    );

    if (!providersValid || uniqueStrings(providerIds).length !== providerIds.length) {
      return jsonResponse(origin, 400, { error: 'Provider response requirements are invalid.' });
    }

    const { data, error } = await admin
      .from('oceanhub_eoi_requests')
      .insert({
        project_context: projectContext,
        lifecycle_stage: lifecycleStage,
        decision_focus: decisionFocus,
        required_capability_ids: requiredCapabilityIds,
        provider_requests: normalizedProviders
      })
      .select('id,buyer_token')
      .single();

    if (error) {
      console.error('create_request failed', error);
      return jsonResponse(origin, 500, { error: 'Could not persist EOI request.' });
    }

    return jsonResponse(origin, 200, { requestId: data.id, buyerToken: data.buyer_token });
  }

  if (action === 'submit_response') {
    const requestId = cleanText(body.requestId, 80);
    const providerId = cleanId(body.providerId);
    const organization = cleanText(body.organization, 240);
    const contactEmail = cleanText(body.contactEmail, 320);
    const operatingRegion = cleanText(body.operatingRegion, 600);
    const assertions = Array.isArray(body.assertions) ? body.assertions : [];

    if (!requestId || !providerId || !organization || !contactEmail || !operatingRegion || !contactEmail.includes('@')) {
      return jsonResponse(origin, 400, { error: 'Supplier response identity fields are incomplete.' });
    }

    const { data: eoi, error: eoiError } = await admin
      .from('oceanhub_eoi_requests')
      .select('id,provider_requests')
      .eq('id', requestId)
      .single();

    if (eoiError || !eoi) {
      return jsonResponse(origin, 404, { error: 'EOI request not found.' });
    }

    const providerRequests = Array.isArray(eoi.provider_requests) ? eoi.provider_requests as Array<Record<string, unknown>> : [];
    const providerRequest = providerRequests.find((item) => item.providerId === providerId);
    const requestedCapabilityIds = providerRequest && Array.isArray(providerRequest.capabilityIds)
      ? uniqueStrings(providerRequest.capabilityIds.map(cleanId)).filter(Boolean)
      : [];

    if (!providerRequest || requestedCapabilityIds.length === 0) {
      return jsonResponse(origin, 400, { error: 'Provider is not part of this EOI request.' });
    }

    const normalizedAssertions = assertions.map((raw) => {
      const item = raw as Record<string, unknown>;
      return {
        capabilityId: cleanId(item.capabilityId),
        capabilityLabel: cleanText(item.capabilityLabel, 240),
        evidenceType: cleanText(item.evidenceType, 80),
        evidenceDetail: cleanText(item.evidenceDetail, 4000)
      };
    });

    const submittedCapabilityIds = uniqueStrings(normalizedAssertions.map((item) => item.capabilityId)).filter(Boolean);
    const assertionsValid = normalizedAssertions.length === requestedCapabilityIds.length && normalizedAssertions.every((item) =>
      item.capabilityId &&
      item.capabilityLabel &&
      evidenceTypes.has(item.evidenceType) &&
      item.evidenceDetail
    );

    if (!assertionsValid || !sameSet(submittedCapabilityIds, requestedCapabilityIds)) {
      return jsonResponse(origin, 400, { error: 'Capability evidence must cover exactly the requested provider capabilities.' });
    }

    const now = new Date().toISOString();
    const { data: response, error: responseError } = await admin
      .from('oceanhub_supplier_responses')
      .upsert({
        eoi_request_id: requestId,
        provider_id: providerId,
        organization,
        contact_email: contactEmail,
        operating_region: operatingRegion,
        updated_at: now
      }, { onConflict: 'eoi_request_id,provider_id' })
      .select('id')
      .single();

    if (responseError || !response) {
      console.error('submit_response failed', responseError);
      return jsonResponse(origin, 500, { error: 'Could not persist supplier response.' });
    }

    const rows = normalizedAssertions.map((item) => ({
      id: `${requestId}:${providerId}:${item.capabilityId}`,
      response_id: response.id,
      eoi_request_id: requestId,
      provider_id: providerId,
      capability_id: item.capabilityId,
      capability_label: item.capabilityLabel,
      evidence_type: item.evidenceType,
      evidence_detail: item.evidenceDetail,
      review_state: 'evidence-submitted',
      review_outcome: null,
      reviewer_notes: null,
      reviewed_by: null,
      reviewed_at: null,
      updated_at: now
    }));

    const { error: assertionsError } = await admin
      .from('oceanhub_capability_assertions')
      .upsert(rows, { onConflict: 'id' });

    if (assertionsError) {
      console.error('assertions upsert failed', assertionsError);
      return jsonResponse(origin, 500, { error: 'Could not persist capability assertions.' });
    }

    return jsonResponse(origin, 200, { responseId: response.id, reviewState: 'evidence-submitted' });
  }

  if (action === 'request_status') {
    const requestId = cleanText(body.requestId, 80);
    const buyerToken = cleanText(body.buyerToken, 80);
    if (!requestId || !buyerToken) {
      return jsonResponse(origin, 400, { error: 'Request ID and buyer token are required.' });
    }

    const { data: eoi, error: eoiError } = await admin
      .from('oceanhub_eoi_requests')
      .select('id,project_context,lifecycle_stage,decision_focus,provider_requests,created_at')
      .eq('id', requestId)
      .eq('buyer_token', buyerToken)
      .single();

    if (eoiError || !eoi) {
      return jsonResponse(origin, 404, { error: 'Tracked EOI request not found.' });
    }

    const { data: responses } = await admin
      .from('oceanhub_supplier_responses')
      .select('id,provider_id,submitted_at')
      .eq('eoi_request_id', requestId);

    const { data: assertions } = await admin
      .from('oceanhub_capability_assertions')
      .select('provider_id,capability_id,capability_label,review_state,review_outcome,reviewed_at')
      .eq('eoi_request_id', requestId);

    const responseByProvider = new Map((responses ?? []).map((response) => [response.provider_id, response]));
    const assertionsByProvider = new Map<string, typeof assertions>();
    for (const assertion of assertions ?? []) {
      const current = assertionsByProvider.get(assertion.provider_id) ?? [];
      current.push(assertion);
      assertionsByProvider.set(assertion.provider_id, current);
    }

    const providers = (Array.isArray(eoi.provider_requests) ? eoi.provider_requests as Array<Record<string, unknown>> : []).map((item) => {
      const providerId = cleanId(item.providerId);
      return {
        providerId,
        providerName: cleanText(item.providerName, 240),
        requestedCapabilityIds: Array.isArray(item.capabilityIds) ? item.capabilityIds.map(cleanId).filter(Boolean) : [],
        responseState: responseByProvider.has(providerId) ? 'evidence-submitted' : 'awaiting-response',
        submittedAt: responseByProvider.get(providerId)?.submitted_at ?? null,
        assertions: assertionsByProvider.get(providerId) ?? []
      };
    });

    return jsonResponse(origin, 200, {
      requestId: eoi.id,
      projectContext: eoi.project_context,
      lifecycleStage: eoi.lifecycle_stage,
      decisionFocus: eoi.decision_focus,
      createdAt: eoi.created_at,
      providers
    });
  }

  return jsonResponse(origin, 400, { error: 'Unknown action.' });
});
