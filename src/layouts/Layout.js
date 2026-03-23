import { Fragment, useEffect } from "react";
import {
  activeAnimation,
  destroyJarallaxAnimation,
  initCursor,
  jarallaxAnimation,
  stickyNav,
} from "../utils";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, pageClassName }) => {
  useEffect(() => {
    activeAnimation();
    initCursor();
    window.addEventListener("scroll", activeAnimation);
    window.addEventListener("scroll", stickyNav);

    return () => {
      window.removeEventListener("scroll", activeAnimation);
      window.removeEventListener("scroll", stickyNav);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Splitting = require("splitting");
    }
    Splitting();
    jarallaxAnimation();
    document.querySelector("body").className = pageClassName
      ? pageClassName
      : "";

    return () => {
      destroyJarallaxAnimation();
    };
  });

  return (
    <Fragment>
      <div className="container-page">
        <Header />
        {/* Wrapper */}
        <div className="wrapper">{children}</div>
        {/* Footer */}
        <Footer />
      </div>
      {/* cursor */}
      <div className="cursor" />
    </Fragment>
  );
};
export default Layout;
