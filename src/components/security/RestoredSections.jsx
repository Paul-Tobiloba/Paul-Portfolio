import { useRef, useState } from "react";
import content from "../../data/portfolioContent.json";
import styles from "../../../styles/SecurityPortfolio.module.css";

export function Services() {
  return <div className={styles.serviceList}>{content.services.map(service=><article key={service.title} className={styles.serviceItem}><h3>{service.title}</h3><p className={styles.serviceCategory}>{service.category}</p><p>{service.description}</p><a href="#contact-section" className={styles.textLink}>{service.intent==="role"?"Discuss a role":"Discuss a project"}</a></article>)}</div>;
}

const skillGroups=[["all","All"],["cybersecurity","Cybersecurity"],["automation","Automation"],["frontend","Frontend"],["others","Tools & data"]];
export function ProfessionalSkills() {
  const [category,setCategory]=useState("cybersecurity");
  const allSkills=Object.entries(content.skills).flatMap(([group,skills])=>skills.map(skill=>({...skill,group})));
  const uniqueSkills=[...new Map(allSkills.map(skill=>[skill.name.toLowerCase(),skill])).values()];
  const visible=category==="all"?uniqueSkills:allSkills.filter(skill=>skill.group===category);
  return <div className={styles.skillSection}><div className={styles.filterBar} role="group" aria-label="Professional skill categories">{skillGroups.map(([key,label])=><button key={key} type="button" aria-pressed={category===key} className={category===key?styles.selectedFilter:styles.filterButton} onClick={()=>setCategory(key)}>{label}</button>)}</div><p className={styles.smallNote}>Explore {uniqueSkills.length} skills across security and engineering. Percentages are self-assessed where shown.</p><div className={styles.skillGrid}>{visible.map(skill=><article key={skill.name} className={styles.skillItem}><div className={styles.skillHeading}><h3>{skill.name}</h3><span>{skill.proficiency!==undefined?skill.proficiency+"%":skill.stage}</span></div><p>{skill.desc}</p>{skill.proficiency!==undefined&&<meter className={styles.skillMeter} min="0" max="100" value={skill.proficiency} aria-label={`${skill.name} self-assessed proficiency`}>{skill.proficiency}%</meter>}</article>)}</div></div>;
}

function RoleHeading({role}) {
  const start=[role.startMonth,role.startYear].filter(Boolean).join(" ");
  const end=role.endYear?[role.endMonth,role.endYear].filter(Boolean).join(" "):"present";
  return <span className={styles.resumeSummary}><span className={styles.caption}>{start} – {end}</span><span className={styles.resumeTitle}>{role.title}</span><span className={styles.company}>{role.company}</span></span>;
}
export function FullResume() {
  const firstDetailed=content.experience.find(role=>role.dec.length)?.id;
  return <div className={styles.resumeList}>{content.experience.map(role=>role.dec.length?<details key={role.id} className={styles.resumeRole} open={role.id===firstDetailed}><summary><RoleHeading role={role}/><span className={styles.resumeAction}>Role details</span></summary><ul className={styles.responsibilities}>{role.dec.map(text=><li key={text}>{text}</li>)}</ul></details>:<article key={role.id} className={styles.resumeRole}><RoleHeading role={role}/></article>)}<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Download full résumé</a></div>;
}

export function Testimonials() {
  const [active,setActive]=useState(0);
  const track=useRef(null);
  function go(index) {
    const next=Math.max(0,Math.min(content.testimonials.length-1,index));
    const rail=track.current;
    rail.scrollTo({left:next*rail.clientWidth,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  }
  return <div className={styles.testimonialSection}><div ref={track} className={styles.testimonialTrack} tabIndex="0" role="region" aria-label="Client and colleague testimonials" onScroll={event=>setActive(Math.round(event.currentTarget.scrollLeft/event.currentTarget.clientWidth))} onKeyDown={event=>{if(event.key==="ArrowRight"){event.preventDefault();go(active+1);}if(event.key==="ArrowLeft"){event.preventDefault();go(active-1);}}}>{content.testimonials.map((item,index)=><figure key={item.name} className={styles.testimonialSlide} aria-label={`Testimonial ${index+1} of ${content.testimonials.length}`}><blockquote>{item.text}</blockquote><figcaption><span className={styles.authorAvatar} aria-hidden="true">{item.avatar?<img src={item.avatar} width="48" height="48" alt="" loading="lazy"/>:item.name.split(" ").map(word=>word[0]).slice(0,2).join("")}</span><span><strong>{item.name}</strong><span>{item.role}</span></span></figcaption></figure>)}</div><div className={styles.carouselControls}><p className={styles.caption} aria-live="polite">{active+1} of {content.testimonials.length}</p><div><button type="button" className={styles.secondaryButton} onClick={()=>go(active-1)} disabled={active===0} aria-label="Previous testimonial">Previous</button><button type="button" className={styles.secondaryButton} onClick={()=>go(active+1)} disabled={active===content.testimonials.length-1} aria-label="Next testimonial">Next</button></div></div></div>;
}
