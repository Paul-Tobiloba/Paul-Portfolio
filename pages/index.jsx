import PortfolioShell, { EMAIL, GITHUB, LINKEDIN } from "../src/components/security/PortfolioShell";
import ContactForm from "../src/components/security/ContactForm";
import BinaryPortrait from "../src/components/security/BinaryPortrait";
import SignInScenario from "../src/components/security/SignInScenario";
import ProjectCollection from "../src/components/security/ProjectCollection";
import WritingList from "../src/components/security/WritingList";
import { Services, ProfessionalSkills, FullResume, Testimonials } from "../src/components/security/RestoredSections";
import { getProjects } from "../src/lib/projects";
import { blogPosts } from "../src/data/blogPosts";
import styles from "../styles/SecurityPortfolio.module.css";

function Section({id,aliases=[],title,description,children}) {
  return <section id={id} className={`${styles.editorialSection} ${id==="investigation"?styles.investigationSection:""}`}><div className={styles.sectionIntro}>{aliases.map(alias=><span id={alias} key={alias} className={styles.anchorAlias} aria-hidden="true"/>)}<h2>{title}</h2>{description&&<p>{description}</p>}</div><div className={styles.sectionBody}>{children}</div></section>;
}
export default function Home({projects}) {
  return <PortfolioShell home><main id="main" className={styles.main}>
    <section id="started-section" className={styles.hero} aria-labelledby="hero-title"><div className={styles.heroCopy}><h1 id="hero-title">An engineering mind.<br/>A security focus.</h1><p className={styles.heroDescription}>I&apos;m Paul Tobiloba, a cybersecurity intern with an automation engineering background, pursuing entry-level SOC analyst and cloud security roles. <span className={styles.desktopBio}>I build workflows, trace problems and document how systems behave.</span></p><div className={styles.heroActions}><a href="#works-section" className={styles.primaryButton}>Explore my work</a><a href="/resume.pdf" className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">View résumé</a></div><div className={styles.heroMeta}><span>Lagos, Nigeria</span><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div><BinaryPortrait/><p className={styles.mobileLocation}>Lagos, Nigeria</p></section>
    <Section id="investigation" title={<>Inspect the<br/>{" "}evidence.</>} description="Step through an illustrative sign-in scenario: review the events, add context and decide what to investigate next."><SignInScenario/></Section>
    <Section id="services-section" title="What I do" description="Cybersecurity, cloud platforms and the engineering that connects them."><Services/></Section>
    <Section id="skills-section" title="Professional skills" description="The tools and technologies I use across cybersecurity, cloud platforms, automation and frontend development."><ProfessionalSkills/></Section>
    <Section id="works-section" aliases={["work"]} title="Portfolio" description="Explore my published work across web development, AI, workflows and RPA."><ProjectCollection projects={projects} compact/></Section>
    <Section id="resume-section" aliases={["experience"]} title="Résumé & experience" description="The full story: roles, responsibilities and the systems I've helped deliver."><FullResume/></Section>
    <Section id="testimonials-section" title="Testimonials" description="Feedback from the clients and colleagues I've worked with."><Testimonials/></Section>
    <Section id="blog-section" title="Blog" description="Practical writing on building, delivering and maintaining real systems."><WritingList posts={blogPosts} compact/></Section>
    <Section id="about" title={<>An engineering foundation.<br/>{" "}A clear direction into security.</>}><p>My work has centred on understanding complex processes and building systems people can rely on. I&apos;m bringing that curiosity and discipline into security operations and cloud security.</p><p className={styles.smallNote}>Professional automation work and security learning are presented separately. The sign-in walkthrough above is a synthetic interaction concept.</p></Section>
    <Section id="contact-section" aliases={["contact"]} title="Let's talk about your team."><p>Open to conversations about entry-level SOC analyst and cloud security roles.</p><a href={EMAIL} className={styles.contactEmail}>oluwatobiloba.xyz@gmail.com</a><a href="https://cal.com/paul-tobiloba" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Schedule a call</a><ContactForm/><footer className={styles.footer}><span>Paul Tobiloba · {new Date().getFullYear()}</span><a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé</a><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></footer></Section>
  </main></PortfolioShell>;
}
export const getStaticProps=async()=>({props:{projects:await getProjects()},revalidate:60});
Home.securityPortfolio=true;
