import PortfolioShell from "../src/components/security/PortfolioShell";
import ProjectCollection from "../src/components/security/ProjectCollection";
import { getProjects } from "../src/lib/projects";
import styles from "../styles/SecurityPortfolio.module.css";
export default function Works({ projects }) {
  return <PortfolioShell title="Portfolio | Paul Tobiloba" description="Explore Paul Tobiloba's complete portfolio of web development, workflow automation, AI and RPA projects."><main id="main" className={`${styles.main} ${styles.archiveMain}`}><div className={styles.archiveHeading}><h1>Portfolio</h1><p>Websites, workflows and automations.<br/>The work, and the decisions behind it.</p></div><ProjectCollection projects={projects}/></main></PortfolioShell>;
}
export const getStaticProps=async()=>({props:{projects:await getProjects()},revalidate:60});
Works.securityPortfolio=true;
