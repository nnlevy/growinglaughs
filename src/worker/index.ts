export interface Env {
  DB?: D1Database;
  ASSETS: Fetcher;
}

const BRAND_CSS = `
:root{--gl-green:#3FBF4E;--gl-green-dark:#2E9E3C;--gl-leaf:#57D463;--gl-belly:#B9EFAB;--gl-sun:#FFC93C;--gl-ink:#26332B;--gl-cream:#FFF9EC;--gl-blush:#FF9FB1}
body{font-family:system-ui,sans-serif;background:var(--gl-cream);color:var(--gl-ink)}
`;

const SHELL = (title: string, content: string) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · growinglaughs.com</title>
<link rel="icon" href="/favicon.svg"><script src="https://cdn.tailwindcss.com"></script><style>${BRAND_CSS} .nav a.active{color:var(--gl-green);font-weight:600}</style></head>
<body class="bg-[var(--gl-cream)] text-[var(--gl-ink)]">
<nav class="border-b bg-white sticky top-0 z-50"><div class="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6"><a href="/" class="flex items-center gap-2"><img src="/logo-full.svg" class="h-8" alt="Sprig"><span class="font-bold text-xl">LaughPath</span></a><div class="flex gap-5 text-sm"><a href="/break">Break</a><a href="/gym">Gym</a><a href="/roleplay">Roleplay</a><a href="/streak">Streak</a></div><div class="flex-1"></div><a href="/about" class="text-xs px-3 py-1 rounded border">About</a></div></nav>
<main class="max-w-5xl mx-auto px-4 py-8">${content}</main>
<footer class="max-w-5xl mx-auto px-4 py-6 text-xs text-gray-500 border-t">© 2026 LaughPath · Adults 18-34 · <a href="/privacy">Privacy</a> · No therapy claims · Age gate 16+</footer>
<script src="/gs-mascot.js"></script></body></html>`;

const ROUTES: Record<string, string> = {
  '/': `<div class="max-w-2xl"><div class="inline px-3 py-1 bg-[var(--gl-green)] text-white rounded text-xs tracking-widest mb-3">DUOLINGO × HEADSPACE FOR HUMOR</div><h1 class="text-6xl font-bold tracking-tighter mb-4">Feel lighter in minutes.<br>Become funnier over weeks.</h1><p class="text-xl mb-8">Daily micro-lessons, 30-second resets, and safe AI roleplay for adults 18–34.</p><a href="/break" class="inline-block px-8 py-4 bg-[var(--gl-green)] text-white rounded-2xl font-semibold text-lg">Start a Laugh Break →</a><div class="mt-12" id="sprig"></div></div>`,
  '/break': `<h2 class="text-3xl font-semibold mb-4">Laugh Break</h2><div class="prose max-w-none"><p>30–180s guided reset. Read, breathe, rate the lift.</p><button onclick="rateLift()" class="mt-4 px-6 py-3 bg-[var(--gl-green)] text-white rounded-xl">Begin 60s reset</button><div id="lift" class="mt-6 hidden">Mood lift: <input type="range" min="1" max="5" oninput="window.GiggleSprout?.laugh(this.value)"> <span id="val">3</span></div></div>`,
  '/gym': `<h2 class="text-3xl font-semibold mb-4">Humor Gym</h2><div class="p-6 bg-white rounded-2xl border"><p class="font-medium mb-2">Lesson 1 · Observation</p><p>Notice three neutral things in your current room. Turn one into an unexpected twist. (Office-safe example: “The stapler is judging my TPS reports again.”)</p><button onclick="window.GiggleSprout?.celebrate()" class="mt-4 px-5 py-2 bg-[var(--gl-green)] text-white rounded-xl">Mark complete</button></div>`,
  '/roleplay': `<h2 class="text-3xl font-semibold mb-4">AI Roleplay</h2><div class="grid md:grid-cols-3 gap-4"><div class="p-4 border rounded-2xl"><b>Work meeting</b><br><button class="mt-3 text-sm underline">Start (safe banter)</button></div><div class="p-4 border rounded-2xl"><b>Date small-talk</b><br><button class="mt-3 text-sm underline">Start</button></div><div class="p-4 border rounded-2xl"><b>Friends catch-up</b><br><button class="mt-3 text-sm underline">Start</button></div></div><p class="text-xs mt-4 text-gray-500">Safety prompt active: brand-safe, no hate/self-harm/sexual content.</p>`,
  '/streak': `<h2 class="text-3xl font-semibold mb-4">Streak & Map</h2><div class="p-6 bg-white rounded-2xl"><div class="text-5xl font-mono">7 🔥</div><div class="text-sm">Current streak · localStorage v0.1</div><div class="mt-4 h-2 bg-[var(--gl-belly)] rounded"><div class="w-3/4 h-2 bg-[var(--gl-green)] rounded"></div></div></div>`,
  '/privacy': `<h2 class="text-3xl font-semibold mb-4">Privacy</h2><p>Local-first. No therapy claims. Age gate 16+. Data stays in browser until you opt in to cloud sync.</p>`,
  '/about': `<h2 class="text-3xl font-semibold mb-4">About LaughPath</h2><p>Positioning: Duolingo meets Headspace for humor. Adults 18–34. Brand-safe humor only.</p>`
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const p = url.pathname;
    if (p === '/favicon.svg') return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#3FBF4E"/><circle cx="32" cy="32" r="18" fill="#FFF9EC"/></svg>', {headers:{'Content-Type':'image/svg+xml'}});
    if (p === '/logo-full.svg') return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><text x="10" y="40" font-size="32" fill="#3FBF4E" font-weight="700">LaughPath</text></svg>', {headers:{'Content-Type':'image/svg+xml'}});
    if (p === '/gs-mascot.js') return new Response(`window.GiggleSprout={laugh:l=>console.log('laugh',l),celebrate:()=>console.log('celebrate'),grow:()=>console.log('grow')};`, {headers:{'Content-Type':'application/javascript'}});
    if (ROUTES[p]) return new Response(SHELL(p === '/' ? 'LaughPath' : p.slice(1), ROUTES[p]), {headers:{'Content-Type':'text/html; charset=utf-8'}});
    try { const a = await env.ASSETS.fetch(request); if (a.status !== 404) return a; } catch {}
    return new Response(SHELL('LaughPath', ROUTES['/']), {headers:{'Content-Type':'text/html; charset=utf-8'}});
  }
};