import Link from "next/link";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import assets from "../../data/projectAssets.json";
import usePortfolioDialog from "./usePortfolioDialog";
import styles from "../../../styles/SecurityPortfolio.module.css";

export default function ProjectExplorer({ project, onClose }) {
  const [view, setView] = useState("overview");
  const modal = usePortfolioDialog(Boolean(project), onClose);
  const image = assets[project.image] || project.image;
  return <dialog {...modal} className={`${styles.interactiveDialog} ${styles.explorerDialog}`} aria-labelledby="project-explorer-title">
    <div className={styles.dialogBar}><span>Project explorer</span><button type="button" className={styles.iconButton} aria-label="Close project preview" onClick={onClose}><LuX size={20}/></button></div>
    <div className={styles.explorerBody}>
      <div className={styles.explorerVisual}>{image && <img src={image} alt={`${project.title} project preview`} width="1300" height="960"/>}<code>PS&gt; Open-Project {project.slug}</code></div>
      <div className={styles.explorerContent}><p className={styles.caption}>{project.year} · {project.categories}</p><h2 id="project-explorer-title">{project.title}</h2><p className={styles.explorerSubtitle}>{project.subtitle}</p>
        <div className={styles.explorerViews} role="group" aria-label="Project preview information">{["overview", "stack", "outcomes"].map(item => <button key={item} type="button" aria-pressed={view === item} className={view === item ? styles.selectedFilter : styles.filterButton} onClick={() => setView(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}</div>
        <div className={styles.explorerDetails} tabIndex={0} role="region" aria-label={`${view} for ${project.title}`} aria-live="polite">{view === "overview" && <p>{project.description?.[0] || project.subtitle}</p>}{view === "stack" && <ul>{(Array.isArray(project.technologies) ? project.technologies : (project.technologies || "").split(",")).map(technology => <li key={technology}>{technology.trim()}</li>)}</ul>}{view === "outcomes" && (project.conclusion?.length ? <ul>{project.conclusion.map(outcome => <li key={outcome}>{outcome}</li>)}</ul> : <p>Read the case study for the full project story.</p>)}</div>
        <Link href={`/works/${project.slug}`} className={styles.primaryButton} onClick={onClose}>Read full case study</Link>
      </div>
    </div>
  </dialog>;
}
