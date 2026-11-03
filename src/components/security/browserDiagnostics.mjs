const unavailable = 'Not exposed by this browser';
const section = (title,rows,note='') => ({title,rows,note});
function shortWait(promise,ms,signal) {
  return new Promise((resolve,reject) => {
    const finish=(fn,value)=>{clearTimeout(timer);signal?.removeEventListener('abort',cancel);fn(value);};
    const cancel=()=>finish(reject,new DOMException('Cancelled','AbortError'));
    const timer=setTimeout(()=>finish(resolve,null),ms);
    if (signal?.aborted) return cancel();
    signal?.addEventListener('abort',cancel,{once:true});
    Promise.resolve(promise).then(value=>finish(resolve,value),()=>finish(resolve,null));
  });
}
async function siteRequest(path,signal,fetcher=globalThis.fetch) {
  const controller=new AbortController();
  const cancel=()=>controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort',cancel,{once:true});
  const timer=setTimeout(cancel,5000);
  try {
    const response=await fetcher(path,{signal:controller.signal,cache:'no-store',credentials:'omit',mode:'same-origin',redirect:'error'});
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } finally { clearTimeout(timer);signal?.removeEventListener('abort',cancel); }
}
export async function collectNetworkReport(signal,env=globalThis) {
  const nav=env.navigator || {};
  const connection=nav.connection || nav.mozConnection || nav.webkitConnection;
  const rows=[['Browser connectivity hint',nav.onLine===undefined?unavailable:nav.onLine?'Online (does not guarantee internet access)':'Offline'],['Connection estimate',connection?.effectiveType || unavailable],['Downlink estimate',typeof connection?.downlink==='number'?`${connection.downlink} Mbps (rounded estimate)`:unavailable],['Browser RTT estimate',typeof connection?.rtt==='number'?`${connection.rtt} ms (not a ping measurement)`:unavailable],['Data saver',typeof connection?.saveData==='boolean'?connection.saveData?'On':'Off':unavailable],['LAN IP / gateway / DNS / MAC',unavailable]];
  let note='Browser view of your connection, not the operating system’s ipconfig. Only this site is contacted; no third-party IP lookup.';
  try {
    const data=await siteRequest('/api/browser-network',signal,env.fetch.bind(env));
    rows.push(['Observed IP',data.ip || 'Unavailable'],['IP source',data.scope],['Approximate IP region',[data.city,data.region,data.country].filter(Boolean).join(', ') || 'Not available in this environment']);
    note+=` ${data.note}`;
  } catch (error) {
    if (signal?.aborted) throw error;
    rows.push(['IP / approximate region','Lookup unavailable. Check your connection and try ipconfig again.']);
  }
  return section('Network · observed by this site',rows,note);
}
function canvasFacts(document) {
  try {
    const canvas=document.createElement('canvas');canvas.width=320;canvas.height=50;
    const context=canvas.getContext('2d');
    if (!context) return {fonts:unavailable,hash:unavailable};
    const sample='mmmmmmmmmmlliWW@123';
    const baselines=['monospace','sans-serif','serif'];
    const width=font=>{context.font=`16px ${font}`;return context.measureText(sample).width;};
    const likely=['Segoe UI','Calibri','Consolas','Cascadia Code','Arial','Georgia','Times New Roman'].filter(font=>baselines.some(base=>width(`"${font}",${base}`)!==width(base)));
    context.fillStyle='#111a15';context.fillRect(0,0,320,50);context.fillStyle='#a5f3b8';context.font='16px sans-serif';context.fillText('Paul’s browser privacy demo 01',10,30);
    let hash=2166136261;
    for (const byte of context.getImageData(0,0,320,50).data) hash=Math.imul(hash^byte,16777619);
    return {fonts:likely.join(', ') || 'No difference detected against fallback fonts',hash:(hash>>>0).toString(16).padStart(8,'0')};
  } catch { return {fonts:unavailable,hash:unavailable}; }
}
function graphics(document) {
  try {
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl');
    if (!gl) return unavailable;
    const extension=gl.getExtension('WEBGL_debug_renderer_info');
    const renderer=extension?gl.getParameter(extension.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return renderer || unavailable;
  } catch { return unavailable; }
}
export async function collectBrowserReport(session,signal,env=globalThis) {
  const nav=env.navigator || {},doc=env.document,screen=env.screen || {};
  const localTime=new Date().toLocaleString();
  let timezone=unavailable;
  try { timezone=Intl.DateTimeFormat().resolvedOptions().timeZone || unavailable; } catch { /* Hardened browser. */ }
  const [battery,hints,network]=await Promise.all([
    shortWait(Promise.resolve().then(()=>nav.getBattery?.()),1500,signal),
    shortWait(Promise.resolve().then(()=>nav.userAgentData?.getHighEntropyValues?.(['architecture','bitness','model','platformVersion'])),1500,signal),
    collectNetworkReport(signal,env),
  ]);
  if (signal?.aborted) throw new DOMException('Cancelled','AbortError');
  const facts=canvasFacts(doc);
  let referrer='No referrer supplied; the browser does not reveal why.';
  try { if(doc.referrer) referrer=new URL(doc.referrer).origin; } catch { /* Do not expose malformed referrers. */ }
  const age=Math.max(0,Math.floor((env.performance.now()-session.started)/1000));
  const memory=typeof nav.deviceMemory==='number'?`${nav.deviceMemory} GB (approximate, may be rounded/capped)`:unavailable;
  return [
    section('Your device · browser-reported',[
      ['Platform',nav.userAgentData?.platform || nav.platform || unavailable],['CPU architecture',hints?.architecture?[hints.architecture,hints.bitness?`${hints.bitness}-bit`:null].filter(Boolean).join(' '):unavailable],['Logical processors exposed',nav.hardwareConcurrency?String(nav.hardwareConcurrency):unavailable],['Memory estimate',memory],['Graphics renderer',graphics(doc)],['Screen',screen.width?`${screen.width} × ${screen.height} CSS pixels · ${env.devicePixelRatio || 1}× pixel ratio`:unavailable],['Battery',battery&&typeof battery.level==='number'?`${Math.round(battery.level*100)}% · ${battery.charging?'charging / connected to power':'discharging'}`:unavailable],['Device name / signed-in OS user','Not available to websites'],['Browser user agent',nav.userAgent || unavailable],
    ],'These are values the browser chooses to expose; privacy settings can reduce or alter them. The exact CPU model is not available.'),
    section('Where and when',[
      ['Local clock',localTime],['Time zone',timezone],['Languages',nav.languages?.join(', ') || nav.language || unavailable],['Precise location','Not requested. Run Get-Location to ask the browser for permission.'],
    ],'A time zone is a device setting, not proof of your current city. IP-based region appears below and may reflect a VPN.'),
    section('This tab · local session only',[
      ['Time since page load',`${Math.floor(age/60)} min ${age%60} sec`],['Clicks / taps counted',String(session.clicks)],['Pointer travel',`${Math.round(session.pointerPixels).toLocaleString()} CSS pixels (not physical metres)`],['Times this tab became hidden',String(session.hidden)],['Referrer origin',referrer],
    ],'Counters cover this page since it mounted. They do not reveal browsing history, other tabs or typed text. Reloading resets them.'),
    section('Fonts · a limited inference',[
      ['Likely local fonts',facts.fonts],['Installed apps / extensions / files','Websites cannot enumerate these'],
    ],'Font rendering is compared with fallbacks. This can be wrong and does not prove an application such as Office is installed.'),
    section('Fingerprint demonstration',[
      ['Canvas render hash',facts.hash],
    ],'A small, non-cryptographic hash of a sample canvas. It is not a unique identity and can change or be blocked. This feature does not save it or send it to an endpoint.'),
    network,
  ];
}
export function collectLocation(signal,env=globalThis) {
  return new Promise((resolve,reject)=>{
    if (!env.isSecureContext || !env.navigator?.geolocation) { resolve([section('Location',[['Status','Unavailable. This requires HTTPS (or localhost) and geolocation support.']])]);return; }
    let finished=false;
    const done=value=>{if(finished)return;finished=true;clearTimeout(timer);signal?.removeEventListener('abort',cancel);resolve(value);};
    const cancel=()=>{if(finished)return;finished=true;clearTimeout(timer);signal?.removeEventListener('abort',cancel);reject(new DOMException('Cancelled','AbortError'));};
    const timer=setTimeout(()=>done([section('Location',[['Status','Request timed out. You can run Get-Location again.']])]),12000);
    if(signal?.aborted) return cancel();
    signal?.addEventListener('abort',cancel,{once:true});
    try {
      env.navigator.geolocation.getCurrentPosition(position=>done([section('Location · permission granted',[
        ['Latitude',position.coords.latitude.toFixed(4)],['Longitude',position.coords.longitude.toFixed(4)],['Reported accuracy',`Within about ${Math.round(position.coords.accuracy)} metres`],
      ],'Coordinates stay in this console; this feature does not transmit or save them. Browser/OS location services may use their own provider.')]),error=>done([section('Location',[['Status',error.code===1?'Permission denied. No coordinates were obtained.':error.code===3?'Request timed out. Try again when ready.':'The browser could not determine your location.']])]),{enableHighAccuracy:false,timeout:10000,maximumAge:0});
    } catch { done([section('Location',[['Status','Location is blocked or unavailable in this browser.']])]); }
  });
}
export async function pingSite(target,signal,env=globalThis) {
  if (!['self','this-site',env.location.hostname.toLowerCase(),env.location.host.toLowerCase()].includes(target)) return [section('Ping · browser limits',[
    ['Target',target],['Status','Browsers cannot send raw ICMP ping packets. Run ping without a target to measure HTTP responses from this site.'],
  ],'This command does not contact arbitrary IPs, local-network devices or third-party hosts.')];
  const rows=[],times=[];
  for(let i=1;i<=3;i++) {
    if(signal?.aborted) throw new DOMException('Cancelled','AbortError');
    const start=env.performance.now();
    try { await siteRequest(`/api/browser-network?ping=1&sample=${i}`,signal,env.fetch.bind(env)); const elapsed=env.performance.now()-start;times.push(elapsed);rows.push([`Request ${i}`,`${elapsed.toFixed(1)} ms · HTTP response received`]); }
    catch(error) { if(signal?.aborted) throw error;rows.push([`Request ${i}`,'No successful HTTP response within the request limit']); }
  }
  rows.push(['Summary',`${times.length}/3 successful HTTP responses${times.length?` · average ${(times.reduce((a,b)=>a+b,0)/times.length).toFixed(1)} ms`:''}`]);
  return [section('Ping · this site only',rows,'This is HTTP application round-trip timing, including server/network work. It is not ICMP ping, pure network latency or a throughput test.')];
}
