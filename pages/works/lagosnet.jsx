import ProjectDetail from "../../src/components/security/ProjectDetail";
import { getProjectBySlug } from "../../src/lib/projects";
export default function LagosNetCase({project}) {return <ProjectDetail key={project.slug} project={project}/>;}
export const getStaticProps=async()=>{const project=await getProjectBySlug("lagosnet");return project?{props:{project},revalidate:60}:{notFound:true,revalidate:60};};
LagosNetCase.securityPortfolio=true;
