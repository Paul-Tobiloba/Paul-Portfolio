import { useEffect, useRef, useState } from "react";
import portrait from "../../data/securityPortrait.json";
import { ASSETS } from "./PortfolioShell";
import styles from "../../../styles/SecurityPortfolio.module.css";

const tones = ["#163826","#39724D","#61A478","#8FD8A4","#BDF2C6","#E3F9E7"];

export default function BinaryPortrait() {
  const button = useRef(null);
  const canvas = useRef(null);
  const pinned = useRef(false);
  const frame = useRef(0);
  const [isPinned, setPinned] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      canvas.current?.style.setProperty("--portrait-scale", String(entry.contentRect.width / 360));
    });
    observer.observe(button.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
  }, []);

  function position(event) {
    if (!canvas.current) return;
    const bounds=button.current.getBoundingClientRect();
    const x=event.clientX ? (event.clientX-bounds.left)*360/bounds.width : 104;
    const y=event.clientY ? (event.clientY-bounds.top)*390/bounds.height : 157;
    canvas.current.style.setProperty("--pointer-x", `${Math.max(0,Math.min(360,x))}px`);
    canvas.current.style.setProperty("--pointer-y", `${Math.max(0,Math.min(390,y))}px`);
  }
  function move(event) {
    if(pinned.current || event.pointerType==="touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const point={clientX:event.clientX,clientY:event.clientY};
    cancelAnimationFrame(frame.current);
    frame.current=requestAnimationFrame(() => {position(point);canvas.current?.style.setProperty("--reveal","1");});
  }
  function toggle(event) {
    cancelAnimationFrame(frame.current);
    const next=!pinned.current;
    if(next && event.detail !== 0) position(event);
    pinned.current=next; setPinned(next);
    canvas.current?.style.setProperty("--reveal",next ? "1":"0");
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    pinned.current=false;setPinned(false);
    canvas.current?.style.setProperty("--reveal","0");
  }
  return <figure className={styles.portraitFigure}>
    <button ref={button} type="button" className={styles.portrait} aria-label="Reveal the real portrait of Paul Tobiloba" aria-pressed={isPinned} aria-describedby="portrait-instructions" onPointerMove={move} onPointerLeave={() => {cancelAnimationFrame(frame.current);if(!pinned.current) canvas.current?.style.setProperty("--reveal","0");}} onClick={toggle} onKeyDown={(event)=>{if(event.key==="Escape")reset();}} onBlur={()=>{if(!pinned.current)canvas.current?.style.setProperty("--reveal","0");}}>
      <div ref={canvas} className={styles.portraitCanvas} aria-hidden="true">
        {portrait.layers.map((layer,index)=><pre key={index} className={styles.binaryLayer} style={{color:tones[index]}}>{layer}</pre>)}
        <div className={styles.photoWindow}><div className={styles.photoCrop}><img src={`${ASSETS}/real-photo-aligned-with-binary-portrait1.png`} width="1122" height="1402" alt="" fetchPriority="high" draggable="false" /></div></div>
        <img className={styles.revealBoundary} src={`${ASSETS}/reveal-boundary.svg`} width="160" height="160" alt="" draggable="false" />
      </div>
    </button>
    <figcaption id="portrait-instructions" className={styles.portraitHint}><span className={styles.pointerHint}>{isPinned ? "Reveal pinned · Click again to reset" : "Move to reveal · Click to pin"}</span><span className={styles.touchHint}>{isPinned ? "Tap again to reset" : "Tap portrait to reveal · Tap again to reset"}</span><span className={styles.keyboardHint}>Focus and press Enter to reveal. Escape resets.</span></figcaption>
  </figure>;
}
