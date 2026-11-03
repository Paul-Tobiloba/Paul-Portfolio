import { useEffect, useRef } from 'react';
import { BrandMonogram } from './BrandLogo';
import styles from '../../../styles/SecurityPortfolio.module.css';

export default function BrandLoading({ visible }) {
  const indicator=useRef(null);
  useEffect(()=>{
    if(!visible)return;
    const node=indicator.current;
    const pause=()=>node?.style.setProperty('--brand-play-state',document.hidden?'paused':'running');
    pause();document.addEventListener('visibilitychange',pause);
    return ()=>document.removeEventListener('visibilitychange',pause);
  },[visible]);
  if(!visible)return null;
  return <div ref={indicator} className={styles.brandLoading} role="status" aria-live="polite" aria-atomic="true"><BrandMonogram loading/><span>Loading portfolio…</span><span className={styles.brandLoadingLine} aria-hidden="true"/></div>;
}
