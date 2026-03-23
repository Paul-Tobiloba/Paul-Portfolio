import Link from "next/link";
import Layout from "../../src/layouts/Layout";
import { blogPosts, getBlogPostBySlug } from "../../src/data/blogPosts";

const PythonPadArticle = ({ post }) => (
  <>
    <p>
      Power Automate Desktop is already good at interacting with Windows
      applications, spreadsheets, web pages, folders, and legacy systems.
      Where it starts to break down is in the middle layer: data cleanup,
      conditional logic, text parsing, reusable calculations, and complex
      transformation rules. That is where Python becomes a practical addition.
    </p>

    <p>
      The most effective way to structure this pairing is simple. Let Power
      Automate Desktop handle orchestration and system interaction. Let Python
      handle the parts that look more like programming than automation
      configuration. When those responsibilities stay clear, the workflow
      becomes easier to scale and easier to maintain.
    </p>

    <h3>Where Python helps most</h3>
    <p>
      Python is useful when the automation needs to reshape data before PAD
      uses it, validate records before submission, read or write files in a
      more controlled way, or implement business rules that would otherwise
      turn into a long chain of nested conditions. It is also a strong option
      for calling APIs, handling JSON, generating summaries, or building
      reusable helper scripts shared across multiple bots.
    </p>

    <p>
      PAD also struggles with large datasets, complex branching logic, and
      text-heavy transformations because actions are executed step-by-step
      rather than in-memory. That is often the real reason a flow becomes hard
      to maintain long before it becomes impossible to run.
    </p>

    <blockquote>
      <p>
        Keep UI actions in PAD. Keep computation and transformation in Python.
        That separation usually produces cleaner bots.
      </p>
    </blockquote>

    <h3>A practical hybrid automation pattern</h3>
    <p>Pattern: Orchestrator + Processor.</p>

    <ul>
      <li>PAD handles input collection and system interaction.</li>
      <li>Python handles processing, transformation, and validation.</li>
      <li>PAD handles output updates, logging, and notifications.</li>
      <li>Error handling stays split between script errors and process errors.</li>
    </ul>

    <p>
      A common implementation is to let PAD collect input from Excel, Outlook,
      SAP, or a web portal, then pass the raw values into a Python script. The
      Python script normalizes formats, removes duplicates, validates records,
      performs calculations, and returns a clean output file or JSON response.
      PAD then uses that cleaned result to continue the business process with
      fewer failures and fewer edge-case branches.
    </p>

    <p>In Power Automate Desktop:</p>
    <ul>
      <li>Use the `Run Python script` action.</li>
      <li>Pass input values such as a file path or JSON payload.</li>
      <li>Capture output via standard output using `print()`.</li>
    </ul>

    <p>In Python:</p>
    <ul>
      <li>Read the input payload from arguments or standard input.</li>
      <li>Process and validate the data.</li>
      <li>Return a structured result that PAD can consume safely.</li>
    </ul>

    <pre>
      <code>{`import json
import sys

data = json.loads(sys.argv[1])

cleaned = [row for row in data if row.get("amount", 0) > 0]

print(json.dumps(cleaned))`}</code>
    </pre>

    <h3>Example use cases</h3>
    <p>
      In finance operations, Python can reconcile transaction records before
      PAD posts them into an ERP. In HR workflows, it can validate onboarding
      files and reformat employee data before entry. In reporting automations,
      it can merge exports from multiple systems and produce one clean output
      that PAD distributes automatically.
    </p>

    <p>
      This is especially useful when the bot is touching business-critical
      data. The more the transformation logic is written clearly in a script,
      the easier it becomes to test outside the desktop automation runtime.
    </p>

    <h3>Performance impact</h3>
    <p>
      This architecture also matters for performance. A Python script
      processing 100,000 rows can complete in seconds, while the same logic
      expressed as long chains of PAD actions may take minutes, become
      difficult to debug, or fail under memory pressure. That difference is
      one of the clearest reasons to keep logic-heavy work outside the
      desktop flow itself.
    </p>

    <h3>Implementation advice</h3>
    <p>
      Keep the Python scripts small, named by responsibility, and stored in a
      predictable location. Pass explicit inputs from PAD instead of hiding
      configuration inside the script. Write outputs in a format PAD can read
      reliably, such as CSV, JSON, or a plain success/error response. If the
      workflow will run unattended, log enough detail for support without
      exposing sensitive information.
    </p>

    <ul>
      <li>Do not bury business rules in a single oversized script.</li>
      <li>Return structured outputs that PAD can consume safely.</li>
      <li>Validate dependencies and file paths before production rollout.</li>
      <li>Test Python logic independently before wiring it into the bot.</li>
    </ul>

    <h3>When not to use Python</h3>
    <p>
      If PAD can solve the requirement clearly with native actions, adding
      Python may only increase support overhead. The point is not to force
      scripting into every process. The point is to use it when it reduces
      complexity, improves reliability, or makes the automation easier for a
      team to reason about over time.
    </p>

    <ul>
      <li>Avoid Python when the logic is simple and PAD can express it clearly.</li>
      <li>Avoid Python when the process is heavily UI-driven with minimal transformation.</li>
      <li>Avoid Python when the support team has no scripting capability to maintain it.</li>
    </ul>

    <p>
      Used well, Python extends Power Automate Desktop from a UI automation
      tool into a more disciplined automation platform. It gives you better
      control over logic-heavy parts of the process while keeping the bot
      readable for business and technical stakeholders.
    </p>

    <span className="tags-links">
      <span>Tags:</span>{" "}
      {post.tags.map((tag) => (
        <a key={tag} href="#">
          {tag}
        </a>
      ))}
    </span>
  </>
);

const ReconciliationArticle = ({ post }) => (
  <>
    <p>
      Reconciliation sounds straightforward until you actually automate it.
    </p>

    <p>
      On paper, it is just matching records between two systems and identifying
      differences. In practice, it involves inconsistent data formats, partial
      records, timing gaps, missing reports, and edge cases that do not show up
      until the automation is already running.
    </p>

    <p>
      Working on a bank reconciliation process forced me to move from thinking
      about automation as clicking through steps to thinking about it as a
      system that needs to be reliable, explainable, and resilient.
    </p>

    <h3>Reconciliation is not just matching, it is interpretation</h3>
    <p>
      One of the first things I learned is that reconciliation is not simply
      comparing values.
    </p>

    <p>The data rarely lines up cleanly:</p>

    <ul>
      <li>Dates may include time in one system and not in another.</li>
      <li>Descriptions can contain extra characters, inconsistent spacing, or system noise.</li>
      <li>Amounts may appear in different formats or positions.</li>
    </ul>

    <p>
      Before any comparison can happen, the data has to be normalized. That
      means standardizing date formats, cleaning descriptions, extracting
      consistent identifiers such as reference numbers or session IDs, and
      ensuring amounts are interpreted correctly. Most of the effort goes into
      making the data comparable, not comparing it.
    </p>

    <h3>Structure matters more than logic</h3>
    <p>
      At the beginning, it is tempting to jump straight into conditions. If
      this matches that, then do this. That approach breaks quickly.
    </p>

    <p>
      What worked better was structuring the process into clear stages:
    </p>

    <ol>
      <li>Ingestion: collect all required files and inputs.</li>
      <li>Normalization: clean and standardize the data.</li>
      <li>Mapping: align records using a consistent key.</li>
      <li>Validation: check completeness and flag missing data.</li>
      <li>Output: generate reconciled results and exception reports.</li>
    </ol>

    <p>
      Once the structure was clear, the logic became simpler and easier to
      maintain.
    </p>

    <h3>Keys are everything</h3>
    <p>
      In reconciliation, everything depends on having a reliable key.
    </p>

    <p>
      In my case, session-based reconciliation required mapping transactions
      using a derived key like time-based session identifiers such as `HHMMSS`
      and reference numbers embedded in text fields.
    </p>

    <p>
      The challenge is that these keys are often not explicitly labeled, buried
      inside longer strings, or slightly inconsistent across systems. Extracting
      and standardizing these keys was critical. Once the key was stable, the
      rest of the reconciliation became predictable. Without a reliable key, the
      process becomes guesswork.
    </p>

    <h3>Data volume changes everything</h3>
    <p>
      Working with large datasets changes how you approach automation.
      Techniques that work with small data, such as writing to Excel cell by
      cell or looping through rows with UI actions, do not scale.
    </p>

    <p>
      I ran into performance and memory issues quickly. The practical response
      was to minimize interactions with Excel, use bulk operations wherever
      possible, and move heavy data processing outside UI actions. This is where
      combining tools becomes important. RPA handles orchestration well, but
      large-scale data operations require a more efficient approach.
    </p>

    <h3>Not all errors are failures</h3>
    <p>
      In reconciliation, errors are often part of the process. Missing reports,
      unmatched transactions, and timing differences between systems are not
      always signs that the automation is broken.
    </p>

    <p>
      The automation should detect them, log them clearly, and continue
      processing where possible. Separating process errors, such as file not
      found, from business exceptions, such as unmatched transactions, made the
      system more stable and easier to support.
    </p>

    <h3>Logging is not optional</h3>
    <p>
      When dealing with financial data, you need to be able to answer what was
      processed, what was missing, what did not match, and why something
      failed.
    </p>

    <p>
      Good logging made debugging and validation much easier. Instead of digging
      through the workflow, I could look at logs and immediately understand what
      happened during a run.
    </p>

    <h3>Keep the automation explainable</h3>
    <p>
      Even if the automation works, it needs to be understandable by others,
      easy to debug, and easy to modify when requirements change. That meant
      avoiding overly complex nested conditions, keeping transformations clear
      and isolated, and naming steps and variables meaningfully.
    </p>

    <p>
      In a banking environment, transparency matters as much as correctness.
    </p>

    <h3>Tools are not the solution, design is</h3>
    <p>
      It is easy to focus on the tool, whether that is Power Automate Desktop,
      Python, or Excel, but the real value comes from how the process is
      designed.
    </p>

    <p>
      A well-designed reconciliation flow handles imperfect data, scales with
      volume, recovers gracefully from issues, and produces clear reliable
      outputs. The tools only implement that design.
    </p>

    <blockquote>
      <p>
        The hard part of automation is not the automation itself. It is
        understanding the data and designing the process around it.
      </p>
    </blockquote>

    <p>
      Building a reconciliation automation changed how I think about RPA. It is
      not just about automating tasks. It is about building systems that can
      handle real-world data, edge cases, and operational constraints.
    </p>

    <span className="tags-links">
      <span>Tags:</span>{" "}
      {post.tags.map((tag) => (
        <a key={tag} href="#">
          {tag}
        </a>
      ))}
    </span>
  </>
);

const WordPressArticle = ({ post }) => (
  <>
    <p>
      WordPress is often described as easy, but that depends on what you are
      trying to build.
    </p>

    <p>
      Setting up a basic site is straightforward. Building something that is
      fast, maintainable, scalable, and actually useful in a real business
      context is a different conversation entirely.
    </p>

    <p>
      Working with WordPress over time shifts your focus away from just
      designing pages to thinking about structure, performance, and how the
      site will be managed after it goes live.
    </p>

    <h3>WordPress is not just a page builder</h3>
    <p>
      A lot of people approach WordPress through tools like Elementor, and that
      is fine. It speeds up development and makes layout easier.
    </p>

    <p>
      But underneath that, WordPress is a content management system, a
      database-driven application, and a platform with its own architecture
      through themes, plugins, hooks, and templates. If you only think in terms
      of drag-and-drop, you will hit limitations quickly.
    </p>

    <p>
      The real value comes from understanding how content is structured, how
      templates render data, and how plugins extend functionality.
    </p>

    <h3>Structure before design</h3>
    <p>
      One mistake I made early on was focusing too much on how the site looks
      before thinking about how it is organized.
    </p>

    <p>A better approach is to define the structure first:</p>

    <ul>
      <li>Define pages and hierarchy before styling.</li>
      <li>Decide what content belongs where.</li>
      <li>Plan how users will navigate the site.</li>
    </ul>

    <p>
      Once that is clear, the design becomes easier and more consistent.
      Landing pages should guide action, product pages should focus on clarity
      and trust, and content pages should be structured for readability. Design
      should support structure, not the other way around.
    </p>

    <h3>Performance is part of development, not an afterthought</h3>
    <p>
      A WordPress site can become slow very quickly if you are not intentional.
      Common causes include too many plugins, unoptimized images, heavy page
      builders with unnecessary elements, and weak hosting.
    </p>

    <p>What helped improve performance in practice:</p>

    <ul>
      <li>Compressing and properly sizing images.</li>
      <li>Limiting plugins to only what is necessary.</li>
      <li>Using lightweight themes where possible.</li>
      <li>Enabling caching and monitoring the impact of changes.</li>
    </ul>

    <p>
      Speed is not just a technical metric. It affects user experience, trust,
      and conversion performance.
    </p>

    <h3>Plugins are powerful, but easy to misuse</h3>
    <p>
      Plugins make it easy to add forms, payments, SEO tooling, security, and
      business features. The problem is not plugins themselves. The problem is
      adding them without thinking through the cost.
    </p>

    <ul>
      <li>More plugins can increase conflicts.</li>
      <li>More plugins can slow down the site.</li>
      <li>More plugins can make maintenance harder over time.</li>
    </ul>

    <p>
      The goal is not to avoid plugins, but to use them intentionally. Before
      installing one, it helps to ask whether the feature is truly needed,
      whether it can be handled another way, and whether the plugin is reliable
      and actively maintained.
    </p>

    <h3>Customization is where WordPress becomes powerful</h3>
    <p>
      At some point, you will need something that plugins or page builders
      cannot fully handle. That is where custom CSS, custom JavaScript, and
      custom PHP come in.
    </p>

    <p>
      Even small customizations can make a big difference, whether that means
      refining layout behavior, adding interactions, or integrating external
      services. You do not need to build everything from scratch, but knowing
      how to extend WordPress gives you much more control.
    </p>

    <h3>Think about the person managing the site</h3>
    <p>
      One important shift is designing for the person who will manage the site,
      not just the visitor.
    </p>

    <ul>
      <li>Can they update content easily?</li>
      <li>Is the backend clean and understandable?</li>
      <li>Are there too many moving parts for routine updates?</li>
    </ul>

    <p>
      A site that looks good but is difficult to maintain becomes a problem over
      time.
    </p>

    <h3>Deployment is not the end</h3>
    <p>
      Publishing the site is only one step. After deployment, you still need
      updates for WordPress core, plugins, and themes, along with backups,
      security checks, and performance monitoring.
    </p>

    <p>
      Ignoring this part is one of the biggest long-term risks with WordPress
      sites.
    </p>

    <h3>When WordPress is the right choice</h3>
    <p>WordPress works well for:</p>

    <ul>
      <li>Business websites</li>
      <li>Landing pages</li>
      <li>Blogs and content-heavy sites</li>
      <li>Small to medium e-commerce with WooCommerce</li>
    </ul>

    <p>It may not be ideal when:</p>

    <ul>
      <li>You need a highly complex custom application.</li>
      <li>You have strict performance constraints.</li>
      <li>You want full control over the entire tech stack.</li>
    </ul>

    <blockquote>
      <p>
        The difference between a basic WordPress site and a solid one is not
        the tool. It is how you think about structure, performance, and
        maintainability.
      </p>
    </blockquote>

    <p>
      WordPress is powerful because it sits between no-code and full
      development. You can build quickly, but you can also go deeper when
      needed. That flexibility is what makes it so useful when approached with
      discipline.
    </p>

    <span className="tags-links">
      <span>Tags:</span>{" "}
      {post.tags.map((tag) => (
        <a key={tag} href="#">
          {tag}
        </a>
      ))}
    </span>
  </>
);

const renderPostBody = (post) => {
  switch (post.slug) {
    case "wordpress-web-development-what-actually-matters":
      return <WordPressArticle post={post} />;
    case "using-python-in-power-automate-desktop-rpa":
      return <PythonPadArticle post={post} />;
    case "building-rpa-reconciliation-process-bank":
      return <ReconciliationArticle post={post} />;
    default:
      return null;
  }
};

const BlogPostPage = ({ post }) => {
  return (
    <Layout>
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="m-titles align-center">
            <div
              className="m-category scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <Link legacyBehavior href="/blog">
                <a>{post.categories[0]}</a>
              </Link>
              ,{" "}
              <Link legacyBehavior href="/blog">
                <a>{post.categories[1] ?? post.categories[0]}</a>
              </Link>{" "}
              / {post.date} / by {post.author}
            </div>
            <h1
              className="m-title scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="section section-inner m-image-large">
        <div className="container">
          <div className="v-line-right v-line-top">
            <div className="v-line-block">
              <span />
            </div>
          </div>
        </div>
        <div className="image">
          <div
            className="img scrolla-element-anim-1 scroll-animate"
            data-animate="active"
            style={{ backgroundImage: `url(${post.image})` }}
          />
        </div>
      </div>

      <section className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
              <div className="description">
                <div
                  className="post-content scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  {renderPostBody(post)}
                </div>
              </div>
            </div>
          </div>
          <div className="v-line-left v-line-top">
            <div className="v-line-block">
              <span />
            </div>
          </div>
        </div>
      </section>

      <div className="section section-inner m-page-navigation">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
              <div className="h-titles h-navs">
                <Link legacyBehavior href="/blog">
                  <a>
                    <span
                      className="nav-arrow splitting-text-anim-1 scroll-animate"
                      data-splitting="chars"
                      data-animate="active"
                    >
                      Back to Blog
                    </span>
                    <span
                      className="h-title splitting-text-anim-2 scroll-animate"
                      data-splitting="chars"
                      data-animate="active"
                    >
                      Practical automation notes
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => ({
  paths: blogPosts.map((post) => ({
    params: { slug: post.slug },
  })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default BlogPostPage;
