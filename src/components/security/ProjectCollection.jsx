import Link from "next/link";
import { useState } from "react";
import ProjectExplorer from "./ProjectExplorer";
import assets from "../../data/projectAssets.json";
import styles from "../../../styles/SecurityPortfolio.module.css";

export const projectFilters=[["*","All"],["sorting-web-development","Web development"],["sorting-business-process-automation","Business process automation"],["sorting-scripting-and-automations","Scripting & AI"],["sorting-rpa-and-power-platform","RPA & Power Platform"]];
export const projectImage = source => assets[source] || (source?.startsWith("assets/") ? `/${source}` : source);

export default function ProjectCollection({ projects, compact=false }) {
  const Heading=compact?"h3":"h2";
  const [preview,setPreview]=useState(null);
  const [category,setCategory]=useState("*");
  const [query,setQuery]=useState("");
  const visible=projects.filter(project=>(category==="*"||project.filters?.includes(category))&&[project.title,project.subtitle,project.technologies,project.categories].filter(Boolean).join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  const categories=projectFilters.filter(([key])=>key==="*"||projects.some(project=>project.filters?.includes(key)));
  return <div className={styles.collection}>
    <div className={styles.filterBar} role="group" aria-label="Portfolio categories">{categories.map(([key,label])=><button key={key} type="button" aria-pressed={category===key} className={category===key?styles.selectedFilter:styles.filterButton} onClick={()=>setCategory(key)}>{label}</button>)}</div>
    {!compact&&<label className={styles.searchField}>Search projects<input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Project, technology or discipline" /></label>}
    <p className={styles.caption} aria-live="polite">{visible.length} {visible.length===1?"project":"projects"}</p>
    <div className={`${styles.portfolioGrid} ${compact?styles.compactPortfolio:""}`}>{visible.map(project=><article key={project.slug} className={styles.portfolioItem}><button type="button" className={styles.projectThumb} aria-label={`Preview ${project.title}`} aria-haspopup="dialog" onClick={()=>setPreview(project)}>{project.image&&<img src={projectImage(project.image)} alt={project.title} width="1300" height="960" loading="lazy" decoding="async"/>}<span className={styles.projectPreviewLabel}>Explore project</span></button><p className={styles.caption}>{project.year} · {project.categories}</p><Heading><Link href={`/works/${project.slug}`}>{project.title}</Link></Heading><p className={styles.projectExcerpt}>{project.description?.[0]||project.subtitle}</p><Link href={`/works/${project.slug}`} className={styles.textLink}>Read case study</Link></article>)}</div>
    {!visible.length&&<div className={styles.emptyResults}><Heading>No matching projects</Heading><p>Try another category or search term.</p><button type="button" className={styles.secondaryButton} onClick={()=>{setCategory("*");setQuery("");}}>Reset filters</button></div>}
    {preview&&<ProjectExplorer key={preview.slug} project={preview} onClose={()=>setPreview(null)}/>}
    {compact&&<Link href="/works" className={styles.secondaryButton}>Explore the full portfolio</Link>}
  </div>;
}
