import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import content from "../../data/portfolioContent.json";
import styles from "../../../styles/SecurityPortfolio.module.css";

export function Services() {
  return <div className={styles.serviceList}>{content.services.map(service=><article key={service.title} className={styles.serviceItem}><h3>{service.title}</h3><p className={styles.serviceCategory}>{service.category}</p><p>{service.description}</p><a href="#contact-section" className={styles.textLink}>{service.intent==="role"?"Discuss a role":"Discuss a project"}</a></article>)}</div>;
}

export { default as ProfessionalSkills } from "./SkillSignalMap";

export { default as FullResume } from "./RoleExplorer";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const { testimonials } = content;
  const person = testimonials[active];
  const initials = person.name.split(" ").slice(0, 2).map(word => word[0]).join("");

  function move(direction) {
    setActive(current => Math.max(0, Math.min(testimonials.length - 1, current + direction)));
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <div className={styles.testimonialSection} onKeyDown={handleKeyDown}>
      <div role="region" tabIndex={0} aria-label="Client and colleague testimonials" aria-live="polite" aria-atomic="true">
        <figure className={styles.testimonialSpotlight}>
          <svg className={styles.testimonialQuoteMark} viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
            <path d="M0 24V13C0 5 5 1 13 0v4c-5 1-7 4-7 8h7v12H0Zm19 0V13c0-8 5-12 13-13v4c-5 1-7 4-7 8h7v12H19Z" />
          </svg>
          <blockquote>{person.text}</blockquote>
          <figcaption>
            <span className={styles.authorAvatar} aria-hidden="true">
              {person.avatar ? <img src={person.avatar} width="40" height="40" alt="" loading="lazy" /> : initials}
            </span>
            <span>
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
      <div className={styles.testimonialControls} role="group" aria-label="Browse testimonials">
        <span className={styles.testimonialCount}>{active + 1} of {testimonials.length}</span>
        <button type="button" onClick={() => move(-1)} aria-disabled={active === 0} aria-label="Previous testimonial">
          <LuArrowLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-disabled={active === testimonials.length - 1} aria-label="Next testimonial">
          <LuArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
