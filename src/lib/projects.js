import { neon } from "@neondatabase/serverless";
import { projects as fallbackProjects } from "../data/projects";

let sql;

const normalizeProjectShape = (project) => ({
  id: project.id ?? null,
  createdAt:
    project.createdAt instanceof Date
      ? project.createdAt.toISOString()
      : project.createdAt ?? project.created_at ?? null,
  title: project.title,
  slug: project.slug,
  subtitle: project.subtitle ?? null,
  year: project.year ?? null,
  technologies: project.technologies ?? null,
  categories: project.categories ?? null,
  filters: Array.isArray(project.filters) ? project.filters : [],
  image: project.image ?? null,
  description: Array.isArray(project.description) ? project.description : [],
  conclusion: Array.isArray(project.conclusion) ? project.conclusion : [],
  video: project.video ?? null,
  livePreview: project.livePreview ?? project.live_preview ?? null,
  nextProjectSlug:
    project.nextProjectSlug ?? project.next_project_slug ?? project.nextProject?.slug ?? null,
  projectImg: Array.isArray(project.projectImg)
    ? project.projectImg
    : project.image
      ? [project.image]
      : [],
});

const attachNextProject = (projects) => {
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

  return projects.map((project) => ({
    ...project,
    nextProject: project.nextProjectSlug
      ? (() => {
          const nextProject = projectsBySlug.get(project.nextProjectSlug);

          return nextProject
            ? { slug: nextProject.slug, title: nextProject.title }
            : null;
        })()
      : null,
  }));
};

const normalizeProjects = (projects) => attachNextProject(projects.map(normalizeProjectShape));

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }

  return sql;
};

const getFallbackProjects = () => normalizeProjects(fallbackProjects);

export const getProjects = async () => {
  const sql = getSql();

  if (!sql) {
    return getFallbackProjects();
  }

  try {
    const rows = await sql`
      SELECT
        id,
        created_at AS "createdAt",
        title,
        slug,
        subtitle,
        year,
        technologies,
        categories,
        filters,
        image,
        description,
        conclusion,
        video,
        "livePreview",
        "nextProjectSlug",
        COALESCE("projectImg", ARRAY[image]) AS "projectImg"
      FROM public.projects
      ORDER BY created_at ASC, title ASC
    `;

    return normalizeProjects(rows);
  } catch (error) {
    if (error?.code === "42P01") {
      return getFallbackProjects();
    }

    throw error;
  }
};

export const getProjectBySlug = async (slug) => {
  const projects = await getProjects();

  return projects.find((project) => project.slug === slug) ?? null;
};

export const getProjectSlugs = async () => {
  const projects = await getProjects();

  return projects.map((project) => project.slug);
};

export const isUsingNeon = () => Boolean(process.env.DATABASE_URL);
