import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { projects } from '../../data/projects';
import { resolvePortfolioCommand } from './portfolioCommands.mjs';
import { startGame, answerGame, gameView } from './terminalGames.mjs';
import { collectBrowserReport, collectNetworkReport, collectLocation, pingSite } from './browserDiagnostics.mjs';
import { createPhishingEmail, actOnPhishingEmail, advancePhishingEmail, phishingAnnouncement, simulateEmailDelivery } from './phishingEmail.mjs';
import TerminalOutput from './TerminalOutput';
import useBrowserSession from './useBrowserSession';
import usePortfolioDialog from './usePortfolioDialog';
import styles from '../../../styles/SecurityPortfolio.module.css';

const commands=['Send-PhishingEmail','Get-WhatYourBrowserKnows','ipconfig','ping','games','help','clear'];
export default function PortfolioTerminal({open,onClose}) {
  const router=useRouter();
  const input=useRef(null),log=useRef(null),sequence=useRef(0),job=useRef(null),game=useRef(null),activeGameEntry=useRef(null),mail=useRef(null),scrollEntry=useRef(null),entryIds=useRef([]),wasOpen=useRef(false);
  const session=useBrowserSession();
  const [value,setValue]=useState('');
  const [entries,setEntries]=useState([]);
  const [history,setHistory]=useState([]);
  const [historyIndex,setHistoryIndex]=useState(-1);
  const [notice,setNotice]=useState('');
  function cancelJob() {
    const current=job.current;
    if(!current)return;
    current.controller.abort();job.current=null;
    setEntries(previous=>previous.map(entry=>entry.id===current.id?{...entry,result:{kind:'message',message:'Task cancelled.'}}:entry));
  }
  function close() { cancelJob();onClose(); }
  const modal=usePortfolioDialog(open,close,input);
  useEffect(()=>()=>job.current?.controller.abort(),[]);
  useEffect(()=>{
    const opening=open&&!wasOpen.current;
    wasOpen.current=open;
    if(!scrollEntry.current&&!opening)return;
    const viewport=log.current;
    const entry=scrollEntry.current ? viewport?.querySelector(`[data-command-entry="${scrollEntry.current}"]`) : viewport?.lastElementChild;
    const latest=entry?.querySelector('[data-console-result-focus]') || entry;
    scrollEntry.current=null;
    if(!viewport || !latest)return;
    // Begin at the new command, not its tail: long reports and game prompts must be readable.
    viewport.scrollTop=Math.max(0,viewport.scrollTop+latest.getBoundingClientRect().top-viewport.getBoundingClientRect().top-24);
  },[entries,open]);
  useEffect(()=>{
    const current=mail.current;
    if(!open || !current || current.result.paused || !['reported','attacking'].includes(current.result.phase))return;
    const isAttack=current.result.phase==='attacking';
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer=setTimeout(()=>{
      if(mail.current!==current || !entryIds.current.includes(current.id))return;
      const next=advancePhishingEmail(current.result,{finishAttack:reduceMotion});
      mail.current={id:current.id,result:next};
      if(next.phase!==current.result.phase)scrollEntry.current=current.id;
      setEntries(previous=>previous.map(entry=>entry.id===current.id?{...entry,result:next}:entry));
      setNotice(phishingAnnouncement(next));
    },isAttack?(reduceMotion?0:750):2500);
    return ()=>clearTimeout(timer);
  },[entries,open]);
  function append(id,command,result) {
    entryIds.current=[...entryIds.current,id].slice(-50);
    // An interaction cannot outlive the card or question visible in the bounded log.
    if(mail.current && !entryIds.current.includes(mail.current.id))mail.current=null;
    if(activeGameEntry.current && !entryIds.current.includes(activeGameEntry.current)) {game.current=null;activeGameEntry.current=null;}
    scrollEntry.current=id;
    setEntries(previous=>[...previous,{id,command,result}].slice(-50));
    setNotice(`${command}: ${result.kind==='game'?result.complete?`Game complete. Score ${result.score} of ${result.total}.`:`${result.feedback} Round ${result.round} of ${result.total}. ${result.question.prompt} Choices: ${result.question.choices.join(', ')}.`:result.kind==='pending'?'Running.':result.message || 'Result ready in command output.'}`);
  }
  async function run(command) {
    let result=resolvePortfolioCommand(command,projects);
    if(result.kind==='empty')return;
    cancelJob();
    // A visitor switching tasks should not be pulled back by an automatic email sequence.
    if(mail.current && ['reported','attacking'].includes(mail.current.result.phase) && !['email-action','email-start','clear','exit','play'].includes(result.kind)) {
      const current=mail.current;
      const paused={...current.result,paused:true};mail.current={id:current.id,result:paused};
      setEntries(previous=>previous.map(entry=>entry.id===current.id?{...entry,result:paused}:entry));
    }
    const id=++sequence.current;
    setHistory(previous=>[...previous,command].slice(-50));setHistoryIndex(-1);setValue('');
    input.current?.focus({preventScroll:true});
    if(result.kind==='clear') {entryIds.current=[];setEntries([]);game.current=null;activeGameEntry.current=null;mail.current=null;setNotice('Console cleared. Current task and game stopped.');return;}
    if(result.kind==='open') {close();router.push(result.href);return;}
    if(result.kind==='play') {mail.current=null;game.current=startGame(result.game);result=gameView(game.current);}
    else if(result.kind==='answer') {const answer=answerGame(game.current,result.answer);game.current=answer.state;result=answer.result;}
    else if(result.kind==='exit') {game.current=null;activeGameEntry.current=null;mail.current=null;result={kind:'message',message:'Game and email scenario ended. Run games to choose a challenge.'};}
    else if(result.kind==='email-action') {
      const current=mail.current;
      const outcome=actOnPhishingEmail(current?.result,result.action);
      if(outcome.error) { append(id,command,{kind:'error',message:outcome.error});return; }
      mail.current={id:current.id,result:outcome.state};scrollEntry.current=current.id;
      setEntries(previous=>previous.map(entry=>entry.id===current.id?{...entry,result:outcome.state}:entry));
      setNotice(phishingAnnouncement(outcome.state));
      return;
    }
    else if(result.kind==='email-start') {
      game.current=null;activeGameEntry.current=null;mail.current=null;
      const controller=new AbortController();job.current={id,controller};
      append(id,command,{kind:'email-sending',message:'Sending email… Simulating delivery to this page’s training inbox.'});
      try {
        await simulateEmailDelivery(controller.signal,window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:900);
        if(controller.signal.aborted || job.current?.id!==id)return;
        const delivered=createPhishingEmail();mail.current={id,result:delivered};scrollEntry.current=id;
        setEntries(previous=>previous.map(entry=>entry.id===id?{...entry,result:delivered}:entry));
        setNotice(phishingAnnouncement(delivered));
      } catch(error) {
        if(controller.signal.aborted || job.current?.id!==id)return;
        setEntries(previous=>previous.map(entry=>entry.id===id?{...entry,result:{kind:'error',message:'The local simulation could not start. Try Send-PhishingEmail again.'}}:entry));
        setNotice('The email simulation could not start.');
      } finally { if(job.current?.id===id)job.current=null; }
      return;
    }
    else if(result.kind==='date') result={kind:'message',message:new Date().toLocaleString()};
    else if(['browserinfo','ipconfig','location','ping'].includes(result.kind)) {
      const controller=new AbortController();job.current={id,controller};
      append(id,command,{kind:'pending',message:result.kind==='location'?'Waiting for browser location permission…':'Reading browser information…'});
      try {
        let sections;
        if(result.kind==='browserinfo') sections=await collectBrowserReport({...session.current},controller.signal);
        else if(result.kind==='ipconfig')sections=[await collectNetworkReport(controller.signal)];
        else if(result.kind==='location')sections=await collectLocation(controller.signal);
        else sections=await pingSite(result.target,controller.signal);
        if(controller.signal.aborted || job.current?.id!==id)return;
        const title={browserinfo:'What your browser exposes',ipconfig:'Browser network view',location:'Browser location',ping:'HTTP connection check'}[result.kind];
        scrollEntry.current=id;
        setEntries(previous=>previous.map(entry=>entry.id===id?{...entry,result:{kind:'report',title,sections}}:entry));
        setNotice(`${title} ready. Read the labelled command output region.`);
      } catch(error) {
        if(controller.signal.aborted || job.current?.id!==id)return;
        const message=error.name==='AbortError'?'Task cancelled.':'That information is unavailable. Your browser may block the API; try ipconfig or help.';
        setEntries(previous=>previous.map(entry=>entry.id===id?{...entry,result:{kind:'error',message}}:entry));setNotice(message);
      } finally {if(job.current?.id===id)job.current=null;}
      return;
    }
    if(result.kind==='game')activeGameEntry.current=id;
    append(id,command,result);
  }
  function recall(event) {
    if(event.key!=='ArrowUp' && event.key!=='ArrowDown')return;
    event.preventDefault();
    const next=event.key==='ArrowUp'?Math.min(historyIndex+1,history.length-1):Math.max(historyIndex-1,-1);
    setHistoryIndex(next);setValue(next<0?'':history[history.length-1-next] || '');
  }
  return <dialog {...modal} className={`${styles.interactiveDialog} ${styles.terminalDialog}`} aria-labelledby="portfolio-terminal-title" aria-describedby="portfolio-terminal-description">
    <div className={styles.dialogBar}><h2 id="portfolio-terminal-title">Paul’s PowerShell playground</h2><button type="button" className={styles.iconButton} onClick={close} aria-label="Close portfolio console"><LuX size={20}/></button></div>
    <p id="portfolio-terminal-description" className={styles.consoleDescription}>Simulated shell. Real browser insights. Local games. Browser reports stay in this tab; IP checks contact this site and location asks permission.</p>
    <div ref={log} className={styles.consoleLog} role="region" aria-label="Command output" tabIndex={0}>
      <p className={styles.consoleWelcome}>Hello, curious human. Try <code>Send-PhishingEmail</code>, <code>getuserinfo</code> or <code>games</code>. This is a browser playground, not your computer’s PowerShell.</p>
      {entries.map(entry=><div className={styles.consoleEntry} key={entry.id} data-command-entry={entry.id}><p className={styles.consolePrompt}><span aria-hidden="true">PS C:\Visitor&gt;</span> {entry.command}</p><div className={styles.consoleOutput}><TerminalOutput result={entry.result} close={close} run={run} interactive={entry.id===activeGameEntry.current && Boolean(game.current)} emailInteractive={entry.id===mail.current?.id} onEmailAction={action=>{if(entry.id===mail.current?.id)run(`email ${action}`);}}/></div></div>)}
    </div>
    <p className={styles.srOnly} role="status">{notice}</p>
    <form className={styles.consoleForm} onSubmit={event=>{event.preventDefault();run(value);}}><label htmlFor="portfolio-command"><span aria-hidden="true">PS C:\Visitor&gt;</span><span className={styles.srOnly}>Portfolio command</span></label><input ref={input} id="portfolio-command" value={value} onChange={event=>setValue(event.target.value)} onKeyDown={recall} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="Try getuserinfo or games…" maxLength={200}/><button type="submit">Run</button></form>
    <div className={styles.consoleQuickActions} role="group" aria-label="Quick commands">{commands.map(command=><button key={command} type="button" onClick={()=>run(command)}>{command}</button>)}</div>
    <p className={styles.consoleFootnote}>↑ / ↓ history · Esc closes · Ctrl / Cmd + K opens · clear removes reports</p>
  </dialog>;
}
