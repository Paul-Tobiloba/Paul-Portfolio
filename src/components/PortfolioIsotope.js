import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { filters } from "../data/projectData";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";

const PortfolioIsotope = ({ noViewMore }) => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch project data from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
        console.log("Fetched projects:", data);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Initialize Isotope
  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
    });

    return () => isotope.current?.destroy();
  }, [projects]);

  // Update filter
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: "*" })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);
  const activeBtn = (key) => (key === filterKey ? "active" : "");

  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          {filters.map(({ label, key }) => (
            <a
              key={key}
              className={`c-pointer lui-subtitle ${activeBtn(key)}`}
              onClick={handleFilterKeyChange(key)}
              data-href={`.${key}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="works-items works-masonry-items row">
          {loading ? (
            <p className="text-center w-full">Loading projects...</p>
          ) : (
            projects.map((item, index) => (
              <div
                key={index}
                className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${item.filters?.join(
                  " "
                )}`}
              >
                <div
                  className="works-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <div className="img">
                      <Link legacyBehavior href={`/works/${item.slug}`}>
                        <a>
                          <img
                            decoding="async"
                            src={item.image}
                            alt={item.title}
                          />
                          <span className="overlay" />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="desc">
                    <span className="category">{item.categories}</span>
                    <h5 className="name">
                      <Link legacyBehavior href={`/works/${item.slug}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h5>
                    <div className="text">
                      <p>{item.description?.[0]}</p>
                    </div>
                    <Link legacyBehavior href={`/works/${item.slug}`}>
                      <a className="lnk">See project</a>
                    </Link>
                  </div>
                  <div
                    className="bg-img"
                    style={{ backgroundImage: "url(/assets/images/pat-2.png)" }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View More</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PortfolioIsotope;
