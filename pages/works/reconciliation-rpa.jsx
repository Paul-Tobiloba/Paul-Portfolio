import ProjectDetail from "../../src/components/security/ProjectDetail";
import { getProjectBySlug } from "../../src/lib/projects";
export default function ReconciliationCase({project}) {return <ProjectDetail key={project.slug} project={project}/>;}
export const getStaticProps=async()=>{const project=await getProjectBySlug("reconciliation-rpa");return project?{props:{project},revalidate:60}:{notFound:true,revalidate:60};};
ReconciliationCase.securityPortfolio=true;
