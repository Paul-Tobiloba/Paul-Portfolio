import styles from "../../../styles/SecurityPortfolio.module.css";
export default function ReconciliationWorkflow() {
  return <div className={styles.workflow}>
    <h3>From settlement files to matched records</h3>
    <div className={styles.workflowSteps}>{[["Collect",["Settlement reports","Oracle data"]],["Validate",["Python parsing","VBA processing"]],["Reconcile",["Flag mismatches","Generate outputs"]]].map(([title,lines])=><div key={title}><h4>{title}</h4><p>{lines.map((line,i)=><span key={line}>{i>0&&<br/>}{line}</span>)}</p></div>)}</div>
    <p className={styles.caption}>Simplified workflow · Reconstructed from the published project</p>
  </div>;
}
