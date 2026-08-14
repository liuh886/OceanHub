import { createClient } from 'npm:@supabase/supabase-js@2';

const allowedOrigins = new Set([
  'https://liuh886.github.io',
  'http://localhost:4321',
  'http://127.0.0.1:4321'
]);
const outcomes = new Set(['supported', 'partially-supported', 'insufficient']);

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && allowedOrigins.has(origin) ? origin : 'https://liuh886.github.io';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
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

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const secretKeyMap = Deno.env.get('SUPABASE_SECRET_KEYS');
const legacyServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const secretKey = secretKeyMap ? JSON.parse(secretKeyMap).default : legacyServiceRole;
if (!supabaseUrl || !secretKey) throw new Error('Supabase Edge Function secrets are unavailable.');

const admin = createClient(supabaseUrl, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function authenticate(request: Request) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: membership } = await admin.from('membership_admins')
    .select('role,active')
    .eq('user_id', data.user.id)
    .eq('active', true)
    .maybeSingle();
  if (!membership) return null;
  return { user: data.user, role: membership.role };
}

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (request.method !== 'POST') return jsonResponse(origin, 405, { error: 'Method not allowed.' });
  if (origin && !allowedOrigins.has(origin)) return jsonResponse(origin, 403, { error: 'Origin not allowed.' });

  const reviewer = await authenticate(request);
  if (!reviewer) return jsonResponse(origin, 401, { error: 'Active OceanHub reviewer authentication required.' });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(origin, 400, { error: 'Invalid JSON body.' });
  }
  const action = cleanText(body.action, 40);

  if (action === 'queue') {
    const { data: responses, error } = await admin.from('oceanhub_supplier_responses')
      .select('id,eoi_request_id,provider_id,organization,contact_email,operating_region,not_claimed_capability_ids,submitted_at,updated_at,oceanhub_eoi_requests(project_context,lifecycle_stage,decision_focus,created_at),oceanhub_capability_assertions(id,capability_id,capability_label,evidence_type,evidence_detail,review_state,review_outcome,reviewer_notes,reviewed_at,submitted_at,updated_at)')
      .order('submitted_at', { ascending: true });
    if (error) {
      console.error('review queue failed', error);
      return jsonResponse(origin, 500, { error: 'Could not load review queue.' });
    }
    return jsonResponse(origin, 200, { reviewer: { email: reviewer.user.email, role: reviewer.role }, responses: responses ?? [] });
  }

  if (action === 'start_review') {
    const assertionId = cleanText(body.assertionId, 500);
    if (!assertionId) return jsonResponse(origin, 400, { error: 'Assertion ID is required.' });
    const { data, error } = await admin.from('oceanhub_capability_assertions')
      .update({ review_state: 'under-review', review_outcome: null, reviewer_notes: null, reviewed_by: null, reviewed_at: null, updated_at: new Date().toISOString() })
      .eq('id', assertionId)
      .select('id,review_state')
      .single();
    if (error) return jsonResponse(origin, 404, { error: 'Assertion not found or could not be opened for review.' });
    return jsonResponse(origin, 200, data);
  }

  if (action === 'complete_review') {
    const assertionId = cleanText(body.assertionId, 500);
    const outcome = cleanText(body.outcome, 40);
    const note = cleanText(body.note, 4000);
    if (!assertionId || !outcomes.has(outcome)) return jsonResponse(origin, 400, { error: 'Assertion ID and valid review outcome are required.' });
    const now = new Date().toISOString();
    const { data, error } = await admin.from('oceanhub_capability_assertions')
      .update({
        review_state: 'reviewed',
        review_outcome: outcome,
        reviewer_notes: note || null,
        reviewed_by: reviewer.user.id,
        reviewed_at: now,
        updated_at: now
      })
      .eq('id', assertionId)
      .select('id,review_state,review_outcome,reviewed_at')
      .single();
    if (error) return jsonResponse(origin, 404, { error: 'Assertion not found or could not be reviewed.' });
    return jsonResponse(origin, 200, data);
  }

  return jsonResponse(origin, 400, { error: 'Unknown action.' });
});
