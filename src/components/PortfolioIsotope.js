import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { projectItems, filters } from "../data/projectData";

const PortfolioIsotope = ({ noViewMore }) => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
    });

    return () => isotope.current.destroy();
  }, []);

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
          {projectItems.map((item, index) => (
            <div
              key={index}
              className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${item.filters.join(
                " "
              )}`}
            >
              <div
                className="works-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <div className="img">
                    <Link legacyBehavior href={item.link}>
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
                  <span className="category">{item.category}</span>
                  <h5 className="name">
                    <Link legacyBehavior href={item.link}>
                      <a>{item.title}</a>
                    </Link>
                  </h5>
                  <div className="text">
                    <p>{item.description}</p>
                  </div>
                  <Link legacyBehavior href={item.link}>
                    <a className="lnk">See project</a>
                  </Link>
                </div>
                <div
                  className="bg-img"
                  style={{ backgroundImage: "url(assets/images/pat-2.png)" }}
                />
              </div>
            </div>
          ))}
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
