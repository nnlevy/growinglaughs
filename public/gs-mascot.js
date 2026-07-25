(function(){
  const stage=document.querySelector('.gs-stage');
  if(!stage) return;
  const svg=stage.querySelector('svg');
  const eyes=[...stage.querySelectorAll('.gs-eye')];
  const eyesOpen=document.getElementById('gsEyes');
  const eyesLaugh=document.getElementById('gsEyesLaugh');
  const mouth=document.getElementById('gsMouth');
  const mouthOpen=document.getElementById('gsMouthOpen');
  const tears=document.getElementById('gsTears');
  const arms=document.getElementById('gsArms');
  const puddle=document.getElementById('gsPuddle');
  const bud=document.getElementById('gsBud');
  const bubble=document.getElementById('gsBubble');

  const MOUTHS={
    idle:'M98 202 Q120 220 142 202',
    happy:'M92 200 Q120 230 148 200',
    sleepy:'M112 206 Q120 214 128 206',
  };
  const LEVELS={
    1:{cls:'lv1',dur:1100,n:2,big:false,tearRate:0,openMouth:false,words:['heh','heh heh','pfft']},
    2:{cls:'lv2',dur:1700,n:4,big:false,tearRate:0,openMouth:true,words:['ha!','haha','hehe']},
    3:{cls:'lv3',dur:2300,n:6,big:true,tearRate:220,openMouth:true,words:['HAHA','HA!','lolol']},
    4:{cls:'lv4',dur:3000,n:9,big:true,tearRate:120,openMouth:true,words:['HAHAHA','WHEEZE','I CAN\'T'],say:'ow ow my stomach 😂'},
    5:{cls:'lv5',dur:3300,n:12,big:true,tearRate:90,openMouth:true,words:['HAHAHA','WEEEE','🚁'],say:'I\'M AIRBORNE hahaha!'}
  };
  const LEVEL_CLASSES='lv1 lv2 lv3 lv4 lv5';

  let mood='idle', level=0, laughTimer=null, idleTimer=null, streakTimer=null;
  let soundOn=false, audioCtx=null, zzzEls=[], tearInt=null, puddleR=0, puddleDecay=null;

  /* ---------- eye tracking ---------- */
  document.addEventListener('mousemove',e=>{
    if(mood==='laugh')return;
    wake();
    const r=svg.getBoundingClientRect(), sc=r.width/240;
    eyes.forEach(eye=>{
      const cx=r.left+eye.dataset.cx*sc, cy=r.top+eye.dataset.cy*sc;
      const dx=Math.max(-4,Math.min(4,(e.clientX-cx)/22));
      const dy=Math.max(-4,Math.min(4,(e.clientY-cy)/22));
      const p=eye.querySelector('.gs-pupil');
      if(p){ p.setAttribute('cx',eye.dataset.cx*1+dx); p.setAttribute('cy',eye.dataset.cy*1+dy); }
    });
  });

  function setMouth(m){ if(mouth) mouth.setAttribute('d',MOUTHS[m]||MOUTHS.idle); }

  function wake(){
    if(mood==='sleepy'){
      mood='idle'; stage.classList.remove('sleepy');
      zzzEls.forEach(el=>el.remove()); zzzEls=[];
      setMouth('idle');
    }
    resetIdle();
  }

  function resetIdle(){
    clearTimeout(idleTimer);
    idleTimer=setTimeout(()=>{
      if(level>0||mood==='laugh')return;
      mood='sleepy'; stage.classList.add('sleepy');
      setMouth('sleepy');
      for(let i=0;i<3;i++){
        const z=document.createElement('div');
        z.className='gs-zzz'; z.textContent='z'; z.style.left=(110+i*8)+'px'; z.style.top=(70+i*6)+'px';
        stage.appendChild(z); zzzEls.push(z);
        setTimeout(()=>{ z.remove(); },2600);
      }
    },20000);
  }

  function speak(text,ms=2200){
    if(!bubble) return;
    bubble.textContent=text; bubble.classList.add('show');
    setTimeout(()=>{ bubble.classList.remove('show'); },ms);
  }

  function makeParticle(text,x,y,color){
    const p=document.createElement('div');
    p.className='gs-particle'; p.textContent=text;
    p.style.left=x+'px'; p.style.top=y+'px';
    p.style.setProperty('--dx', (Math.random()*60-30)+'px');
    p.style.setProperty('--rot', (Math.random()*40-20)+'deg');
    p.style.color=color||'#26332B';
    stage.appendChild(p);
    setTimeout(()=>p.remove(),1400);
  }

  function makeTear(x,y,fall=120){
    const d=document.createElement('div');
    d.className='gs-drop';
    d.style.left=x+'px'; d.style.top=y+'px';
    d.style.setProperty('--fall',fall+'px');
    d.style.setProperty('--t',(0.55+Math.random()*0.25)+'s');
    stage.appendChild(d);
    setTimeout(()=>d.remove(),900);
  }

  function setLevel(n,force=false){
    if(!force && n===level) return;
    level=Math.max(0,Math.min(5,n));
    stage.className=stage.className.replace(new RegExp(LEVEL_CLASSES,'g'),'').trim()+' lv'+level;
    if(level===0){
      stage.classList.remove('lv1','lv2','lv3','lv4','lv5');
      if(eyesOpen) eyesOpen.style.visibility='visible';
      if(eyesLaugh) eyesLaugh.style.visibility='hidden';
      if(mouthOpen) mouthOpen.style.visibility='hidden';
      if(tears) tears.style.visibility='hidden';
      if(arms) arms.style.visibility='hidden';
      if(puddle) puddle.setAttribute('rx','0');
      puddleR=0; clearInterval(tearInt); tearInt=null;
      setMouth(mood==='sleepy'?'sleepy':'idle');
      return;
    }
    const L=LEVELS[level];
    if(eyesOpen) eyesOpen.style.visibility=L.big?'hidden':'visible';
    if(eyesLaugh) eyesLaugh.style.visibility=L.big?'visible':'hidden';
    if(mouthOpen) mouthOpen.style.visibility=L.openMouth?'visible':'hidden';
    if(tears) tears.style.visibility=(level>=3)?'visible':'hidden';
    if(arms) arms.style.visibility=(level>=4)?'visible':'hidden';
    setMouth(L.openMouth?'happy':'idle');

    if(L.tearRate>0 && !tearInt){
      tearInt=setInterval(()=>{
        if(level<3){ clearInterval(tearInt); tearInt=null; return; }
        makeTear(82,168,90+Math.random()*40);
        makeTear(158,168,90+Math.random()*40);
      },L.tearRate);
    }
    if(level>=4 && puddle){
      puddleR=Math.min(38,puddleR+8);
      puddle.setAttribute('rx',String(puddleR));
      if(puddleDecay) clearTimeout(puddleDecay);
      puddleDecay=setTimeout(()=>{ if(puddle) puddle.setAttribute('rx','0'); puddleR=0; },3200);
    }
    const words=L.words||['ha'];
    const word=words[Math.floor(Math.random()*words.length)];
    const r=svg.getBoundingClientRect();
    makeParticle(word,110+Math.random()*30,90+Math.random()*20,'#26332B');
    if(L.say) speak(L.say,1600);
    if(soundOn) playGiggle(level);

    clearTimeout(laughTimer);
    laughTimer=setTimeout(()=>{ if(level>0) setLevel(0); },L.dur);
    resetIdle();
  }

  function playGiggle(lv){
    if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    const o=audioCtx.createOscillator();
    const g=audioCtx.createGain();
    const f=audioCtx.createBiquadFilter();
    o.type=lv>=4?'sawtooth':'sine';
    o.frequency.value=420+lv*70;
    f.type='lowpass'; f.frequency.value=900+lv*120;
    g.gain.value=0.18;
    const t=audioCtx.currentTime;
    o.connect(f); f.connect(g); g.connect(audioCtx.destination);
    o.start(t);
    g.gain.setValueAtTime(0.18,t);
    g.gain.linearRampToValueAtTime(0.0001,t+(lv>=4?0.6:0.38));
    o.stop(t+(lv>=4?0.65:0.42));
  }

  /* ---------- public API ---------- */
  window.GiggleSprout={
    laugh(n){
      wake();
      if(n!=null) setLevel(n,true);
      else setLevel(Math.min(5,level+1));
      return level;
    },
    celebrate(){
      wake();
      stage.classList.add('celebrating');
      setLevel(3,true);
      for(let i=0;i<8;i++){
        setTimeout(()=>{
          makeParticle(['🎉','✨','💥','🌱'][i%4],90+Math.random()*60,80+Math.random()*30,'#FFC93C');
        },i*70);
      }
      setTimeout(()=>{ stage.classList.remove('celebrating'); setLevel(0); },1800);
      if(soundOn) playGiggle(3);
    },
    grow(){
      wake();
      stage.classList.add('growing');
      if(bud) bud.classList.add('pop');
      setLevel(2,true);
      setTimeout(()=>{
        stage.classList.remove('growing');
        if(bud) bud.classList.remove('pop');
        setLevel(0);
      },1200);
    },
    say(text,ms){ speak(text,ms); },
    setMood(m){
      mood=m||'idle';
      stage.classList.remove('sleepy');
      if(m==='sleepy'){ stage.classList.add('sleepy'); setMouth('sleepy'); }
      else setMouth(m==='happy'?'happy':'idle');
      resetIdle();
    },
    toggleSound(){ soundOn=!soundOn; return soundOn; },
    getLevel(){ return level; }
  };

  /* click to laugh */
  stage.addEventListener('click',()=>{ window.GiggleSprout.laugh(); });

  /* auto-init */
  resetIdle();
  // expose for debugging
  window.__GS_STAGE__=stage;
})();