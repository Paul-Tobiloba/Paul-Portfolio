import dynamic from "next/dynamic";
import Layout from "../src/layouts/Layout";
import { getProjects } from "../src/lib/projects";

const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const Works = ({ projects }) => {
  return (
    <Layout>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          {/* Heading */}
          <div className="m-titles align-center">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Portfolio </span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Cases</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - works */}
      <section className="lui-section">
        {/* works */}
        <div className="v-line v-line-right v-line-top">
          <div className="container">
            <PortfolioIsotope noViewMore projects={projects} />
            <div className="lui-bgtitle">
              <span> Portfolio </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => ({
  props: {
    projects: await getProjects(),
  },
  revalidate: 60,
});

export default Works;
