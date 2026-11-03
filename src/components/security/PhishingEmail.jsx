import { LuMail, LuFlag, LuTrash2, LuUndo2, LuShieldCheck, LuCircleAlert, LuPaperclip, LuMonitor, LuLockKeyhole, LuCloud, LuCheck, LuPause, LuPlay } from 'react-icons/lu';
import styles from '../../../styles/SecurityPortfolio.module.css';

function MailMessage({ message, active, onAction }) {
  return <article className={styles.trainingEmail} aria-label="Simulated phishing email">
    <header className={styles.emailHeader}><span className={styles.emailAvatar} aria-hidden="true"><LuMail size={22}/></span><div><p><strong>{message.sender}</strong> <span>&lt;{message.address}&gt;</span></p><p>To: You · <time dateTime={message.receivedAt}>{new Date(message.receivedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</time> · Training inbox</p></div></header>
    <div className={styles.emailBody}><h3>{message.subject}</h3>{message.body.map((paragraph,index)=><p key={index}>{paragraph}</p>)}
      {message.attachment&&<div className={styles.emailAttachment}><LuPaperclip size={20} aria-hidden="true"/><div><strong>{message.attachment}</strong><span>Spreadsheet attachment · training file</span></div></div>}
      {message.permissions&&<div className={styles.consentPreview}><p>Document Viewer requests:</p><ul>{message.permissions.map(permission=><li key={permission}>{permission}</li>)}</ul></div>}
      <button type="button" className={styles.emailPrimary} disabled={!active} onClick={()=>onAction('click')}>{message.cta}</button>
      <details className={styles.emailLinkPreview}><summary>{message.attachment?'Inspect attachment details':'Inspect link destination'}</summary><code>{message.destination}</code></details><p>Thanks,<br/>{message.signoff}</p>
    </div>
    <footer className={styles.emailActions}><button type="button" disabled={!active} onClick={()=>onAction('report')}><LuFlag size={16} aria-hidden="true"/>Report phishing</button><button type="button" disabled={!active} onClick={()=>onAction('delete')}><LuTrash2 size={16} aria-hidden="true"/>Delete</button></footer>
  </article>;
}
function AttackSimulation({ result, interactive, onAction, stop }) {
  const attack=result.message.attack;
  const Icon=attack.type==='files'?LuLockKeyhole:attack.type==='cloud'?LuCloud:LuMonitor;
  return <section className={styles.attackSimulation} data-console-result-focus={result.phase==='attacking'?'':undefined} tabIndex={0} aria-label="Simulated attack on a fictional training device">
    <div className={styles.attackHeading}><Icon size={28} aria-hidden="true"/><div><h3>{attack.title}</h3><p>SIMULATION · Your actual device is untouched</p></div></div>
    <p>{result.phase==='attacking'?'Showing a fictional attack sequence inside this console.':'Training sequence complete. This was a mock compromise.'}</p>
    <progress className={styles.attackProgress} value={result.attackStep} max={attack.events.length} aria-label="Simulated attack sequence progress"/>
    <ol className={styles.attackEvents}>{attack.events.map((event,index)=><li key={event} className={index<result.attackStep?styles.attackEventDone:styles.attackEventWaiting}><span aria-hidden="true">{index<result.attackStep?<LuCheck size={16}/>:index+1}</span>{event}</li>)}</ol>
    {attack.type==='files'&&<div className={styles.mockFiles} aria-label="Fictional files only"><p>Fictional training workspace</p>{['budget.xlsx','project-notes.docx','team-plan.pdf'].map(file=><div key={file}><LuLockKeyhole size={15} aria-hidden="true"/><code>{file}{result.attackStep>=3?'.locked':''}</code><span>{result.attackStep>=3?'simulated locked':'demo file'}</span></div>)}</div>}
    {attack.type==='cloud'&&result.attackStep>=2&&<p className={styles.attackImpact}>Demo app access: mailbox, cloud files, ongoing access.</p>}
    {attack.type==='identity'&&result.attackStep>=3&&<p className={styles.attackImpact}>Training identity: training.user@example.test · mock attacker session active.</p>}
    <p className={styles.terminalNote}>{attack.impact}</p>
    <div className={styles.emailReplayActions}>{result.phase==='attacking'&&interactive&&<button type="button" className={styles.filterButton} onClick={()=>onAction(result.paused?'resume':'pause')}>{result.paused?<LuPlay size={16} aria-hidden="true"/>:<LuPause size={16} aria-hidden="true"/>}{result.paused?'Resume sequence':'Pause sequence'}</button>}<button type="button" className={styles.secondaryButton} disabled={!interactive} onClick={()=>onAction('retry')}>Contain &amp; retry this email</button><button type="button" className={styles.filterButton} disabled={!interactive} onClick={stop}>Exit challenge</button></div>
  </section>;
}
export default function PhishingEmail({ result, interactive, onAction, restart, stop }) {
  const {message,phase,feedback}=result;
  const active=interactive&&phase==='delivered';
  const attacked=['attacking','clicked'].includes(phase);
  return <div className={styles.phishingSimulation}>
    <div className={styles.campaignProgress}><span>Email {result.round+1} / {result.total}</span><span>{result.reported} reported · {result.mistakes} risky {result.mistakes===1?'click':'clicks'}</span></div>
    {phase==='complete'?<section className={styles.campaignComplete} data-console-result-focus tabIndex={0} aria-label="Phishing challenge completed"><LuShieldCheck size={32} aria-hidden="true"/><h3>All three threats reported.</h3><p>You worked through {result.total} different phishing tactics with {result.mistakes} risky {result.mistakes===1?'click':'clicks'} along the way.</p><div className={styles.campaignLessonReview}>{result.reviews.map(review=><details key={review.round}><summary><LuCheck size={16} aria-hidden="true"/>Email {review.round}: {review.tactic}</summary><p>{review.description}</p><ul>{review.signals.map(signal=><li key={signal}>{signal}</li>)}</ul><p>{review.lesson}</p></details>)}</div><p>Keep verifying the sender, destination, attachments and requested permissions. No real account or device was affected.</p><button type="button" className={styles.secondaryButton} onClick={restart}>Restart the three-email challenge</button></section>:<>
      <p className={styles.terminalNote}>Training inbox only. The known domain for this email is <code>{message.knownDomain}</code>. No real email, file or account is involved.</p>
      {result.previousFeedback&&<details className={styles.previousEmailFeedback}><summary>Previous email: reported correctly</summary><p>{result.previousFeedback.description}</p><ul>{result.previousFeedback.signals.map(signal=><li key={signal}>{signal}</li>)}</ul><p>{result.previousFeedback.lesson}</p></details>}
      {phase==='delivered'?<MailMessage message={message} active={active} onAction={onAction}/>:phase==='deleted'?<div className={styles.emailDeleted}><LuTrash2 size={22} aria-hidden="true"/><div><p>Message removed from the training inbox</p><p>{message.subject}</p></div></div>:<details className={styles.reviewEmail}><summary>Review the email: {message.subject}</summary><MailMessage message={message} active={false} onAction={onAction}/></details>}
      {active&&<p>Inspect the message and choose an action. Reporting a threat advances the challenge. You can also type <code>email report</code>.</p>}
      {!interactive&&!feedback&&<p className={styles.terminalNote}>This challenge is inactive. Run Send-PhishingEmail to start again.</p>}
      {attacked&&<AttackSimulation result={result} interactive={interactive} onAction={onAction} stop={stop}/>}
      {feedback&&phase!=='attacking'&&<section className={styles.emailDebrief} data-console-result-focus tabIndex={0} aria-label="Phishing simulation feedback"><h3>{feedback.tone==='success'?<LuShieldCheck size={22} aria-hidden="true"/>:<LuCircleAlert size={22} aria-hidden="true"/>}{feedback.title}</h3><p>{feedback.description}</p><h4>Signals to notice · {message.tactic}</h4><ul>{message.signals.map(signal=><li key={signal}>{signal}</li>)}</ul><p>{feedback.lesson}</p><div className={styles.emailReplayActions}>
        {phase==='clicked'&&interactive&&<button type="button" className={styles.secondaryButton} onClick={()=>onAction('retry')}>Contain &amp; retry this email</button>}
        {phase==='deleted'&&interactive&&<button type="button" className={styles.filterButton} onClick={()=>onAction('undo')}><LuUndo2 size={16} aria-hidden="true"/>Undo &amp; try reporting</button>}
        {phase==='reported'&&interactive&&<><p>{result.paused?'Auto-advance paused. Feedback stays available when you continue.':result.round+1<result.total?'Next email follows automatically. You can review this feedback on the next round.':'Challenge summary follows automatically.'}</p><button type="button" className={styles.filterButton} onClick={()=>onAction(result.paused?'resume':'pause')}>{result.paused?'Resume auto-advance':'Pause auto-advance'}</button><button type="button" className={styles.secondaryButton} onClick={()=>onAction('next')}>{result.round+1<result.total?'Next email now':'View results'}</button></>}
      </div></section>}
    </>}
  </div>;
}
