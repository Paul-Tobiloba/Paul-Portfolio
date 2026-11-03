import ProjectDetail from "../../../src/components/security/ProjectDetail";
import { getProjectBySlug, getProjectSlugs } from "../../../src/lib/projects";
export default function WorkSingle({ project }) { return <ProjectDetail key={project.slug} project={project}/>; }
export const getStaticPaths=async()=>({paths:(await getProjectSlugs()).filter(slug=>!["lagosnet","reconciliation-rpa"].includes(slug)).map(slug=>({params:{slug}})),fallback:"blocking"});
export const getStaticProps=async({params})=>{const project=await getProjectBySlug(params.slug);return project?{props:{project},revalidate:60}:{notFound:true,revalidate:60};};
WorkSingle.securityPortfolio=true;
