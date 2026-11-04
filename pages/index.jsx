import Link from "next/link";
import PortfolioShell, { EMAIL, GITHUB, LINKEDIN } from "../src/components/security/PortfolioShell";
import ContactForm from "../src/components/security/ContactForm";
import BinaryPortrait from "../src/components/security/BinaryPortrait";
import SignInScenario from "../src/components/security/SignInScenario";
import ProjectCollection from "../src/components/security/ProjectCollection";
import WritingList from "../src/components/security/WritingList";
import Certifications from "../src/components/security/Certifications";
import { Services, ProfessionalSkills, FullResume, Testimonials } from "../src/components/security/RestoredSections";
import { getProjects } from "../src/lib/projects";
import { blogPosts } from "../src/data/blogPosts";
import styles from "../styles/SecurityPortfolio.module.css";

function Section({id,aliases=[],title,description,children,wide=false}) {
  return <section id={id} className={`${styles.editorialSection} ${id==="investigation"?styles.investigationSection:""} ${wide?styles.fullWidthSection:""}`}><div className={styles.sectionIntro}>{aliases.map(alias=><span id={alias} key={alias} className={styles.anchorAlias} aria-hidden="true"/>)}<h2>{title}</h2>{description&&<p>{description}</p>}</div><div className={styles.sectionBody}>{children}</div></section>;
}
export default function Home({projects}) {
  return <PortfolioShell home><main id="main" className={styles.main}>
    <section id="started-section" className={styles.hero} aria-labelledby="hero-title"><div className={styles.heroCopy}><p className={styles.heroDiscipline}>Automation engineering / Cybersecurity</p><h1 id="hero-title">I build smarter systems.<br/>I secure what matters.</h1><p className={styles.heroDescription}>I&apos;m Paul Tobiloba, an automation engineer expanding into cybersecurity. I bring enterprise automation experience and a growing focus on security operations, cloud security, and building resilient systems.</p><div className={styles.heroActions}><a href="#works-section" className={styles.primaryButton}>Explore my work</a><a href="/resume.pdf" className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">View résumé</a></div><div className={styles.heroMeta}><span>Lagos, Nigeria</span><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div><BinaryPortrait/><p className={styles.mobileLocation}>Lagos, Nigeria</p></section>
    <Section id="investigation" title={<>Inspect the<br/>{" "}evidence.</>} description="Step through an illustrative sign-in scenario: review the events, add context and decide what to investigate next."><SignInScenario/><Link href="/works/sign-in-triage-lab" className={styles.textLink}>Read the sign-in triage case study</Link></Section>
    <Section id="services-section" title="What I do" description="Cybersecurity, cloud platforms and the engineering that connects them."><Services/></Section>
    <Section id="skills-section" wide title={<>The tools<br/>{" "}behind the work.</>} description="Select a discipline. Follow a connection."><ProfessionalSkills/></Section>
    <Section id="works-section" aliases={["work"]} title="Portfolio" description="Explore cybersecurity labs and professional work in web development, AI and automation."><ProjectCollection projects={projects} compact/></Section>
    <Section id="resume-section" aliases={["experience"]} wide title={<>Engineering roots.<br/>{" "}Security direction.</>} description="Experience"><FullResume/></Section>
    <Section id="certifications-section" wide title="Certifications" description="Credentials and ongoing study in cybersecurity and workflow automation.">
      <Certifications />
    </Section>
    <Section id="testimonials-section" title="Testimonials" description="Feedback from the clients and colleagues I've worked with."><Testimonials/></Section>
    <Section id="blog-section" title="Blog" description="Practical writing on building, delivering and maintaining real systems."><WritingList posts={blogPosts} compact/></Section>
    <Section id="contact-section" aliases={["contact"]} title="Let's talk about your team."><p>Open to conversations about entry-level SOC analyst and cloud security roles.</p><a href={EMAIL} className={styles.contactEmail}>oluwatobiloba.xyz@gmail.com</a><a href="https://cal.com/paul-tobiloba" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Schedule a call</a><ContactForm/><footer className={styles.footer}><span>Paul Tobiloba · {new Date().getFullYear()}</span><a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé</a><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></footer></Section>
  </main></PortfolioShell>;
}
export const getStaticProps = async () => {
  const projects = await getProjects();
  return { props: { projects: projects.slice(0, 6) }, revalidate: 60 };
};
Home.securityPortfolio=true;
