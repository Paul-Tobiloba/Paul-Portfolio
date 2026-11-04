import { useId, useState } from "react";
import { LuRotateCw } from "react-icons/lu";
import styles from "../../../styles/SecurityPortfolio.module.css";

const certifications = [
  {
    mark: "K2",
    title: "K2 Five IT Developer – Expert",
    issuer: "Nintex University",
    status: "Renewed 2026",
    detailTitle: "How I use it",
    detail: "I use K2 forms, workflows and SmartObjects to build applications for business processes.",
  },
  {
    mark: "G",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google via Coursera",
    detailTitle: "What it covers",
    detail: "Security fundamentals, network defence, threat detection and incident response, with practice using SIEM tools, Linux, SQL and Python.",
  },
  {
    mark: "n8n",
    title: "n8n Certified Expert",
    issuer: "n8n",
    detailTitle: "How I use it",
    detail: "I build workflows with custom nodes and expressions, and integrate systems using self-hosted n8n.",
  },
  {
    mark: "SEC+",
    title: "CompTIA Security+",
    issuer: "CompTIA",
    status: "In progress",
    inProgress: true,
    detail: "Security+ covers core security concepts, how to identify and mitigate threats and vulnerabilities, and how to design secure systems. It also covers day-to-day security operations and how organisations manage and oversee their security programmes.",
  },
];

function CertificationCard({ certification }) {
  const [flipped, setFlipped] = useState(false);
  const id = useId();
  const { mark, title, issuer, status, inProgress, detailTitle, detail } = certification;

  function moveHighlight(event) {
    if (flipped || event.pointerType !== "mouse") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--credential-light-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--credential-light-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <button
      type="button"
      className={styles.certificationCard}
      data-flipped={flipped}
      data-in-progress={inProgress || undefined}
      aria-label={flipped ? `Show credential for ${title}` : `Show details for ${title}`}
      aria-expanded={flipped}
      aria-controls={`${id}-back`}
      aria-describedby={flipped ? `${id}-back` : `${id}-issuer`}
      onPointerMove={moveHighlight}
      onClick={() => setFlipped(current => !current)}
    >
      <span className={styles.certificationFaces}>
        <span className={styles.certificationFace} aria-hidden={flipped}>
          <span className={styles.certificationFaceHeader}>
            <span className={styles.certificationMark} aria-hidden="true">{mark}</span>
            <span className={styles.certificationAction}>Flip <LuRotateCw size={14} aria-hidden="true" /></span>
          </span>
          <span className={styles.certificationTitle}>{title}</span>
          <span id={`${id}-issuer`} className={styles.certificationIssuer}>
            {issuer}{status && <> · <span className={styles.certificationStatus}>{status}</span></>}
          </span>
        </span>
        <span id={`${id}-back`} className={`${styles.certificationFace} ${styles.certificationBack}`} aria-hidden={!flipped}>
          <span className={styles.certificationAction} aria-hidden="true">Flip back <LuRotateCw size={14} aria-hidden="true" /></span>
          {detailTitle && <span className={styles.certificationTitle}>{detailTitle}</span>}
          <span className={styles.certificationIssuer}>{detail}</span>
        </span>
      </span>
    </button>
  );
}

export default function Certifications() {
  return (
    <ul className={styles.certificationGrid}>
      {certifications.map(certification => (
        <li key={certification.title}>
          <CertificationCard certification={certification} />
        </li>
      ))}
    </ul>
  );
}
