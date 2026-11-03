import { useRef, useState } from "react";
import styles from "../../../styles/SecurityPortfolio.module.css";

const steps=["Events","Context","Decision"];
const content=[
  {title:"A suspicious sign-in",description:"Repeated failures are followed by a successful sign-in from the same source.",action:"Inspect context"},
  {title:"Put the events in context",description:"Compare the source, identity and device signals before drawing a conclusion.",action:"Review decision"},
  {title:"Investigate before classifying",description:"A suspicious pattern is a starting point. It does not establish account compromise.",action:"Replay scenario"}
];

export default function SignInScenario() {
  const [step,setStep]=useState(0);
  const tabs=useRef([]);
  function keyboard(event,index) {
    let next;
    if(event.key==="ArrowRight") next=(index+1)%3;
    if(event.key==="ArrowLeft") next=(index+2)%3;
    if(event.key==="Home") next=0;
    if(event.key==="End") next=2;
    if(next!==undefined){event.preventDefault();setStep(next);tabs.current[next]?.focus();}
  }
  return <div className={styles.scenario}>
    <div className={styles.scenarioHeading}><h3>{content[step].title}</h3><span className={styles.synthetic}>Synthetic scenario<span className={styles.mobileOnly}> · Interaction concept</span></span></div>
    <div role="tablist" aria-label="Sign-in investigation steps" className={styles.tabs}>{steps.map((label,index)=><button key={label} ref={node=>{tabs.current[index]=node;}} type="button" role="tab" id={`investigation-tab-${index}`} aria-selected={step===index} aria-controls="investigation-panel" tabIndex={step===index?0:-1} className={step===index?styles.activeTab:styles.tab} onClick={()=>setStep(index)} onKeyDown={event=>keyboard(event,index)}>{label}</button>)}</div>
    <div id="investigation-panel" role="tabpanel" aria-labelledby={`investigation-tab-${step}`} className={styles.scenarioPanel} tabIndex="0">
      <p>{content[step].description}</p>
      <div className={styles.evidence}>
        {step===0 ? <><div className={styles.events} role="table" aria-label="Sample sign-in events">{[["09:14:02","Failed"],["09:14:19","Failed"],["09:15:03","Success"]].map(([time,result])=><div key={time} role="row" className={styles.eventRow}><time role="cell">{time}</time><span role="cell" className={styles.eventSource}>Sign-in · 203.0.113.24</span><span role="cell" className={result==="Success"?styles.success:styles.failed}>{result}</span></div>)}</div><p className={styles.mobileSource}>Source: 203.0.113.24</p></> :
        step===1 ? <><p className={styles.evidenceTitle}>What this sample tells us</p><p className={styles.evidenceText}>Same identity and source across all three events.<br/>The success follows two failures within about a minute.<br/>Device, MFA and user confirmation are still needed.</p></> :
        <><p className={styles.evidenceTitle}>Next step: correlate and verify</p><p className={styles.evidenceText}>Confirm the activity with the user. Review device and identity context. Escalate under the team&apos;s procedure if the combined evidence supports compromise.</p></>}
      </div>
    </div>
    <button type="button" className={styles.primaryButton} onClick={()=>setStep((step+1)%3)}>{content[step].action}</button>
    <p className={styles.caption}>Portfolio interaction concept using synthetic events.</p>
  </div>;
}
