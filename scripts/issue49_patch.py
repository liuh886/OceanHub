from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def replace_once(path: str, old: str, new: str) -> None:
    file = ROOT / path
    text = file.read_text(encoding='utf-8')
    if old not in text:
        raise RuntimeError(f'missing patch anchor in {path}: {old[:100]!r}')
    file.write_text(text.replace(old, new, 1), encoding='utf-8')


# Layout: one theme constant source + complete external connection/no-JS contract.
replace_once(
    'src/layouts/Layout.astro',
    "import ThemeToggle from '../components/ThemeToggle.astro';\n",
    "import ThemeToggle from '../components/ThemeToggle.astro';\nimport { DARK_THEME_COLOR, LIGHT_THEME_COLOR, THEME_STORAGE_KEY } from '../lib/theme';\n",
)
replace_once(
    'src/layouts/Layout.astro',
    '''    <script is:inline>\n      (() => {\n        const storageKey = 'oceanhub-theme';''',
    '''    <script is:inline define:vars={{ themeStorageKey: THEME_STORAGE_KEY, lightThemeColor: LIGHT_THEME_COLOR, darkThemeColor: DARK_THEME_COLOR }}>\n      (() => {''',
)
replace_once('src/layouts/Layout.astro', "localStorage.getItem(storageKey)", "localStorage.getItem(themeStorageKey)")
replace_once('src/layouts/Layout.astro', "theme === 'light' ? '#F5F8FC' : '#040812'", "theme === 'light' ? lightThemeColor : darkThemeColor")
replace_once(
    'src/layouts/Layout.astro',
    '''    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700;800;900&display=swap" rel="stylesheet" />\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" media="print" onload="this.media='all'" />''',
    '''    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700;800;900&display=swap" rel="stylesheet" />\n    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin />\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" media="print" onload="this.media='all'" />\n    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" /></noscript>''',
)
replace_once(
    'src/layouts/Layout.astro',
    '''    <script>\n      const themeStorageKey = 'oceanhub-theme';''',
    '''    <script define:vars={{ themeStorageKey: THEME_STORAGE_KEY, lightThemeColor: LIGHT_THEME_COLOR, darkThemeColor: DARK_THEME_COLOR }}>''',
)
replace_once('src/layouts/Layout.astro', "theme === 'light' ? '#F5F8FC' : '#040812'", "theme === 'light' ? lightThemeColor : darkThemeColor")

# Modal: visible copy failure, focus trap/restore, inert background and scroll ownership.
replace_once(
    'src/components/CollaborationModal.astro',
    '''  aria-modal="true"\n  aria-labelledby="collaboration-modal-title"''',
    '''  aria-modal="true"\n  aria-labelledby="collaboration-modal-title"\n  aria-describedby="collaboration-modal-description"''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''      <p id="collaboration-footnote" class="max-w-xl text-[11px] leading-relaxed text-slate-500">Non-binding project inquiry. No commercial engagement is created by preparing this draft.</p>\n      <button id="collaboration-copy" type="button" class="shrink-0 rounded-xl bg-cyan-400 px-5 py-3 text-xs font-black text-slate-950 hover:bg-cyan-300">Copy project inquiry</button>''',
    '''      <div class="max-w-xl">\n        <p id="collaboration-footnote" class="text-[11px] leading-relaxed text-slate-500">Non-binding project inquiry. No commercial engagement is created by preparing this draft.</p>\n        <p id="collaboration-action-status" class="mt-1 text-[11px] leading-relaxed text-amber-300" role="status" aria-live="polite"></p>\n      </div>\n      <button id="collaboration-copy" type="button" class="shrink-0 rounded-xl bg-cyan-400 px-5 py-3 text-xs font-black text-slate-950 hover:bg-cyan-300">Copy project inquiry</button>''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''  const footnote = document.getElementById('collaboration-footnote');\n  const orgInput''',
    '''  const footnote = document.getElementById('collaboration-footnote');\n  const actionStatus = document.getElementById('collaboration-action-status');\n  const orgInput''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''  let intent: 'project' | 'partner' = 'project';''',
    '''  let intent: 'project' | 'partner' = 'project';\n  let lastTrigger: HTMLElement | null = null;\n\n  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';\n\n  function setBackgroundInert(inert: boolean) {\n    document.querySelectorAll<HTMLElement>('body > nav, body > main, body > footer, body > .skip-link').forEach((element) => {\n      if (inert) element.setAttribute('inert', '');\n      else element.removeAttribute('inert');\n    });\n    document.body.classList.toggle('collaboration-modal-open', inert);\n  }''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''  async function copyDraft() {\n    const draft = intent === 'project' ? projectDraft() : partnerDraft();\n    await navigator.clipboard.writeText(draft);\n    if (!copyButton) return;\n    const original = copyButton.textContent || '';\n    copyButton.textContent = 'Copied';\n    window.setTimeout(() => {\n      copyButton.textContent = original;\n    }, 1800);\n  }''',
    '''  function legacyCopy(text: string) {\n    const textarea = document.createElement('textarea');\n    textarea.value = text;\n    textarea.setAttribute('readonly', '');\n    textarea.style.position = 'fixed';\n    textarea.style.opacity = '0';\n    document.body.appendChild(textarea);\n    textarea.select();\n    const copied = document.execCommand('copy');\n    textarea.remove();\n    return copied;\n  }\n\n  async function copyDraft() {\n    const draft = intent === 'project' ? projectDraft() : partnerDraft();\n    let copied = false;\n    try {\n      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');\n      await navigator.clipboard.writeText(draft);\n      copied = true;\n    } catch {\n      try { copied = legacyCopy(draft); } catch { copied = false; }\n    }\n    if (!copyButton) return;\n    const original = copyButton.textContent || '';\n    if (copied) {\n      copyButton.textContent = 'Copied';\n      if (actionStatus) actionStatus.textContent = '';\n    } else {\n      copyButton.textContent = 'Copy failed';\n      if (actionStatus) actionStatus.textContent = 'Automatic copy failed. Download the draft instead, then attach or paste it into your message.';\n    }\n    window.setTimeout(() => { copyButton.textContent = original; }, 1800);\n  }''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''  function openModal(nextIntent: 'project' | 'partner', jipId?: string, capabilityId?: string) {\n    setIntent(nextIntent);''',
    '''  function openModal(nextIntent: 'project' | 'partner', jipId?: string, capabilityId?: string) {\n    lastTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;\n    setIntent(nextIntent);''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''    modal?.classList.remove('hidden');\n    modal?.classList.add('flex');\n    orgInput?.focus();\n  }\n\n  function closeModal() {\n    modal?.classList.add('hidden');\n    modal?.classList.remove('flex');\n  }''',
    '''    modal?.classList.remove('hidden');\n    modal?.classList.add('flex');\n    setBackgroundInert(true);\n    if (actionStatus) actionStatus.textContent = '';\n    orgInput?.focus();\n  }\n\n  function closeModal() {\n    modal?.classList.add('hidden');\n    modal?.classList.remove('flex');\n    setBackgroundInert(false);\n    lastTrigger?.focus();\n    lastTrigger = null;\n  }''',
)
replace_once(
    'src/components/CollaborationModal.astro',
    '''  document.addEventListener('keydown', (event) => {\n    if (event.key === 'Escape' && !modal?.classList.contains('hidden')) closeModal();\n  });''',
    '''  document.addEventListener('keydown', (event) => {\n    if (modal?.classList.contains('hidden')) return;\n    if (event.key === 'Escape') {\n      event.preventDefault();\n      closeModal();\n      return;\n    }\n    if (event.key !== 'Tab' || !modal) return;\n    const focusable = Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => !element.hidden && element.getClientRects().length > 0);\n    if (!focusable.length) return;\n    const first = focusable[0];\n    const last = focusable[focusable.length - 1];\n    if (event.shiftKey && document.activeElement === first) {\n      event.preventDefault();\n      last.focus();\n    } else if (!event.shiftKey && document.activeElement === last) {\n      event.preventDefault();\n      first.focus();\n    }\n  });''',
)

# Email handoff: long drafts never rely on a giant mailto body; download is always available.
replace_once(
    'src/components/CollaborationEmailAction.astro',
    '''  const partnerPanel = document.getElementById('partner-intake');''',
    '''  const partnerPanel = document.getElementById('partner-intake');\n  const actionStatus = document.getElementById('collaboration-action-status');\n  const MAX_MAILTO_LENGTH = 1800;''',
)
replace_once(
    'src/components/CollaborationEmailAction.astro',
    '''    copyButton.insertAdjacentElement('afterend', emailLink);''',
    '''    copyButton.insertAdjacentElement('afterend', emailLink);\n\n    const downloadButton = document.createElement('button');\n    downloadButton.type = 'button';\n    downloadButton.id = 'collaboration-download-draft';\n    downloadButton.className = 'shrink-0 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black text-white hover:bg-white/10';\n    downloadButton.textContent = 'Download draft';\n    emailLink.insertAdjacentElement('afterend', downloadButton);''',
)
replace_once(
    'src/components/CollaborationEmailAction.astro',
    '''      emailLink.textContent = partner ? 'Email evidence packet' : 'Email project inquiry';\n      emailLink.href = `mailto:${intakeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildDraft())}`;''',
    '''      const draft = buildDraft();\n      const fullMailto = `mailto:${intakeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`;\n      const tooLong = fullMailto.length > MAX_MAILTO_LENGTH;\n      emailLink.textContent = tooLong ? 'Email (attach draft)' : (partner ? 'Email evidence packet' : 'Email project inquiry');\n      emailLink.href = tooLong\n        ? `mailto:${intakeEmail}?subject=${encodeURIComponent(subject)}`\n        : fullMailto;\n      if (actionStatus) {\n        actionStatus.textContent = tooLong\n          ? 'This draft is too long for a reliable mail link. Download it, then attach or paste the complete draft before sending.'\n          : '';\n      }''',
)
replace_once(
    'src/components/CollaborationEmailAction.astro',
    '''    modal.addEventListener('input', updateEmailLink);''',
    '''    downloadButton.addEventListener('click', () => {\n      const blob = new Blob([buildDraft()], { type: 'text/plain;charset=utf-8' });\n      const href = URL.createObjectURL(blob);\n      const anchor = document.createElement('a');\n      anchor.href = href;\n      anchor.download = isPartnerIntent() ? 'oceanhub-partner-evidence.txt' : 'oceanhub-project-inquiry.txt';\n      document.body.appendChild(anchor);\n      anchor.click();\n      anchor.remove();\n      URL.revokeObjectURL(href);\n    });\n\n    modal.addEventListener('input', updateEmailLink);''',
)

# Theme CSS: replace fuzzy utility-family selectors with exact currently-used tokens.
theme_path = ROOT / 'src/styles/theme.css'
theme = theme_path.read_text(encoding='utf-8')
sources = '\n'.join(
    path.read_text(encoding='utf-8')
    for path in (ROOT / 'src').rglob('*')
    if path.suffix in {'.astro', '.ts', '.tsx'}
)

def tokens_for(*prefixes: str):
    tokens = set(re.findall(r"[A-Za-z0-9_:\-\[\]#./]+", sources))
    return sorted(token for token in tokens if any(token.startswith(prefix) for prefix in prefixes))

families = [
    (("bg-slate-950/", "bg-slate-900/"), '#ffffff'),
    (("bg-cyan-950/",), '#ecfeff'),
    (("bg-emerald-950/",), '#ecfdf5'),
    (("bg-blue-950/",), '#eff6ff'),
    (("bg-amber-950/",), '#fffbeb'),
]
for prefixes, color in families:
    pattern = re.compile(r"(?:html\[data-theme='light'\] \[class\*='(?:" + '|'.join(re.escape(p) for p in prefixes) + r")[^']*'\](?:,\n)?)+ \{\n  background-color: " + re.escape(color) + r" !important;\n\}")
    match = pattern.search(theme)
    if not match:
        # Known current blocks have one selector per prefix; handle exact original text directly.
        if len(prefixes) == 2:
            old = "html[data-theme='light'] [class*='bg-slate-950/'],\nhtml[data-theme='light'] [class*='bg-slate-900/'] {\n  background-color: #ffffff !important;\n}"
        else:
            old = f"html[data-theme='light'] [class*='{prefixes[0]}'] {{\n  background-color: {color} !important;\n}}"
        if old not in theme:
            raise RuntimeError(f'missing theme block for {prefixes}')
        selectors = tokens_for(*prefixes)
        replacement = ',\n'.join(f"html[data-theme='light'] [class~='{token}']" for token in selectors) + f" {{\n  background-color: {color} !important;\n}}"
        theme = theme.replace(old, replacement, 1)

old = "html[data-theme='light'] [class*='bg-[#0'] {\n  background-color: var(--theme-surface) !important;\n  background-image: none !important;\n}"
if old not in theme:
    raise RuntimeError('missing arbitrary dark surface theme block')
arbitrary = tokens_for('bg-[#0')
replacement = ',\n'.join(f"html[data-theme='light'] [class~='{token}']" for token in arbitrary) + " {\n  background-color: var(--theme-surface) !important;\n  background-image: none !important;\n}"
theme = theme.replace(old, replacement, 1)
if "[class*='" in theme:
    raise RuntimeError('fuzzy light-theme class selector remains')
theme += "\nbody.collaboration-modal-open {\n  overflow: hidden;\n}\n"
theme_path.write_text(theme, encoding='utf-8')

# Browser conversion contract: modal a11y + copy fallback + mailto length/download behavior.
path = ROOT / 'scripts/test-conversion-paths.mjs'
test = path.read_text(encoding='utf-8')
old = """  await page.getByRole('button', { name: 'Join as a Partner' }).click();\n  await page.getByRole('heading', { name: 'Present capability evidence' }).waitFor();"""
new = """  const partnerTrigger = page.getByRole('button', { name: 'Join as a Partner' });\n  await partnerTrigger.focus();\n  await partnerTrigger.click();\n  await page.getByRole('heading', { name: 'Present capability evidence' }).waitFor();\n  assert(await page.evaluate(() => getComputedStyle(document.body).overflow) === 'hidden', 'Open collaboration modal does not own background scrolling.');\n  assert(await page.locator('main').getAttribute('inert') === '', 'Open collaboration modal does not inert the page background.');"""
if old not in test:
    raise RuntimeError('conversion partner trigger anchor missing')
test = test.replace(old, new, 1)
old = """  await page.getByRole('button', { name: 'Close collaboration form' }).click();\n\n  await page.goto(route('scope/'), { waitUntil: 'networkidle' });"""
new = """  await page.getByRole('button', { name: 'Close collaboration form' }).click();\n  assert(await partnerTrigger.evaluate((element) => element === document.activeElement), 'Closing collaboration modal did not restore trigger focus.');\n  assert(await page.evaluate(() => getComputedStyle(document.body).overflow) !== 'hidden', 'Closing collaboration modal did not release background scrolling.');\n\n  await page.goto(route('scope/'), { waitUntil: 'networkidle' });"""
if old not in test:
    raise RuntimeError('conversion partner close anchor missing')
test = test.replace(old, new, 1)
old = """  assert(projectMailto.body.includes('Define a defensible pre-FEED monitoring evidence plan.'), 'Project inquiry email body did not include the project decision.');\n  await page.getByRole('button', { name: 'Close collaboration form' }).click();"""
new = """  assert(projectMailto.body.includes('Define a defensible pre-FEED monitoring evidence plan.'), 'Project inquiry email body did not include the project decision.');\n\n  await page.evaluate(() => {\n    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('blocked')) } });\n    document.execCommand = () => false;\n  });\n  await page.locator('#collaboration-copy').click();\n  await page.getByText('Automatic copy failed. Download the draft instead, then attach or paste it into your message.').waitFor();\n\n  await page.locator('#project-context').fill('x'.repeat(2600));\n  const guardedMailto = decodeMailto(await page.locator('#collaboration-email-draft').getAttribute('href'));\n  assert(guardedMailto.body === '', 'Long inquiry still relies on a potentially truncated mailto body.');\n  await page.getByText('This draft is too long for a reliable mail link. Download it, then attach or paste the complete draft before sending.').waitFor();\n  const downloadPromise = page.waitForEvent('download');\n  await page.locator('#collaboration-download-draft').click();\n  const download = await downloadPromise;\n  assert(download.suggestedFilename() === 'oceanhub-project-inquiry.txt', 'Draft download uses an unexpected filename.');\n\n  await page.getByRole('button', { name: 'Close collaboration form' }).click();"""
if old not in test:
    raise RuntimeError('conversion project mailto anchor missing')
test = test.replace(old, new, 1)
path.write_text(test, encoding='utf-8')
