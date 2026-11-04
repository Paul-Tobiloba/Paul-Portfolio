import { LuBoxes, LuDatabase, LuNetwork, LuTerminal } from 'react-icons/lu';
import styles from '../../../styles/SkillSignalMap.module.css';

const brandMarks = new Map(Object.entries({
  "Azure": "azure.svg",
  "AWS": "aws.svg",
  "Microsoft Sentinel": "sentinel.svg",
  "Wireshark": "wireshark.svg",
  "Cisco Packet Tracer": "cisco.svg",
  "Kali Linux": "kalilinux.svg",
  "Nintex K2": "nintex.png",
  "Nintex Workflow Cloud": "nintex.png",
  "Power Apps": "power-apps.svg",
  "Power Automate": "power-automate.svg",
  "SharePoint": "sharepoint.svg",
  "n8n": "n8n.svg",
  "Zenphi": "zenphi.png",
  "Make.com": "make.svg",
  "Gumloop": "gumloop.ico",
  "Activepieces": "activepieces.svg",
  "SmartSuite": "smartsuite.png",
  "HTML": "html.svg",
  "CSS": "css.svg",
  "JavaScript": "javascript.svg",
  "React": "react.svg",
  "Next.js": "nextjs.svg",
  "Redux": "redux.svg",
  "Tailwind": "tailwind.svg",
  "SCSS": "scss.svg",
  "jQuery": "jquery.svg",
  "PostgreSQL": "postgresql.svg",
  "WordPress (Elementor)": "wordpress.svg",
  "Python": "python.svg"
}));
const lightSurface = new Set(['aws.svg', 'nextjs.svg', 'wordpress.svg', 'activepieces.svg', 'make.svg', 'zenphi.png']);
const skillSymbols = {
  SQL: <LuDatabase focusable="false" />,
  Networking: <LuNetwork focusable="false" />,
  tcpdump: <LuTerminal focusable="false" />,
};

export default function SkillMark({ name }) {
  const file = brandMarks.get(name);
  if (file) {
    return <span
      aria-hidden="true"
      className={`${styles.toolMark} ${styles.brandMark} ${lightSurface.has(file) ? styles.markSurface : ''}`}
      style={{ backgroundImage: `url(/assets/skill-marks/${file})` }}
    />;
  }
  return <span aria-hidden="true" className={styles.toolMark}>{Object.hasOwn(skillSymbols, name) ? skillSymbols[name] : <LuBoxes focusable="false" />}</span>;
}
