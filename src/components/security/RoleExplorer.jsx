import { useEffect, useId, useRef, useState } from 'react';
import content from '../../data/portfolioContent.json';
import { experienceDates, experienceLabel, orderedExperience } from './roleExperience.mjs';
import styles from '../../../styles/RoleExplorer.module.css';
import shellStyles from '../../../styles/SecurityPortfolio.module.css';

const roles = orderedExperience(content.experience);
const initialRole = roles.find(role => role.id === 6) || roles[0];

export default function RoleExplorer() {
  const [activeId, setActiveId] = useState(initialRole.id);
  const [announcement, setAnnouncement] = useState('');
  const root = useRef(null);
  const panels = useRef(new Map());
  const lastActive = useRef(activeId);
  const id = useId();

  // With no JavaScript, every complete role remains readable in the page.
  // Selection controls and the single-panel layout enhance that reading path.
  useEffect(() => {
    const element = root.current;
    element.dataset.enhanced = 'true';
    return () => { delete element.dataset.enhanced; };
  }, []);

  useEffect(() => {
    if (lastActive.current === activeId) return;
    lastActive.current = activeId;
    const panel = panels.current.get(activeId);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!panel?.animate || motion.matches) return;
    const animation = panel.animate([
      { opacity: .75, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 200, easing: 'cubic-bezier(.16,1,.3,1)' });
    function changed() { if (motion.matches) animation.cancel(); }
    motion.addEventListener('change', changed);
    return () => { animation.cancel(); motion.removeEventListener('change', changed); };
  }, [activeId]);

  function chooseRole(role) {
    if (role.id === activeId) return;
    setActiveId(role.id);
    setAnnouncement(`Showing ${role.title} at ${role.company}, ${experienceDates(role)}. All ${role.dec.length} responsibilities are displayed.`);
  }

  return <div ref={root} className={styles.roleExplorer} data-role-explorer="true">
    <div className={styles.layout}>
      <nav className={styles.rail} aria-label="Choose an experience">
        {roles.map(role => <button
          key={role.id}
          type="button"
          className={styles.roleButton}
          aria-pressed={role.id === activeId}
          aria-controls={`${id}-role-${role.id}`}
          aria-label={`${experienceLabel(role)}, ${role.title}, ${experienceDates(role)}`}
          onClick={() => chooseRole(role)}
        ><span className={styles.railDate}>{experienceDates(role, true)}</span><span className={styles.railCompany}>{experienceLabel(role)}</span></button>)}
      </nav>
      <div className={styles.panels}>
        {roles.map(role => <article
          key={role.id}
          id={`${id}-role-${role.id}`}
          ref={node => { if (node) panels.current.set(role.id, node); else panels.current.delete(role.id); }}
          className={styles.panel}
          data-active={role.id === activeId ? 'true' : 'false'}
          aria-labelledby={`${id}-title-${role.id}`}
        >
          <div className={styles.topline}><span>{experienceDates(role)}</span>{!role.endYear && <span className={styles.current}>{role.id === 6 ? 'Current internship' : 'Ongoing'}</span>}</div>
          <header className={styles.roleHeading}><h3 id={`${id}-title-${role.id}`}>{role.title}</h3><p>{role.company}</p></header>
          <div className={styles.work}><h4>Responsibilities</h4><ul>{role.dec.map(text => <li key={text}>{text}</li>)}</ul></div>
        </article>)}
      </div>
    </div>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={shellStyles.secondaryButton}>Download full résumé</a>
    <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </div>;
}
