/**
 * LaughPath launch worker — growinglaughs.com
 * Duolingo × Headspace for humor · adults 18–34 · Sprig mascot · safe roleplay
 */
export interface Env {
  DB?: D1Database;
  ASSETS?: Fetcher;
  OPENAI_API_KEY?: string;
}

const BRAND = `:root{--gl-green:#3FBF4E;--gl-green-dark:#2E9E3C;--gl-leaf:#57D463;--gl-belly:#B9EFAB;--gl-sun:#FFC93C;--gl-ink:#26332B;--gl-cream:#FFF9EC;--gl-blush:#FF9FB1}*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:var(--gl-cream);color:var(--gl-ink);line-height:1.55}a{color:var(--gl-green-dark)} nav{border-bottom:1px solid #e5e7eb;background:#fff;position:sticky;top:0;z-index:40}.nav-inner{max-width:56rem;margin:0 auto;padding:.75rem 1rem;display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap}.nav-inner a{text-decoration:none;color:var(--gl-ink);font-size:.92rem;font-weight:600}.nav-inner a.brand{font-weight:800;font-size:1.15rem;display:flex;align-items:center;gap:.5rem}.nav-inner a.brand img{height:2rem}main{max-width:56rem;margin:0 auto;padding:2rem 1rem 4rem}.pill{display:inline-block;background:var(--gl-green);color:#fff;font-size:.7rem;font-weight:800;letter-spacing:.08em;padding:.25rem .65rem;border-radius:999px;margin-bottom:.75rem}h1{font-size:clamp(2rem,5vw,3.5rem);line-height:1.05;letter-spacing:-.04em;margin:0 0 1rem}h2{font-size:1.6rem;margin:0 0 .75rem}.lead{font-size:1.15rem;opacity:.85;max-width:40rem}.btn{display:inline-block;background:var(--gl-green);color:#fff;font-weight:700;padding:.85rem 1.4rem;border-radius:1rem;text-decoration:none;border:none;cursor:pointer;font-size:1rem}.btn:hover{background:var(--gl-green-dark)}.btn-ghost{background:transparent;color:var(--gl-ink);border:1px solid #d1d5db}.card{background:#fff;border:1px solid #e5e7eb;border-radius:1.1rem;padding:1.25rem}.grid3{display:grid;gap:1rem;grid-template-columns:repeat(3,1fr)}.grid2{display:grid;gap:1rem;grid-template-columns:repeat(2,1fr)}@media(max-width:800px){.grid3,.grid2{grid-template-columns:1fr}}footer{max-width:56rem;margin:0 auto;padding:1.5rem 1rem;font-size:.78rem;opacity:.65;border-top:1px solid #e5e7eb}.chat{background:#fff;border:1px solid #e5e7eb;border-radius:1rem;padding:1rem;min-height:12rem;white-space:pre-wrap;font-size:.95rem}.msg-user{color:var(--gl-green-dark);font-weight:700}.msg-ai{margin-top:.5rem}input,select,textarea{width:100%;padding:.7rem .85rem;border-radius:.75rem;border:1px solid #d1d5db;font:inherit}label{display:grid;gap:.35rem;font-weight:650;font-size:.9rem;margin-bottom:.75rem}/* Sprig stage */.gs-stage{position:relative;width:min(280px,70vw);margin:1rem auto;user-select:none}.gs-stage svg{width:100%;height:auto;display:block;cursor:pointer}.gs-body-wrap{transform-origin:120px 240px;animation:gs-bob 3.4s ease-in-out infinite}@keyframes gs-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.gs-stage.lv1 .gs-body-wrap{animation:gs-c .4s ease-in-out 2}@keyframes gs-c{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}.gs-stage.lv2 .gs-body-wrap,.gs-stage.lv3 .gs-body-wrap{animation:gs-l .45s ease-in-out infinite}@keyframes gs-l{0%,100%{transform:scale(1)}50%{transform:translateY(-8px) scale(.96,1.05)}}.gs-stage.lv4 .gs-body-wrap{animation:gs-r .48s ease-in-out infinite}@keyframes gs-r{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg) translateY(-10px)}}.gs-stage.lv5 .gs-body-wrap{animation:gs-f 2.5s ease-in-out}@keyframes gs-f{0%,100%{transform:translateY(0)}40%{transform:translateY(-70px)}}.gs-bubble{position:absolute;left:50%;transform:translateX(-50%);top:-.5rem;background:#fff;border:1px solid #e5e7eb;border-radius:999px;padding:.35rem .75rem;font-size:.8rem;font-weight:700;white-space:nowrap;opacity:0;transition:opacity .2s}.gs-bubble.on{opacity:1}.notice{background:#fff7d6;border:1px solid #f5e6a8;border-radius:.75rem;padding:.75rem 1rem;font-size:.92rem}`;

const SPRIG_SVG = `<div class="gs-stage" id="sprig-stage" title="Click Sprig to laugh">
<svg viewBox="0 0 240 280" xmlns="http://www.w3.org/2000/svg" aria-label="Sprig the Giggle Sprout">
  <g class="gs-body-wrap">
    <ellipse cx="120" cy="250" rx="48" ry="10" fill="#000" opacity=".08"/>
    <path d="M120 70 C70 70 45 120 50 175 C55 230 90 250 120 250 C150 250 185 230 190 175 C195 120 170 70 120 70Z" fill="#3FBF4E"/>
    <ellipse cx="120" cy="175" rx="48" ry="55" fill="#B9EFAB"/>
    <ellipse class="gs-eye" cx="95" cy="130" rx="12" ry="14" fill="#fff"/>
    <ellipse class="gs-eye" cx="145" cy="130" rx="12" ry="14" fill="#fff"/>
    <circle class="gs-pupil" cx="97" cy="132" r="5" fill="#26332B"/>
    <circle class="gs-pupil" cx="147" cy="132" r="5" fill="#26332B"/>
    <ellipse cx="88" cy="155" rx="10" ry="6" fill="#FF9FB1" opacity=".7"/>
    <ellipse cx="152" cy="155" rx="10" ry="6" fill="#FF9FB1" opacity=".7"/>
    <path d="M100 170 Q120 188 140 170" stroke="#2E9E3C" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="120" cy="78" rx="22" ry="14" fill="#57D463"/>
    <ellipse cx="95" cy="72" rx="16" ry="10" fill="#3FBF4E" transform="rotate(-25 95 72)"/>
    <ellipse cx="145" cy="72" rx="16" ry="10" fill="#3FBF4E" transform="rotate(25 145 72)"/>
    <circle cx="120" cy="55" r="8" fill="#FFC93C"/>
  </g>
</svg>
<div class="gs-bubble" id="sprig-say"></div>
</div>`;

const GS_JS = `(function(){
  let level=0, timer=null, streak=Number(localStorage.getItem('lp_streak')||0);
  const stage=()=>document.getElementById('sprig-stage');
  const bubble=()=>document.getElementById('sprig-say');
  function setLv(n){
    const el=stage(); if(!el) return;
    el.className='gs-stage lv'+n;
    clearTimeout(timer);
    if(n) timer=setTimeout(()=>{el.className='gs-stage'; level=0;}, n>=5?2800:1600);
  }
  function say(t,ms){
    const b=bubble(); if(!b) return;
    b.textContent=t; b.classList.add('on');
    setTimeout(()=>b.classList.remove('on'), ms||2500);
  }
  window.GiggleSprout={
    laugh(n){
      if(n!=null) level=Math.max(1,Math.min(5,Number(n)));
      else level=Math.min(5,level+1);
      setLv(level);
      say(['','heh','haha','HAHA','ow my stomach','HELI-LOL'][level]||'ha',1200);
      return level;
    },
    celebrate(){ setLv(3); say('Nice!',2000); streak=Number(localStorage.getItem('lp_streak')||0)+1; localStorage.setItem('lp_streak',String(streak)); const s=document.getElementById('streak-n'); if(s) s.textContent=String(streak); },
    grow(){ setLv(2); say('Level up!',2000); },
    say,
    setMood(){},
    toggleSound(){ return false; }
  };
  document.addEventListener('click',e=>{
    if(e.target && e.target.closest && e.target.closest('#sprig-stage')) window.GiggleSprout.laugh();
  });
  document.addEventListener('mousemove',e=>{
    document.querySelectorAll('.gs-pupil').forEach((p,i)=>{
      const r=p.closest('svg').getBoundingClientRect();
      const cx=r.left+r.width/2, cy=r.top+r.height*0.45;
      const dx=Math.max(-3,Math.min(3,(e.clientX-cx)/40));
      const dy=Math.max(-3,Math.min(3,(e.clientY-cy)/40));
      p.setAttribute('cx', String((i?147:97)+dx));
      p.setAttribute('cy', String(132+dy));
    });
  });
  document.addEventListener('DOMContentLoaded',()=>{
    const s=document.getElementById('streak-n');
    if(s) s.textContent=String(localStorage.getItem('lp_streak')||'0');
  });
})();`;

const SCENARIOS: Record<string, { title: string; system: string; openers: string[] }> = {
  work: {
    title: "Work meeting banter",
    system: "Office-safe, light, no insults or HR-risk topics.",
    openers: [
      "You: The standup started three minutes late again.\nSprig-coach: Try: “We’re fashionably on brand for software — shall we start with wins so the delay pays rent?”",
      "You: Camera-off culture is awkward.\nSprig-coach: Try: “No pressure on cameras — I’ll narrate my coffee so at least one of us is visible.”",
    ],
  },
  date: {
    title: "Date small-talk",
    system: "Warm, curious, no crude content, no pressure.",
    openers: [
      "You: First date, silence after the menu arrives.\nSprig-coach: Try: “Okay, low-stakes question — pineapple on pizza is a personality test or a war crime?”",
      "You: They mention a weird hobby.\nSprig-coach: Lean in: “Wait, that’s actually cool — how did you fall into that?” then mirror one detail.",
    ],
  },
  friends: {
    title: "Friends catch-up",
    system: "Playful, affectionate, no mean roasts.",
    openers: [
      "You: Friend is always late.\nSprig-coach: Try: “I scheduled you for 7 knowing you’d arrive at 7:20 — I’m basically a time wizard.”",
      "You: Group chat is dead.\nSprig-coach: Drop a specific memory: “Remember the taco incident of 2022? I need a sequel.”",
    ],
  },
};

function shell(title: string, body: string, extraScript = ""): string {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} · LaughPath</title>
<meta name="description" content="LaughPath — feel lighter in minutes, funnier over weeks. Safe humor skill practice for adults 18–34."/>
<link rel="icon" href="/favicon.svg"/>
<style>${BRAND}</style>
</head><body>
<nav><div class="nav-inner">
  <a class="brand" href="/"><img src="/logo-full.svg" alt="Sprig"/>LaughPath</a>
  <a href="/break">Break</a><a href="/gym">Gym</a><a href="/roleplay">Roleplay</a><a href="/streak">Streak</a><a href="/guides">Guides</a>
  <span style="flex:1"></span>
  <a href="/about">About</a><a href="/privacy">Privacy</a>
</div></nav>
<main>${body}</main>
<footer>© 2026 LaughPath on growinglaughs.com · Adults 18–34 · Not therapy · Brand-safe humor · <a href="/privacy">Privacy</a></footer>
<script>${GS_JS}</script>
${extraScript ? `<script>${extraScript}</script>` : ""}
</body></html>`;
}

async function roleplayAI(env: Env, scenario: string, userMsg: string, rank: string): Promise<string> {
  const s = SCENARIOS[scenario] || SCENARIOS.work;
  const prompt = `You are Sprig, brand-safe humor coach for LaughPath (growinglaughs.com). Adults 18-34 only. ${s.system} No therapy claims. Suggest funny, safe replies. User ranks funniness+safety 1-5. Scenario: ${s.title}. User: ${userMsg}. Reply with 1-2 short options only.`;
  if (!env.OPENAI_API_KEY) return "(demo) Try: " + (s.openers[0]||'Keep it light!');
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-4o-mini", messages: [{role:"system",content:prompt},{role:"user",content:userMsg}], max_tokens: 120 })
  });
  const j = await r.json();
  return j.choices?.[0]?.message?.content || "Keep it light and fun!";
}

const PAGES: Record<string, (req?: Request, env?: Env) => string | Promise<string>> = {
  "/": () => shell("LaughPath", `<div class="pill">DUOLINGO × HEADSPACE FOR HUMOR</div>
      <div class="grid2">
        <div>
          <h1>Feel lighter in minutes.<br/>Become funnier over weeks.</h1>
          <p class="lead">Short Laugh Breaks, Humor Gym drills, and safe AI roleplay for adults 18–34. No kids mode. No therapy claims. Just a lighter mind and a warmer presence.</p>
          <p style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <a class="btn" href="/break">Start a Laugh Break →</a>
            <a class="btn btn-ghost" href="/roleplay">Try roleplay</a>
          </p>
          <p class="notice" style="margin-top:1.25rem">Launch surface: streak + practice loop live. Premium Coach / Teams later.</p>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-weight:800;margin-bottom:.5rem">Meet Sprig</div>
          ${SPRIG_SVG}
          <p style="font-size:.9rem;opacity:.75">Click to climb the laugh ladder. Celebrate after a lesson.</p>
        </div>
      </div>`),
  "/roleplay": async (req, env) => {
    if (req?.method === "POST") {
      const fd = await req.formData();
      const sc = String(fd.get("scenario")||"work");
      const msg = String(fd.get("msg")||"");
      const rank = String(fd.get("rank")||"5");
      const ai = await roleplayAI(env!, sc, msg, rank);
      return JSON.stringify({reply: ai});
    }
    const opts = Object.keys(SCENARIOS).map(k=>`<option value="${k}">${SCENARIOS[k].title}</option>`).join("");
    return shell("Roleplay", `<h2>AI Roleplay Coach</h2><p class="lead">3 brand-safe scenarios. Rank funniness + safety. No therapy claims.</p>
    <div class="card"><form id="rp"><label>Scenario<select name="scenario">${opts}</select></label><label>Your line<textarea name="msg" rows="2" placeholder="Type what you said..."></textarea></label><label>Rank funniness+safety (1-5)<input name="rank" type="number" min="1" max="5" value="5"></label><button class="btn" type="submit">Get Sprig reply</button></form><div id="out" class="chat"></div></div>
    <script>document.getElementById('rp').onsubmit=async e=>{e.preventDefault();const fd=new FormData(e.target);const r=await fetch('/roleplay',{method:'POST',body:fd});const j=await r.json();document.getElementById('out').innerHTML='<div class="msg-ai">'+j.reply+'</div>';};</script>`);
  },
  "/break": () => shell("Laugh Break", `<h2>Laugh Break · 60 seconds</h2><p class="lead">A guided mood reset — not meditation cosplay, not a doomscroll.</p><div class="card" style="margin-top:1rem"><ol id="break-steps"><li>Unclench your jaw. Drop your shoulders.</li><li>Name one tiny absurd thing near you.</li><li>Exhale longer than you inhale, twice.</li><li>Optional: say the absurd thing out loud in a movie-trailer voice.</li></ol><p style="margin-top:1rem"><button class="btn" id="break-go" type="button">Begin 60s reset</button><button class="btn btn-ghost" id="break-done" type="button" style="margin-left:.5rem">I feel lighter → celebrate</button></p><div id="break-timer" style="font-size:2rem;font-weight:800;margin-top:1rem"></div></div>`),
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const p = PAGES[url.pathname];
    if (p) {
      const body = await p(request, env);
      const ct = url.pathname === "/roleplay" && request.method === "POST" ? "application/json" : "text/html";
      return new Response(body, { headers: { "content-type": ct + "; charset=utf-8" } });
    }
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  },
};