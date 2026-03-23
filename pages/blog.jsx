import Link from "next/link";
import Layout from "../src/layouts/Layout";
import { blogPosts } from "../src/data/blogPosts";

const Blog = () => {
  return (
    <Layout>
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Blog </span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Practical notes on <b>automation delivery</b> </span>
            </div>
          </div>
        </div>
      </section>

      <div className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-lg-1">
              <div className="articles-container">
                {blogPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="archive-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="image">
                      <Link legacyBehavior href={`/blog/${post.slug}`}>
                        <a>
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="desc">
                      <div className="category lui-subtitle">
                        <span>{post.categoryText}</span>
                      </div>
                      <h5 className="lui-title">
                        <Link legacyBehavior href={`/blog/${post.slug}`}>
                          <a>{post.title}</a>
                        </Link>
                      </h5>
                      <div className="lui-text">
                        <p>{post.excerpt}</p>
                        <div className="readmore">
                          <Link legacyBehavior href={`/blog/${post.slug}`}>
                            <a className="lnk">Read article</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="v-line-left v-line-top">
            <div className="v-line-block">
              <span />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
