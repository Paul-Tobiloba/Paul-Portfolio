import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../src/layouts/Layout";
import PreLoader from "../../../src/layouts/PreLoader";
import { projects } from "../../../src/data/projects";

const WorkSingleISotope = dynamic(
  () => import("../../../src/components/WorkSingleISotope"),
  { ssr: false }
);

const WorkSingle = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [videoToggle, setVideoToggle] = useState(false);

  const project = projects.find((p) => p.slug === slug);

  if (!project) return <PreLoader />;

  return (
    <Layout pageClassName="portfolio-template">
      {/* Project Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="m-titles align-left">
            <h1 className="m-title">
              <span>{project.title}</span>
            </h1>
            <div className="m-subtitle">
              <span>{project.subtitle}</span>
            </div>
          </div>
        </div>
        <div className="v-line v-line-right v-line-top">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="m-details">
                  <div className="details-label">
                    <span>Year:</span>
                    <strong>{project.year}</strong>
                  </div>
                  <div className="details-label">
                    <span>Technology:</span>
                    <strong>{project.technologies}</strong>
                  </div>
                  <div className="details-label">
                    <span>Categories:</span>
                    <strong>{project.categories}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-4 align-right">
                <a target="_blank" href={project.livePreview} className="btn">
                  <span>Live Preview</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <div className="section section-inner">
        <div className="m-image-large">
          <div
            className="img js-parallax"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        </div>
      </div>

      {/* Description */}
      <section className="section section-inner">
        <div className="container">
          <h4>Description</h4>
          <div className="row">
            {project.description.map((desc, i) => (
              <div key={i} className="col-md-6">
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <div className="section section-inner">
        <div className="container">
          <WorkSingleISotope />
        </div>
      </div>

      {/* Conclusion */}
      <section className="section section-inner">
        <div className="container">
          <h4>Conclusion</h4>
          <div className="row">
            {project.conclusion.map((con, i) => (
              <div key={i} className="col-md-6">
                <p>{con}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <div className="section section-inner m-video-large">
        <div className={`video ${videoToggle ? "active" : ""}`}>
          <div
            className="img js-parallax"
            style={{ backgroundImage: "url(assets/images/blog9.jpg)" }}
          />
          <iframe
            className="js-video-iframe"
            src={project.video}
            title={project.title}
          />
          <div className="play" onClick={() => setVideoToggle(true)} />
        </div>
      </div>

      {/* Navigation */}
      {project.nextProject && (
        <div className="section section-inner m-page-navigation">
          <div className="container">
            <div className="h-titles h-navs">
              <Link href={`/works/${project.nextProject.slug}`}>
                
                  <span className="nav-arrow">
                    <span>Next Project</span>
                  </span>
                  <span className="h-title">
                    <span>{project.nextProject.title}</span>
                  </span>
     
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WorkSingle;
