import { useEffect, useRef, useState } from 'react';
import MatrixWordmark from './MatrixWordmark';
import { createMatrixSequence, INITIAL_MATRIX_FRAME } from './matrixLoading.mjs';
import styles from '../../../styles/SecurityPortfolio.module.css';

export default function BrandLoading({visible,contentRef}) {
  const [frame,setFrame]=useState(INITIAL_MATRIX_FRAME);
  const sequence=useRef(null),pending=useRef(visible),restart=useRef(null),skip=useRef(null),skipButton=useRef(null),screen=useRef(null);
  useEffect(()=>{
    let raf=0,lastTick=-1,lastPhase='',disposed=false;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw=now=>{
      if(disposed||!sequence.current)return;
      const next=sequence.current.update(now,pending.current||document.fonts?.status==='loading',motion.matches);
      const phase=`${next.visible}:${next.exiting}:${next.caption}`;
      if(next.tick!==lastTick||phase!==lastPhase){lastTick=next.tick;lastPhase=phase;setFrame(next);}
      if(next.visible)raf=requestAnimationFrame(draw);
    };
    const start=(duration=4200)=>{
      cancelAnimationFrame(raf);lastTick=-1;lastPhase='';
      sequence.current=createMatrixSequence({startedAt:performance.now(),duration});
      raf=requestAnimationFrame(draw);
    };
    const resume=()=>{
      cancelAnimationFrame(raf);
      if(!document.hidden&&sequence.current?.active)raf=requestAnimationFrame(draw);
    };
    restart.current=start;
    skip.current=()=>{sequence.current?.skip();cancelAnimationFrame(raf);draw(performance.now());};
    document.addEventListener('visibilitychange',resume);motion.addEventListener('change',resume);
    start();
    return ()=>{disposed=true;cancelAnimationFrame(raf);restart.current=null;skip.current=null;document.removeEventListener('visibilitychange',resume);motion.removeEventListener('change',resume);};
  },[]);
  useEffect(()=>{
    pending.current=visible;
    if(!visible)return;
    // Fast cached navigation never flashes a full-screen transition.
    const timer=setTimeout(()=>{if(pending.current&&(!sequence.current?.active||sequence.current.finishing))restart.current?.(1800);},120);
    return ()=>clearTimeout(timer);
  },[visible]);
  useEffect(()=>{
    if(!frame.visible)return;
    const screenNode=screen.current;
    // Default CSS keeps the SSR overlay hidden if hydration never reaches effects.
    screenNode?.setAttribute('data-loader-ready','true');
    const page=contentRef?.current;
    const previousFocus=document.activeElement;
    const previousInert=page?.hasAttribute('inert');
    const previousHidden=page?.getAttribute('aria-hidden');
    const previousOverflow=document.documentElement.style.overflow;
    if(page){page.setAttribute('inert','');page.setAttribute('aria-hidden','true');}
    document.documentElement.style.overflow='hidden';
    skipButton.current?.focus({preventScroll:true});
    return ()=>{
      screenNode?.removeAttribute('data-loader-ready');
      document.documentElement.style.overflow=previousOverflow;
      if(page){if(previousInert)page.setAttribute('inert','');else page.removeAttribute('inert');if(previousHidden===null)page.removeAttribute('aria-hidden');else if(previousHidden!==undefined)page.setAttribute('aria-hidden',previousHidden);}
      if(previousFocus?.isConnected&&previousFocus!==document.body)previousFocus.focus({preventScroll:true});
      else {const main=page?.querySelector('main');if(main){main.setAttribute('tabindex','-1');main.focus({preventScroll:true});}}
    };
  },[frame.visible,contentRef]);
  if(!frame.visible)return null;
  const percent=Math.round(frame.progress*100);
  return <div ref={screen} id="portfolio-loading-screen" className={`${styles.matrixLoading} ${frame.exiting?styles.matrixLoadingExit:''}`} role="dialog" aria-modal="true" aria-labelledby="portfolio-loading-label" aria-describedby="portfolio-loading-name" onKeyDown={event=>{event.stopPropagation();if(event.key==='Escape'){event.preventDefault();skip.current?.();}if(event.key==='Tab'){event.preventDefault();skipButton.current?.focus();}}}>
    <div className={styles.matrixComposition}>
      <MatrixWordmark resolve={frame.resolve} tick={frame.tick}/>
      <span id="portfolio-loading-name" className={styles.srOnly}>Paul Tobiloba</span>
      <div className={styles.matrixMeter}>
        <div className={styles.matrixMeterLabels}><span id="portfolio-loading-label">Loading</span><output aria-hidden="true">{percent}%</output></div>
        <div className={styles.matrixTrack} role="progressbar" aria-label="Loading sequence" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-valuetext={`${percent}% presentation progress${percent<100?'; preparing the page':''}`}><div className={styles.matrixFill} style={{transform:`scaleX(${frame.progress})`}}/></div>
        <p className={styles.matrixCaption} role="status" aria-live="polite" aria-atomic="true">{frame.caption}</p>
      </div>
    </div>
    <button ref={skipButton} type="button" className={styles.matrixSkip} onClick={()=>skip.current?.()}>Skip loading screen</button>
  </div>;
}
