export const INITIAL_MATRIX_FRAME={visible:true,exiting:false,progress:0,resolve:0,tick:0,caption:'Hacking in progress…',reason:null};

// Progress describes this presentation sequence, not downloaded bytes.
// Actual pending work gates 100%; timeout/skip can always release the page.
export function createMatrixSequence({startedAt=0,duration=4200,maxWait=10000,hold=220,fade=220}={}) {
  let readyAt=null,skipped=false,active=true;
  return {
    get active(){return active;},
    get finishing(){return readyAt!==null;},
    skip(){skipped=true;},
    update(now,pending=false,reduced=false){
      const elapsed=Math.max(0,now-startedAt);
      const length=reduced?0:duration;
      const fraction=length?Math.min(1,elapsed/length):1;
      const base={...INITIAL_MATRIX_FRAME,progress:Math.min(.95,fraction*.95),resolve:Math.min(1,fraction*1.3),tick:Math.floor(elapsed/76)};
      if(!active)return {...base,visible:false,reason:'finished'};
      if(skipped||elapsed>=maxWait){active=false;return {...base,visible:false,reason:skipped?'skip':'timeout'};}
      // New work arriving during the completion hold/fade revokes that finish.
      if(pending&&readyAt!==null)readyAt=null;
      if(elapsed>=length&&!pending&&readyAt===null)readyAt=now;
      if(readyAt===null)return base;
      const age=now-readyAt,still=reduced?0:hold,exit=reduced?0:fade;
      active=age<still+exit;
      return {...base,visible:active,exiting:age>=still,progress:1,resolve:1,caption:'Access granted.',reason:'ready'};
    },
  };
}

export function matrixLetterState(index,resolve,tick,letter) {
  const locked=resolve>=.17+index*.055||resolve>=1;
  const pool=resolve<.16?['0','1']:['0','1','P','T','a','u','l','o','b','i','/','_'];
  const value=pool[(tick*13+index*17+Math.floor(tick/3)*7)%pool.length];
  return {letter:locked?letter:value,locked,opacity:locked?1:.38+((tick+index*3)%6)/10};
}
