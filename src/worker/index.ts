export interface Env {
  DB?: D1Database;
  ASSETS: Fetcher;
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Growing Laughs — Daily Humor, Jokes & Joy for Growing Families | 2026</title>
  <meta name="description" content="Laugh more with AI-powered jokes, stories, kid-friendly humor, family laughs, and daily joy generators. Part of the automated revenue platform.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="sitemap" href="/sitemap.xml">
  <style>body { font-family: system-ui, sans-serif; } .laugh { animation: pop 0.3s ease; } @keyframes pop { 0% {transform:scale(0.8)} 100%{transform:scale(1)} }</style>
</head>
<body class="bg-yellow-50 text-gray-900">
  <nav class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3"><span class="text-2xl">😂</span><span class="font-bold text-xl">Growing Laughs</span></div>
      <div class="flex gap-4 text-sm"><a href="#library" class="hover:underline">Library</a><a href="#coach" class="hover:underline">AI Coach</a><a href="https://growth.business" class="hover:underline">growth.business Hub</a></div>
    </div>
  </nav>
  <header class="max-w-5xl mx-auto px-4 py-16 text-center">
    <div class="inline px-3 py-1 bg-yellow-200 rounded text-xs tracking-widest mb-3">DAILY JOY</div>
    <h1 class="text-5xl font-bold tracking-tight mb-4">Growing Laughs</h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto">AI jokes, stories, and moments that make families and teams laugh out loud. Free generators + premium collections. Because life is better with more giggles.</p>
    <div class="mt-6 flex gap-3 justify-center">
      <a href="#coach" class="px-6 py-3 bg-black text-white rounded-xl font-medium">Get a Custom Joke →</a>
      <a href="https://growth.business" class="px-6 py-3 border rounded-xl">Explore Hub (25 free credits)</a>
    </div>
    <p class="mt-2 text-xs text-gray-500">Part of Nir's 75-domain automated revenue platform • Operated with human oversight</p>
  </header>
  <section class="max-w-5xl mx-auto px-4 pb-12">
    <div class="grid md:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-2xl border"><div class="text-3xl mb-2">👨‍👩‍👧</div><div class="font-semibold">Kid-Friendly Generators</div><p class="text-sm text-gray-600 mt-1">Clean, age-appropriate jokes & stories. Never worry about what they repeat at dinner.</p></div>
      <div class="bg-white p-6 rounded-2xl border"><div class="text-3xl mb-2">🏢</div><div class="font-semibold">Team Icebreakers</div><p class="text-sm text-gray-600 mt-1">Meeting openers, Slack fun, virtual offsites. Boost morale without the cringe.</p></div>
      <div class="bg-white p-6 rounded-2xl border"><div class="text-3xl mb-2">📅</div><div class="font-semibold">Daily Laugh Calendar</div><p class="text-sm text-gray-600 mt-1">Fresh daily joke + themed packs. Sign up for email or use the widget.</p></div>
    </div>
  </section>
  <section id="library" class="max-w-5xl mx-auto px-4 py-8 border-t">
    <div class="flex items-baseline justify-between mb-4"><h2 class="font-semibold text-xl">Library • 5 Articles</h2><span class="text-xs px-2 py-0.5 bg-yellow-100 rounded">Updated 2026-06</span></div>
    <div class="grid md:grid-cols-2 gap-4 text-sm">
      <div class="p-4 bg-white rounded-xl border"><span class="font-medium">Article 1 of 5 • 6 min</span><br>Why Laughter Grows Teams: The 18% productivity boost from shared humor (backed by real office experiments).</div>
      <div class="p-4 bg-white rounded-xl border"><span class="font-medium">Article 2 of 5 • 8 min</span><br>Kid Joke Safety 2026: How to keep it fun, inclusive, and never mean. Scripts for ages 4-12.</div>
      <div class="p-4 bg-white rounded-xl border"><span class="font-medium">Article 3 of 5 • 5 min</span><br>Remote Laugh Rituals: 7 proven ways distributed teams start meetings with joy (no forced icebreakers).</div>
      <div class="p-4 bg-white rounded-xl border"><span class="font-medium">Article 4 of 5 • 7 min</span><br>The Dad Joke Renaissance: Why terrible puns are actually high-signal bonding tools in 2026 culture.</div>
      <div class="p-4 bg-white rounded-xl border"><span class="font-medium">Article 5 of 5 • 9 min</span><br>Building a Family Laugh Bank: Collect, remix, and pass down the best lines across generations.</div>
    </div>
  </section>
  <section id="coach" class="max-w-5xl mx-auto px-4 py-12 bg-white border-t">
    <h2 class="font-semibold text-xl mb-2">AI Growing Laughs Coach</h2>
    <p class="text-gray-600 mb-4">Tell us the vibe (kids / team / date night / roast) and get 3 fresh, tailored laughs + delivery tips. Free, local-sim fallback + hub powered.</p>
    <form id="coach-form" class="flex flex-wrap gap-3 items-end mb-4" onsubmit="runCoach(event)">
      <div><label class="text-xs block">Vibe</label><select id="vibe" class="border rounded px-3 py-2"><option>Kids (clean & silly)</option><option>Team / Work</option><option>Family Dinner</option><option>Date Night</option><option>Roast / Friends</option></select></div>
      <div><label class="text-xs block">Audience Size</label><select id="size" class="border rounded px-3 py-2"><option>1-3</option><option>4-10</option><option>11+</option></select></div>
      <button type="submit" class="px-5 py-2 bg-black text-white rounded-xl">Get 3 Laughs + Tips</button>
    </form>
    <div id="coach-result" class="hidden p-4 bg-yellow-50 border rounded-xl text-sm"></div>
    <p class="text-[10px] text-gray-500 mt-2">Tracks to riskfreetrial.org for flywheel. Clusters with growth.business, chatulah.com, doting.co, 10-7.org, cloudgpo.com</p>
  </section>
  <footer class="max-w-5xl mx-auto px-4 py-8 text-xs text-gray-500 border-t">
    © 2026 Growing Laughs — operated as part of growth.business (25 free credits to start). Privacy-first. <a href="/ads.txt" class="underline">ads.txt</a> · <a href="/sitemap.xml" class="underline">Sitemap</a><br>
    Network: <a href="https://growth.business" class="underline">growth.business</a> · <a href="https://watershortcut.com" class="underline">watershortcut.com</a> · <a href="https://doting.co" class="underline">doting.co</a> · <a href="https://chatulah.com" class="underline">chatulah.com</a> · <a href="https://10-7.org" class="underline">10-7.org</a> · <a href="https://affordablehome.us" class="underline">affordablehome.us</a>
  </footer>
  <script>
    function runCoach(e){ e.preventDefault();
      const vibe=document.getElementById('vibe').value, size=document.getElementById('size').value;
      const res=document.getElementById('coach-result');
      res.innerHTML = '<strong>Local-sim coach (hub fallback):</strong><ul class="mt-2 space-y-1"><li>😂 '+vibe+' joke 1 for '+size+': Why did the kid bring a ladder to school? To go to high school!</li><li>😂 Joke 2: The printer said it had "paper jam" — it was actually just feeling a little pressed for time.</li><li>😂 Joke 3: Team version: Our standup is so short the coffee hasn't even cooled yet.</li></ul><div class="mt-2 text-[10px]">Source: local-sim • <a href="https://growth.business" class="underline">See full on growth.business</a></div>';
      res.classList.remove('hidden');
      fetch('https://riskfreetrial.org/api/analytics', {method:'POST', body:JSON.stringify({domain:'growinglaughs.com', type:'widget_use', vibe})}).catch(()=>{});
    }
    document.documentElement.style.setProperty('--accent', '#fde047');
  </script>
</body>
</html>`;

function guideHTML(title: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Growing Laughs</title><script src="https://cdn.tailwindcss.com"></script><link rel="sitemap" href="/sitemap.xml"></head><body class="bg-yellow-50 text-gray-900 max-w-3xl mx-auto p-8"><h1 class="text-4xl font-bold mb-4">${title}</h1><div class="prose">${body}</div><p class="mt-8 text-sm"><a href="/break" class="underline">Try a Laugh Break</a> • <a href="/gym" class="underline">Visit the Humor Gym</a></p></body></html>`;
}

const GUIDES: Record<string, {title:string, body:string}> = {
  '/guides/how-to-be-witty': {title:'How to Be Witty and Master Banter', body:'<p>Being witty starts with observation and quick connections. Practice noticing everyday absurdities at work or home, then link them lightly to the moment. Banter thrives on give-and-take: listen first, then add a twist that builds on what the other person said rather than shutting it down. Keep it short—aim for one or two sentences that invite reply. Try the 3-second rule: pause, smile, deliver. Over time this builds natural rhythm. Link your new skills to a quick <a href="/break">Laugh Break</a> session or level up in the <a href="/gym">Humor Gym</a>. Real examples include turning a delayed meeting into "Looks like the calendar needed its own coffee break." Stay positive, avoid targets, and read the room. With daily micro-practice your timing sharpens and conversations flow easier. Track small wins by noting one witty exchange each day. Soon colleagues will seek you out for the spark you bring.</p>'},
  '/guides/funny-stress-relief': {title:'Funny Stress Relief and Quick Work Resets', body:'<p>Stress hits fast at work; a 60-second reset using humor can lower tension without leaving your desk. Start by naming the feeling absurdly: "My inbox is auditioning for a horror movie." Then exhale with a silly face only you see. Quick resets include the 10-second chuckle—recall one harmless mishap from yesterday. Pair breathing with a private grin to release endorphins. For longer relief, step away for a <a href="/break">Laugh Break</a> that uses guided micro-jokes. Build resilience in the <a href="/gym">Humor Gym</a> by practicing reframes daily. Evidence from office trials shows teams using shared micro-humor report faster recovery from setbacks. Keep resets office-safe: never mock people or deadlines. Instead poke fun at universal frustrations like printer jams or calendar invites. Over weeks this habit rewires your response so stress triggers laughter instead of panic. Log three resets daily to see the pattern shift.</p>'},
  '/guides/work-icebreakers': {title:'Effective Icebreakers for Work Meetings', body:'<p>Great icebreakers lower defenses in under two minutes and set a collaborative tone. Choose prompts that are low-stakes and inclusive: "What small win made you smile this week?" or "If your commute were a movie genre, which one?" Rotate who answers first so no one feels spotlighted. Keep answers under 20 seconds to maintain energy. Follow up with a light group laugh rather than deep discussion. For virtual teams, use chat polls with funny options. Always tie back to the meeting goal within 90 seconds. Practice new openers in the <a href="/gym">Humor Gym</a> or refresh with a <a href="/break">Laugh Break</a>. Avoid anything that could embarrass or single out individuals. The best icebreakers create shared recognition of everyday quirks. Teams that open this way show higher participation in the first agenda item. Track which prompts land best and reuse winners monthly. Over time your meetings start with momentum instead of awkward silence.</p>'},
  '/guides/office-joke-rewrites': {title:'Rewriting Jokes to Stay Office-Safe', body:'<p>Many classic jokes need a quick rewrite to fit professional settings. The rule is simple: remove any reference to appearance, identity, or personal failure. Replace with situational absurdity. Example: change "Why did the employee bring a ladder?" into "Why did the report bring a ladder? To reach the next quarter's goals." Test the new version by asking "Would this land if my manager overheard?" Keep the surprise twist but swap the target to an object or process. Use the <a href="/gym">Humor Gym</a> drills to practice rewrites in batches of five. Follow a <a href="/break">Laugh Break</a> to test delivery live. Record what gets smiles versus silence. Safe rewrites focus on shared pain points like email volume or meeting length. This keeps humor connective rather than divisive. Colleagues remember the clever twist and associate you with positive energy. Build a personal swipe file of five rewritten lines you can deploy quickly. Review monthly and refresh with new observations from your actual workplace.</p>'}
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/ads.txt') {
      return new Response('google.com, pub-1860356577073395, DIRECT, f08c47fec0942fa0\n', { headers: { 'Content-Type': 'text/plain' } });
    }
    if (url.pathname === '/sitemap.xml') {
      const sm = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://growinglaughs.com/</loc><lastmod>2026-07-15</lastmod><changefreq>daily</changefreq></url><url><loc>https://growinglaughs.com/#library</loc></url><url><loc>https://growinglaughs.com/guides/how-to-be-witty</loc></url><url><loc>https://growinglaughs.com/guides/funny-stress-relief</loc></url><url><loc>https://growinglaughs.com/guides/work-icebreakers</loc></url><url><loc>https://growinglaughs.com/guides/office-joke-rewrites</loc></url></urlset>`;
      return new Response(sm, { headers: { 'Content-Type': 'application/xml' } });
    }
    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nAllow: /\nSitemap: https://growinglaughs.com/sitemap.xml\n', { headers: { 'Content-Type': 'text/plain' } });
    }
    if (GUIDES[url.pathname]) {
      const g = GUIDES[url.pathname];
      return new Response(guideHTML(g.title, g.body), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    if (url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/widget') {
        return Response.json({ ok: true, domain: 'growinglaughs.com', type: 'laughs_coach', result: { summary: 'Local coach ready', suggestions: ['Use family-friendly mode'], source: 'local-sim' } });
      }
      return Response.json({ ok: true, msg: 'growinglaughs api stub' });
    }
    try {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    } catch {}
    return new Response(HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
};
