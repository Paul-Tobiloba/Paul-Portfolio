import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef } from "react";

const WorkSingleISotope = ({ images = [] }) => {
  const isotope = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current || !images.length) {
      isotope.current?.destroy();
      isotope.current = null;
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      isotope.current?.destroy();
      isotope.current = new Isotope(galleryRef.current, {
        itemSelector: ".col-xs-12",
        percentPosition: true,
        masonry: {
          columnWidth: ".col-xs-12",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      isotope.current?.destroy();
      isotope.current = null;
    };
  }, [images]);

  return (
    <Fragment>
      <div ref={galleryRef} className="m-gallery">
        <div className="row">
          {images.map((imgUrl, index) => (
            <div key={index} className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="works-item">
                <div
                  className="image scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="img">
                    <a href={imgUrl} className="has-popup-image">
                      <img
                        decoding="async"
                        src={imgUrl}
                        alt={`Item ${index + 1}`}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
export default WorkSingleISotope;
