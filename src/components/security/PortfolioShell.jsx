import { LuTerminal } from "react-icons/lu";
import PortfolioTerminal from "./PortfolioTerminal";
import BrandLogo from "./BrandLogo";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/SecurityPortfolio.module.css";

export const EMAIL = "mailto:oluwatobiloba.xyz@gmail.com";
export const GITHUB = "https://github.com/Paul-Tobiloba";
export const LINKEDIN = "https://www.linkedin.com/in/oluwatobiloba-paul/";
export const ASSETS = "/assets/security";

function Icon({ name }) {
  return <img src={`${ASSETS}/icon-${name}.svg`} width="20" height="20" alt="" />;
}

function Identity({ expanded = false }) {
  return <Link href="/" className={`${styles.identity} ${expanded ? styles.identityExpanded : ""}`} aria-label="Paul Tobiloba, home"><BrandLogo expanded={expanded}/>{!expanded&&<span className={styles.brandMobileName} aria-hidden="true"><img src="/assets/brand/wordmark.svg" alt="" width="681" height="90"/></span>}</Link>;
}

function Header({ home }) {
  const [open, setOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  useEffect(() => {
    function shortcut(event) {
      if (event.isComposing || event.repeat || document.querySelector("dialog[open]")) return;
      const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || event.target.closest("input, textarea, select"));
      const commandKey = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      const backtick = event.key === "`" && !event.ctrlKey && !event.metaKey && !event.altKey && !typing;
      if (commandKey || backtick) { event.preventDefault(); setTerminalOpen(true); }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const section = (id) => home ? `#${id}` : `/#${id}`;

  useEffect(() => {
    if (!open || !dialog.current) return;
    const modal = dialog.current;
    const opener = trigger.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    modal.querySelector('button[aria-label="Close menu"]')?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  function close() { setOpen(false); }
  function containFocus(event) {
    if (event.key !== "Tab") return;
    const controls = [...dialog.current.querySelectorAll('a[href], button:not([disabled])')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && event.target === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && event.target === last) { event.preventDefault(); first.focus(); }
  }

  return <>
    <header className={styles.header}>
      <Identity />
      <nav className={styles.inlineNav} aria-label="Main navigation">
        {home ? <><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a></> : <Link href="/#work">Back to portfolio</Link>}
      </nav>
      <div className={styles.circularActions}>
        <button type="button" className={styles.iconButton} onClick={() => setTerminalOpen(true)} aria-label="Open portfolio console" aria-haspopup="dialog" aria-keyshortcuts="Control+k Meta+k" title="Portfolio console · Ctrl / Cmd + K"><LuTerminal size={20}/></button>
        <a href="/resume.pdf" className={styles.iconButton} aria-label="View résumé" title="View résumé" target="_blank" rel="noopener noreferrer"><Icon name="file-text" /></a>
        <a href={EMAIL} className={`${styles.iconButton} ${styles.emailButton}`} aria-label="Email Paul" title="Email Paul"><Icon name="mail" /></a>
        <button ref={trigger} type="button" className={styles.iconButton} aria-label="Open menu" aria-expanded={open} aria-controls="portfolio-menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
      </div>
    </header>
    <PortfolioTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    <dialog ref={dialog} id="portfolio-menu" className={styles.menu} aria-label="Portfolio navigation" onCancel={close} onKeyDown={containFocus} onClick={(event) => { if (event.target === event.currentTarget) { const r=event.currentTarget.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) close(); } }}>
      <div className={styles.menuHeading}><Identity expanded /><button className={styles.iconButton} type="button" onClick={close} aria-label="Close menu" autoFocus><Icon name="x" /></button></div>
      <nav className={styles.menuLinks} aria-label="Expanded navigation">
        {[["What I do",section("services-section")],["Professional skills",section("skills-section")],["Portfolio","/works"],["Résumé",section("resume-section")],["Testimonials",section("testimonials-section")],["Blog","/blog"],["About",section("about")],["Contact",section("contact-section")]].map(([label,href]) => <Link key={label} href={href} onClick={close}>{label}</Link>)}
      </nav>
      <div className={styles.menuActions}><a className={styles.primaryButton} href="/resume.pdf" target="_blank" rel="noopener noreferrer">View résumé</a><a className={styles.secondaryButton} href={EMAIL}>Email me</a></div>
      <div className={styles.menuProfiles}><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
    </dialog>
  </>;
}

export default function PortfolioShell({ children, home = false, title = "Paul Tobiloba | Cybersecurity & Automation", description = "Cybersecurity intern with an automation engineering background, pursuing entry-level SOC analyst and cloud security roles. Explore Paul Tobiloba's work and experience." }) {
  const ground = useRef(null);
  const animation = useRef(0);
  useEffect(() => () => cancelAnimationFrame(animation.current), []);
  function illuminate(event) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(animation.current);
    animation.current=requestAnimationFrame(() => {
      ground.current?.style.setProperty("--ground-offset-x", `${Math.round((clientX-565)/24)*24}px`);
      ground.current?.style.setProperty("--ground-offset-y", `${Math.round((clientY-325)/24)*24}px`);
      ground.current?.style.setProperty("--ground-opacity", "1");
    });
  }
  return <div className={styles.site} onPointerMove={illuminate} onPointerLeave={() => ground.current?.style.setProperty("--ground-opacity","0")}>
    <Head>
      <title>{title}</title><meta name="description" content={description} /><meta name="theme-color" content="#090E0C" />
      <meta property="og:title" content={title} /><meta property="og:description" content={description} />
      <style>{`html{scroll-behavior:smooth;scrollbar-color:#2b3c30 #090e0c}body{margin:0;background:#090e0c} @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}`}</style>
      <link rel="preload" href={`${ASSETS}/manrope-400.ttf`} as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="preload" href={`${ASSETS}/manrope-500.ttf`} as="font" type="font/ttf" crossOrigin="anonymous" />
      {home && <link rel="preload" href={`${ASSETS}/plex-mono-400.ttf`} as="font" type="font/ttf" crossOrigin="anonymous" />}
    </Head>
    <div ref={ground} className={styles.ground} aria-hidden="true"><div className={styles.groundLight} /></div>
    <a className={styles.skipLink} href="#main">Skip to content</a>
    <Header home={home} />
    {children}
    {!home && <footer className={styles.siteFooter}><div><p>Let’s build something that works.</p><a href={EMAIL} className={styles.textLink}>oluwatobiloba.xyz@gmail.com</a></div><nav aria-label="Footer navigation"><Link href="/works">Portfolio</Link><Link href="/blog">Blog</Link><a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé</a><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></nav><span>Paul Tobiloba · {new Date().getFullYear()}</span></footer>}
  </div>;
}
