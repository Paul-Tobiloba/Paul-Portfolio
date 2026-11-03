import { useRef, useState } from "react";
import content from "../../data/portfolioContent.json";
import styles from "../../../styles/SecurityPortfolio.module.css";

export function Services() {
  return <div className={styles.serviceList}>{content.services.map(service=><article key={service.title} className={styles.serviceItem}><h3>{service.title}</h3><p className={styles.serviceCategory}>{service.category}</p><p>{service.description}</p><a href="#contact-section" className={styles.textLink}>{service.intent==="role"?"Discuss a role":"Discuss a project"}</a></article>)}</div>;
}

export { default as ProfessionalSkills } from "./SkillSignalMap";

export { default as FullResume } from "./RoleExplorer";

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
