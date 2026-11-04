import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PortfolioShell, { ASSETS } from "./PortfolioShell";
import ReconciliationWorkflow from "./ReconciliationWorkflow";
import SignInScenario from "./SignInScenario";
import { projectAvailability } from "../../lib/projectAvailability.mjs";
import { projectImage } from "./ProjectCollection";
import styles from "../../../styles/SecurityPortfolio.module.css";

function videoEmbed(value) {
  try {
    const url=new URL(value);
    const host=url.hostname.replace(/^www\./,"");
    const id=host==="youtu.be"?url.pathname.slice(1):["youtube.com","youtube-nocookie.com"].includes(host)?(url.pathname.startsWith("/embed/")?url.pathname.split("/")[2]:url.searchParams.get("v")):null;
    return id&&/^[\w-]{11}$/.test(id)?`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`:null;
  } catch {return null;}
}

function Gallery({ images, title }) {
  const [selected,setSelected]=useState(null);
  const modal=useRef(null);
  const opener=useRef(null);
  const isOpen=selected!==null;
  useEffect(()=>{
    if(!isOpen) return;
    const dialog=modal.current;
    const previous=document.body.style.overflow;
    dialog.showModal();document.body.style.overflow="hidden";
    dialog.querySelector("button")?.focus();
    return()=>{dialog.close();document.body.style.overflow=previous;opener.current?.focus({preventScroll:true});};
  },[isOpen]);
  function close(){setSelected(null);}
  function navigate(direction){setSelected(current=>(current+direction+images.length)%images.length);}
  function keys(event){
    if(event.key==="ArrowRight"){event.preventDefault();navigate(1);}
    if(event.key==="ArrowLeft"){event.preventDefault();navigate(-1);}
    if(event.key==="Tab"){const controls=[...modal.current.querySelectorAll("button")];const first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&event.target===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&event.target===last){event.preventDefault();first.focus();}}
  }
  return <><div className={styles.projectGallery}>{images.map((image,index)=><button key={image+"-"+index} type="button" className={styles.galleryThumb} aria-label={`View ${title} screenshot ${index+1} of ${images.length}`} onClick={event=>{opener.current=event.currentTarget;setSelected(index);}}><img src={projectImage(image)} alt={`${title}, project screenshot ${index+1}`} width="1600" height="1000" loading="lazy" decoding="async"/><span>View screenshot {index+1}</span></button>)}</div><dialog ref={modal} className={styles.galleryDialog} aria-label={`${title} image viewer`} onCancel={close} onKeyDown={keys} onClick={event=>{if(event.target===event.currentTarget)close();}}><div className={styles.galleryToolbar}><span>{selected===null?0:selected+1} / {images.length}</span><button type="button" className={styles.iconButton} aria-label="Close image viewer" onClick={close}><img src={`${ASSETS}/icon-x.svg`} width="20" height="20" alt=""/></button></div>{selected!==null&&<img className={styles.fullGalleryImage} src={projectImage(images[selected])} alt={`${title}, screenshot ${selected+1}`}/>}<div className={styles.galleryControls}><button className={styles.secondaryButton} type="button" onClick={()=>navigate(-1)}>Previous image</button><button className={styles.secondaryButton} type="button" onClick={()=>navigate(1)}>Next image</button></div></dialog></>;
}

export default function ProjectDetail({ project }) {
  const [playing,setPlaying]=useState(false);
  const {liveUrl,videoUrl,hasGallery,isLab,label}=projectAvailability(project);
  const embed=videoEmbed(videoUrl);
  const images=project.projectImg?.length?project.projectImg:[project.image].filter(Boolean);
  return <PortfolioShell title={`${project.title} | Paul Tobiloba`} description={project.subtitle||project.description?.[0]}>
    <main id="main" className={`${styles.main} ${styles.projectPage}`}>
      <Link href="/works" className={styles.textLink}>Back to portfolio</Link>
      <div className={styles.projectPageHeading}><h1>{project.title}</h1><p>{project.subtitle}</p></div>
      <div className={styles.projectPageMeta}><dl>{[["Year",project.year],["Technology",project.technologies],["Discipline",project.categories]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value||"—"}</dd></div>)}</dl><div className={styles.projectAvailability}><p className={styles.caption}>{label}</p><div className={styles.projectActions}>{liveUrl&&<a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>View public website</a>}{isLab&&<a href="#project-lab" className={styles.primaryButton}>Try the lab</a>}{videoUrl&&<a href="#project-video" className={liveUrl?styles.secondaryButton:styles.primaryButton}>Watch walkthrough</a>}{hasGallery&&<a href="#project-gallery" className={styles.secondaryButton}>View project gallery</a>}</div></div></div>
      {images[0]&&<figure className={styles.projectCover}><img src={projectImage(images[0])} alt={`${project.title} project interface`} width="1600" height="1000" fetchPriority="high"/></figure>}
      <div className={styles.projectNarrative}><div className={styles.projectStory}><section className={styles.caseSection}><h2>About the project</h2>{project.description.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</section>{project.slug==="reconciliation-rpa"&&<ReconciliationWorkflow/>}{isLab&&<section id="project-lab" className={styles.caseSection}><h2>Run the exercise</h2><SignInScenario/></section>}<section className={styles.caseSection}><h2>Outcomes & next steps</h2>{project.conclusion.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</section></div><aside className={styles.projectAside}><h2>Explore this work</h2>{hasGallery&&<a href="#project-gallery" className={styles.textLink}>Project gallery</a>}{isLab&&<a href="#project-lab" className={styles.textLink}>Try the lab</a>}{videoUrl&&<a href="#project-video" className={styles.textLink}>Project walkthrough</a>}<Link href="/works" className={styles.textLink}>All projects</Link></aside></div>
      {hasGallery&&<section id="project-gallery" className={styles.gallerySection}><div className={styles.routeSectionHeading}><h2>Project gallery</h2><p>Select an image for a closer look.</p></div><Gallery images={images} title={project.title}/></section>}
      {videoUrl&&<section id="project-video" className={styles.videoSection}><h2>Project walkthrough</h2>{embed?<div className={styles.videoFrame}>{playing?<iframe src={embed} title={`${project.title} video walkthrough`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>:<button type="button" className={styles.videoPoster} onClick={()=>setPlaying(true)}><img src={projectImage(project.image||images[0])} alt="" loading="lazy"/><span className={styles.primaryButton}>Play project video</span></button>}</div>:<a href={videoUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Watch project video</a>}</section>}
      <nav className={styles.nextProject} aria-label="More projects"><Link href="/works" className={styles.secondaryButton}>All projects</Link>{project.nextProject&&<Link href={`/works/${project.nextProject.slug}`}><span className={styles.caption}>Next project</span><strong>{project.nextProject.title}</strong></Link>}</nav>
    </main>
  </PortfolioShell>;
}
