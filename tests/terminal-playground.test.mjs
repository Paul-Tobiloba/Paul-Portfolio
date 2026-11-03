import {createPhishingEmail,actOnPhishingEmail,advancePhishingEmail,phishingAnnouncement,simulateEmailDelivery} from '../src/components/security/phishingEmail.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolvePortfolioCommand as resolve} from '../src/components/security/portfolioCommands.mjs';
import {startGame,answerGame,gameView} from '../src/components/security/terminalGames.mjs';
import {collectBrowserReport,collectNetworkReport,collectLocation,pingSite} from '../src/components/security/browserDiagnostics.mjs';
const handlerSource=await readFile(new URL('../pages/api/browser-network.js',import.meta.url),'utf8');
const {default:handler}=await import(`data:text/javascript;base64,${Buffer.from(handlerSource).toString('base64')}`);
const projects=[{slug:'diergasia'}];
const freshEnv=()=>({
  navigator:{onLine:true,languages:['en-US'],platform:'Test platform',userAgent:'Test browser',hardwareConcurrency:4,deviceMemory:8},
  document:{referrer:'https://example.com/private?token=secret',createElement:()=>({getContext:()=>null})},
  screen:{width:1440,height:900},devicePixelRatio:2,performance:{now:()=>65000},location:{hostname:'portfolio.example',host:'portfolio.example'},
  fetch:async(path,options)=>{assert.match(path,/^\/api\/browser-network(?:\?|$)/);assert.equal(options.credentials,'omit');assert.equal(options.cache,'no-store');return {ok:true,json:async()=>({ip:'203.0.113.1',scope:'Test observation',city:'Test city',note:'Approximate.'})};},
});

test('diagnostic aliases, game starters and original portfolio navigation resolve',()=>{
  for(const name of ['Get-WhatYourBrowserKnows','getuserinfo','GET-USERINFO','Get-BrowserInfo'])assert.equal(resolve(name,projects).kind,'browserinfo');
  for(const name of ['ipconfig','Get-NetIPConfiguration'])assert.equal(resolve(name,projects).kind,'ipconfig');
  assert.deepEqual(resolve('  Open-Project DIERGASIA  ',projects),{kind:'open',href:'/works/diergasia'});
  for(const [command,game] of [['Start-PhishingQuiz','phishing'],['Start-SOCShift','soc'],['Start-PortQuiz','ports']])assert.deepEqual(resolve(command,projects),{kind:'play',game});
  for(const command of ['help','whoami','projects','skills','experience','resume','contact','clear'])assert.equal(resolve(command,projects).kind,command);
  assert.deepEqual(resolve('answer ESCALATE',projects),{kind:'answer',answer:'escalate'});
  assert.deepEqual(resolve('pingip 8.8.8.8',projects),{kind:'ping',target:'8.8.8.8'});
});
test('unrecognized games, paths and shell/code input cannot resolve to executable actions',()=>{
  for(const command of ['constructor','__proto__','play constructor','open ../blog','open https://example.com','ping https://example.com','ping 8.8.8.8;whoami','help extra','answer phishing extra','eval alert(1)','rm -rf /'])assert.equal(resolve(command,projects).kind,'error',command);
  assert.equal(startGame('constructor'),null);assert.equal(startGame('__proto__'),null);
});
for(const game of ['phishing','soc','ports']){
  test(`${game} completes once with accurate score and explanatory feedback`,()=>{
    let state=startGame(game,()=>0);const total=state.questions.length;
    assert.equal(gameView(state).round,1);
    const unique=new Set(state.questions.map(q=>q.prompt));assert.equal(unique.size,total);
    for(let i=0;i<total;i++){
      const result=answerGame(state,state.questions[state.index].answer);
      assert.equal(result.result.score,i+1);assert.ok(result.result.feedback.length>30);
      assert.equal(result.result.complete,i===total-1);state=result.state;
    }
    assert.equal(state,null);assert.equal(answerGame(state,'phishing').result.kind,'error');
  });
}
test('invalid answer leaves round untouched; wrong answer advances with no score',()=>{
  const state=startGame('ports',()=>0);
  const invalid=answerGame(state,'banana');assert.equal(invalid.state,state);assert.equal(state.index,0);
  const question=state.questions[0];const wrong=question.choices.find(choice=>choice!==question.answer);
  const answered=answerGame(state,wrong);assert.equal(answered.state.index,1);assert.equal(answered.state.score,0);assert.match(answered.result.feedback,/best answer/);
});
test('browser report handles limited APIs, sanitizes referrer and never requests geolocation',async()=>{
  const env=freshEnv();let geolocationCalls=0;env.navigator.geolocation={getCurrentPosition(){geolocationCalls++;}};
  const report=await collectBrowserReport({started:0,clicks:3,pointerPixels:1234.4,hidden:2},new AbortController().signal,env);
  const text=JSON.stringify(report);assert.equal(geolocationCalls,0);assert.match(text,/8 GB \(approximate/);assert.match(text,/Not exposed by this browser/);assert.match(text,/https:\/\/example.com/);assert.doesNotMatch(text,/private\?token|secret/);assert.match(text,/1,234 CSS pixels/);assert.match(text,/not a unique identity/);assert.match(text,/203.0.113.1/);
});
test('battery/hints and canvas support are reported as exposed, qualified values',async()=>{
  const env=freshEnv();env.navigator.getBattery=async()=>({level:.77,charging:false});env.navigator.userAgentData={platform:'Windows',getHighEntropyValues:async()=>({architecture:'x86',bitness:'64'})};
  env.document.createElement=()=>({getContext:type=>type==='2d'?{font:'',fillStyle:'',measureText(){return {width:this.font.includes('Calibri')?15:10};},fillRect(){},fillText(){},getImageData:()=>({data:new Uint8ClampedArray([1,2,3,4])})}:null});
  const text=JSON.stringify(await collectBrowserReport({started:0,clicks:0,pointerPixels:0,hidden:0},null,env));
  assert.match(text,/77% · discharging/);assert.match(text,/x86 64-bit/);assert.match(text,/Calibri/);assert.match(text,/does not prove an application/);
});
test('failed network lookup preserves local connection facts and a recovery message',async()=>{
  const env=freshEnv();env.fetch=async()=>{throw new Error('Offline');};
  const report=await collectNetworkReport(null,env);assert.match(JSON.stringify(report),/Lookup unavailable/);assert.match(JSON.stringify(report),/does not guarantee internet access/);
});
test('HTTP ping refuses arbitrary addresses without making any request',async()=>{
  const env=freshEnv();let calls=0;env.fetch=async()=>{calls++;throw new Error('Must not fetch');};
  for(const target of ['8.8.8.8','192.168.1.1','example.com','127.0.0.1'])assert.match(JSON.stringify(await pingSite(target,null,env)),/cannot send raw ICMP/);
  assert.equal(calls,0);
});
test('HTTP ping performs three fixed same-site requests and reports timing',async()=>{
  const env=freshEnv();let calls=0;let now=0;env.performance.now=()=>{now+=10;return now;};
  const base=env.fetch;env.fetch=async(...args)=>{calls++;return base(...args);};
  assert.match(JSON.stringify(await pingSite('portfolio.example',null,env)),/3\/3 successful HTTP responses · average 10.0 ms/);assert.equal(calls,3);
});
test('cancelling an in-flight diagnostic aborts its request and rejects stale work',async()=>{
  const env=freshEnv(),controller=new AbortController();let cancelled=false;
  env.fetch=(_,options)=>new Promise((resolve,reject)=>{options.signal.addEventListener('abort',()=>{cancelled=true;reject(new DOMException('Cancelled','AbortError'));},{once:true});});
  const promise=collectNetworkReport(controller.signal,env);controller.abort();await assert.rejects(promise,{name:'AbortError'});assert.equal(cancelled,true);
});
test('location handles unsupported, denied and successful permission paths',async()=>{
  const env=freshEnv();assert.match(JSON.stringify(await collectLocation(null,env)),/requires HTTPS/);
  env.isSecureContext=true;env.navigator.geolocation={getCurrentPosition(success,fail){fail({code:1});}};assert.match(JSON.stringify(await collectLocation(null,env)),/Permission denied/);
  env.navigator.geolocation={getCurrentPosition(success){success({coords:{latitude:6.123456,longitude:3.123456,accuracy:55}});}};const report=JSON.stringify(await collectLocation(null,env));assert.match(report,/6.1235/);assert.match(report,/55 metres/);
});
test('location cancellation ignores a later successful callback',async()=>{
  const env=freshEnv(),controller=new AbortController();let callback;env.isSecureContext=true;env.navigator.geolocation={getCurrentPosition(success){callback=success;}};
  const promise=collectLocation(controller.signal,env);controller.abort();await assert.rejects(promise,{name:'AbortError'});callback({coords:{latitude:1,longitude:1,accuracy:1}});
});
function request(headers={},query={},method='GET'){
  const req={headers,query,method,socket:{remoteAddress:'127.0.0.1'}};
  const res={headers:{},setHeader(name,value){this.headers[name]=value;},status(code){this.code=code;return this;},json(body){this.body=body;return this;}};
  handler(req,res);return res;
}
test('IP endpoint is private/no-store, ignores spoofed forwarded data locally, and keeps GET-only contract',()=>{
  const prior=process.env.VERCEL;try{
    delete process.env.VERCEL;
    const local=request({'x-forwarded-for':'203.0.113.2','x-vercel-ip-city':'Spoofed'});assert.equal(local.body.ip,'127.0.0.1');assert.equal(local.body.city,null);assert.match(local.body.scope,/not your public/);assert.match(local.headers['Cache-Control'],/private, no-store/);assert.equal(local.headers['Vercel-CDN-Cache-Control'],'no-store');
    const wrong=request({}, {}, 'POST');assert.equal(wrong.code,405);assert.equal(wrong.headers.Allow,'GET');
    const ping=request({}, {ping:'1'});assert.deepEqual(ping.body,{ok:true});
    process.env.VERCEL='1';const remote=request({'x-forwarded-for':'2001:db8::1','x-vercel-ip-city':'S%C3%A3o%20Paulo','x-vercel-ip-country':'BR'});assert.equal(remote.body.ip,'2001:db8::1');assert.equal(remote.body.city,'São Paulo');assert.equal(remote.body.country,'BR');
    assert.equal(request({'x-forwarded-for':'<script>bad</script>','x-vercel-ip-city':'%invalid'}).body.ip,null);
  }finally{if(prior===undefined)delete process.env.VERCEL;else process.env.VERCEL=prior;}
});

test('phishing email command supports typed local actions and rejects addresses/extra input',()=>{
  for(const command of ['Send-PhishingEmail','SEND-PHISHING-EMAIL'])assert.equal(resolve(command,projects).kind,'email-start');
  for(const action of ['click','report','delete','undo','next','retry','pause','resume'])assert.deepEqual(resolve(`email ${action}`,projects),{kind:'email-action',action});
  for(const command of ['Send-PhishingEmail visitor@example.com','email forward','email click https://example.com','email constructor'])assert.equal(resolve(command,projects).kind,'error');
});
for(const [action,phase] of [['click','attacking'],['report','reported'],['delete','deleted']]){
  test(`training email ${action} has a distinct outcome without mutating the original`,()=>{
    const email=createPhishingEmail(new Date('2026-11-03T09:00:00Z'));
    const outcome=actOnPhishingEmail(email,action);
    assert.equal(outcome.state.phase,phase);assert.equal(email.phase,'delivered');assert.equal(email.feedback,null);
    assert.ok(outcome.state.feedback.description.length>60);assert.ok(outcome.state.feedback.lesson);
    assert.ok(actOnPhishingEmail(outcome.state,'report').error);
    if(action==='click')assert.match(outcome.state.feedback.description,/no page opened and no credentials/i);
    if(action==='report')assert.match(outcome.state.feedback.title,/training SOC/);
  });
}
test('demo deletion can be undone and then reported; other completed outcomes cannot be undone',()=>{
  const email=createPhishingEmail();
  const deleted=actOnPhishingEmail(email,'delete').state;
  const restored=actOnPhishingEmail(deleted,'undo').state;
  assert.equal(restored.phase,'delivered');assert.equal(restored.feedback,null);assert.deepEqual(restored.message,email.message);
  assert.equal(actOnPhishingEmail(restored,'report').state.phase,'reported');
  assert.ok(actOnPhishingEmail(actOnPhishingEmail(email,'click').state,'undo').error);
  assert.ok(actOnPhishingEmail(null,'report').error);assert.ok(actOnPhishingEmail(email,'constructor').error);
});
test('simulated delivery resolves locally and can be cancelled before or during its delay',async()=>{
  await simulateEmailDelivery(null,0);
  const aborted=new AbortController();aborted.abort();await assert.rejects(simulateEmailDelivery(aborted.signal,0),{name:'AbortError'});
  const controller=new AbortController();const delivery=simulateEmailDelivery(controller.signal,1000);controller.abort();await assert.rejects(delivery,{name:'AbortError'});
});

test('reporting progresses through three distinct emails and finishes with accurate totals',()=>{
  let state=createPhishingEmail();const tactics=new Set();const subjects=new Set();
  for(let round=0;round<3;round++){
    assert.equal(state.round,round);assert.equal(state.phase,'delivered');tactics.add(state.message.tactic);subjects.add(state.message.subject);
    state=actOnPhishingEmail(state,'report').state;assert.equal(state.reported,round+1);assert.equal(state.phase,'reported');
    state=advancePhishingEmail(state);
  }
  assert.equal(tactics.size,3);assert.equal(subjects.size,3);assert.equal(state.phase,'complete');assert.equal(state.reported,3);assert.equal(state.mistakes,0);
  assert.match(phishingAnnouncement(state),/Challenge complete/);
});
test('each phishing type has a distinct staged mock attack, containment and same-round retry',()=>{
  let state=createPhishingEmail();const attacks=new Set();
  for(let round=0;round<3;round++){
    const clicked=actOnPhishingEmail(state,'click').state;assert.equal(clicked.phase,'attacking');assert.equal(clicked.attackStep,0);assert.equal(clicked.mistakes,round+1);
    attacks.add(clicked.message.attack.type);let attack=clicked;
    for(let step=1;step<=clicked.message.attack.events.length;step++){attack=advancePhishingEmail(attack);assert.equal(attack.attackStep,step);}
    assert.equal(attack.phase,'clicked');assert.equal(attack.round,round);
    const retried=actOnPhishingEmail(attack,'retry').state;assert.equal(retried.phase,'delivered');assert.equal(retried.round,round);assert.equal(retried.mistakes,round+1);assert.equal(retried.reported,round);
    state=advancePhishingEmail(actOnPhishingEmail(retried,'report').state);
  }
  assert.equal(attacks.size,3);assert.equal(state.phase,'complete');assert.equal(state.mistakes,3);assert.equal(state.reported,3);
});
test('pause and resume gate automatic progression and mock attack steps',()=>{
  for(const action of ['report','click']){
    const state=actOnPhishingEmail(createPhishingEmail(),action).state;
    const paused=actOnPhishingEmail(state,'pause').state;assert.equal(paused.paused,true);assert.equal(advancePhishingEmail(paused),paused);
    const resumed=actOnPhishingEmail(paused,'resume').state;assert.equal(resumed.paused,false);assert.notEqual(advancePhishingEmail(resumed),resumed);
  }
});
test('rounds cannot be skipped or counted twice; explicit next can override a pause',()=>{
  const initial=createPhishingEmail();assert.ok(actOnPhishingEmail(initial,'next').error);
  const reported=actOnPhishingEmail(initial,'report').state;assert.ok(actOnPhishingEmail(reported,'report').error);assert.equal(reported.reported,1);
  const paused=actOnPhishingEmail(reported,'pause').state;const next=actOnPhishingEmail(paused,'next').state;assert.equal(next.round,1);assert.equal(next.reported,1);
});
test('correct feedback remains available on the following email; deleting never triggers an attack',()=>{
  const first=createPhishingEmail();const next=advancePhishingEmail(actOnPhishingEmail(first,'report').state);
  assert.match(next.previousFeedback.description,/credential phishing/);assert.deepEqual(next.previousFeedback.signals,first.message.signals);
  const deleted=actOnPhishingEmail(next,'delete').state;assert.equal(deleted.phase,'deleted');assert.equal(deleted.mistakes,0);assert.equal(advancePhishingEmail(deleted),deleted);assert.match(deleted.feedback.description,/does not infect/);
  const restored=actOnPhishingEmail(deleted,'undo').state;assert.equal(restored.round,1);assert.equal(restored.reported,1);
});
test('reduced-motion attack completion is one local state transition and preserves feedback',()=>{
  const attacked=actOnPhishingEmail(createPhishingEmail(),'click').state;
  const finished=advancePhishingEmail(attacked,{finishAttack:true});assert.equal(finished.phase,'clicked');assert.equal(finished.attackStep,finished.message.attack.events.length);assert.equal(finished.mistakes,1);assert.ok(finished.feedback);
  assert.match(phishingAnnouncement(finished),/actual device is untouched/);
});

test('completion retains every round’s correct-answer feedback and red flags for review',()=>{
  let state=createPhishingEmail();const expected=[];
  for(let round=0;round<3;round++){
    expected.push({tactic:state.message.tactic,signals:state.message.signals,lesson:state.message.lesson});
    state=advancePhishingEmail(actOnPhishingEmail(state,'report').state);
  }
  assert.equal(state.phase,'complete');assert.equal(state.reviews.length,3);
  state.reviews.forEach((review,index)=>{assert.equal(review.round,index+1);assert.equal(review.tactic,expected[index].tactic);assert.deepEqual(review.signals,expected[index].signals);assert.equal(review.lesson,expected[index].lesson);assert.ok(review.description);});
  assert.equal(state.reviews[2].tactic,'OAuth consent phishing');
});
