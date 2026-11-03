import { useEffect, useRef } from 'react';

export default function useBrowserSession() {
  const session=useRef({started:0,clicks:0,pointerPixels:0,hidden:0});
  useEffect(()=>{
    session.current.started=performance.now();
    let previous=null;
    const click=()=>{session.current.clicks++;};
    const pointer=event=>{
      if(event.pointerType!=='mouse') return;
      if(previous) session.current.pointerPixels+=Math.hypot(event.clientX-previous.x,event.clientY-previous.y);
      previous={x:event.clientX,y:event.clientY};
    };
    const visibility=()=>{previous=null;if(document.hidden) session.current.hidden++;};
    const leave=()=>{previous=null;};
    document.addEventListener('click',click,{passive:true});
    document.addEventListener('pointermove',pointer,{passive:true});
    document.addEventListener('visibilitychange',visibility);
    document.addEventListener('pointerleave',leave);
    return ()=>{
      document.removeEventListener('click',click);document.removeEventListener('pointermove',pointer);document.removeEventListener('visibilitychange',visibility);document.removeEventListener('pointerleave',leave);
    };
  },[]);
  return session;
}
