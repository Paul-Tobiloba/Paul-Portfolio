import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef, useState } from "react";

const SkillsIsotope = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    isotope.current = new Isotope(".skills-items", {
      itemSelector: ".skills-col",
      percentPosition: true,
      masonry: {
        columnWidth: ".skills-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    return () => isotope.current.destroy();
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  // Skill data by category
  const skillsData = {
    automation: [
      {
        name: "Nintex K2",
        proficiency: 99,
        desc: "Expert in K2 workflow design and implementation, with experience creating complex business process applications. Skilled in SmartObject development and integration with external systems.",
      },
      {
        name: "Nintex Workflow Cloud",
        proficiency: 90,
        desc: "Skilled in designing cloud-based workflows with Nintex, creating form-based solutions, and integrating with various enterprise systems. Experienced with document generation and automation.",
      },
      {
        name: "Power Apps",
        proficiency: 75,
        desc: "Proficient in building canvas and model-driven apps with advanced formulas and custom connectors. Experienced in designing intuitive interfaces and optimizing app performance.",
      },
      {
        name: "Power Automate",
        proficiency: 99,
        desc: "Advanced skills in creating complex flows with conditions, approvals, and custom connectors. Experienced with error handling, expressions, and integration with various Microsoft services.",
      },
      {
        name: "SharePoint",
        proficiency: 95,
        desc: "Strong knowledge of SharePoint Online and on-premises, including custom list configurations, workflows, and Power Platform integration. Experienced with PnP patterns and practices.",
      },
      {
        name: "n8n",
        proficiency: 99,
        desc: "Skilled in building n8n workflows with custom nodes and expressions. Experienced with self-hosted deployments and creating complex integrations between disparate systems.",
      },
      {
        name: "Zenphi",
        proficiency: 99,
        desc: "Competent with Zenphi for Google Workspace automation, building efficient workflows for document processing and approvals. Experienced with form integrations and conditional logic.",
      },
      {
        name: "Make.com",
        proficiency: 90,
        desc: "Proficient in creating advanced scenarios with iterators, aggregators, and custom modules. Experienced in error handling, webhook implementations, and complex data transformations.",
      },
      {
        name: "Gumloop",
        proficiency: 75,
        desc: "Skilled in crafting Gumloop workflows to automate business processes and integrate diverse platforms, with hands-on experience developing custom nodes and actions.",
      },
      {
        name: "Activepieces",
        proficiency: 85,
        desc: "Competent with Activepieces automation platform for building integrated workflows with custom pieces. Experienced in creating reusable components and implementing data transformation flows.",
      },
      {
        name: "SmartSuite",
        proficiency: 85,
        desc: "Proficient in SmartSuite app creation, automation rules, and formula fields. Capable of designing solution templates and implementing cross-solution workflows for business processes.",
      },
    ],
    frontend: [
      {
        name: "HTML",
        proficiency: 95,
        desc: "Expert in semantic HTML5 markup with focus on accessibility standards and SEO-friendly structure. Experienced with custom data attributes and modern structural elements.",
      },
      {
        name: "CSS",
        proficiency: 95,
        desc: "Strong command of CSS3 with expertise in responsive design, animations, and advanced layout techniques including Grid and Flexbox. Well-versed in cross-browser compatibility solutions.",
      },
      {
        name: "JavaScript",
        proficiency: 90,
        desc: "Advanced JavaScript skills including ES6+ features, asynchronous programming with Promises/async-await, and DOM manipulation. Comfortable with functional programming concepts.",
      },
      {
        name: "React",
        proficiency: 92,
        desc: "Proficient in React component architecture, hooks, context API, and performance optimization. Experienced with custom hooks and integration with various state management solutions.",
      },
      {
        name: "Next.js",
        proficiency: 95,
        desc: "Skilled in server-side rendering, static site generation, and API routes in Next.js. Experienced with image optimization, incremental static regeneration, and middleware implementations.",
      },
      {
        name: "Redux",
        proficiency: 80,
        desc: "Competent with Redux ecosystem including thunks, selectors, and the toolkit. Experienced in state normalization and optimization patterns for complex application state.",
      },
      {
        name: "Tailwind",
        proficiency: 90,
        desc: "Expert in utility-first CSS with Tailwind, including custom configuration, responsive designs, and component extraction. Skilled at creating consistent design systems with minimal CSS.",
      },
      {
        name: "SCSS",
        proficiency: 85,
        desc: "Advanced knowledge of SCSS with expertise in mixins, functions, and modular architecture. Proficient in creating maintainable stylesheets with variables and nested rules.",
      },
      {
        name: "jQuery",
        proficiency: 78,
        desc: "Solid foundation in jQuery for DOM manipulation, animations, and AJAX operations. Experienced in legacy codebase maintenance and optimization of jQuery implementations.",
      },
    ],
    others: [
      {
        name: "SQL",
        proficiency: 80,
        desc: "Solid understanding of relational databases with experience writing complex queries, stored procedures, and optimizing database performance across multiple platforms.",
      },
      {
        name: "PostgreSQL",
        proficiency: 80,
        desc: "Proficient in PostgreSQL database management, including schema design, query optimization, and data migration. Experienced with advanced features like JSONB and full-text search.",
      },
      {
        name: "WordPress (Elementor)",
        proficiency: 85,
        desc: "Expert in WordPress theme customization and plugin development with advanced Elementor skills. Experienced in creating custom widgets, dynamic content, and optimizing site performance.",
      },
      {
        name: "Python",
        proficiency: 70,
        desc: "Strong Python skills for automation, data processing, and Scripting.",
      },
    ],
  };

  // Group skills into columns for each category
  const renderSkillColumns = (skills, category) => {
    const columns = [[], [], []];

    skills.forEach((skill, index) => {
      columns[index % 3].push(skill);
    });

    return columns.map((columnSkills, colIndex) => (
      <div
        key={`${category}-col-${colIndex}`}
        className={`skills-col col-xs-12 col-sm-6 col-md-4 col-lg-4 sorting-${category}`}
      >
        <div className="skills-items">
          {columnSkills.map((skill, index) => (
            <div
              key={`${category}-skill-${index}`}
              className="skills-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <h6 className="name">
                <span>{skill.name}</span>
              </h6>
              <div className="text">
                <div>
                  <p>{skill.desc}.</p>
                </div>
              </div>
              <div className="dots">
                <div className="dot" style={{ width: `${skill.proficiency}%` }}>
                  <span />
                </div>
              </div>
              <div className="value">
                <span className="num">
                  {skill.proficiency} <span>%</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="v-line v-line-left">
      <div className="container">
        <div className="skills-box">
          <div
            className="filter-links scrolla-element-anim-1 scroll-animate"
            data-animate="active"
          >
            <a
              className={`c-pointer lui-subtitle ${activeBtn("*")}`}
              onClick={handleFilterKeyChange("*")}
              data-href=".skills-col"
            >
              All Skills
            </a>
            <a
              className={`c-pointer lui-subtitle ${activeBtn(
                "sorting-automation"
              )}`}
              onClick={handleFilterKeyChange("sorting-automation")}
              data-href=".sorting-automation"
            >
              RPA / Scripting and Automation
            </a>
            <a
              className={`c-pointer lui-subtitle ${activeBtn(
                "sorting-frontend"
              )}`}
              onClick={handleFilterKeyChange("sorting-frontend")}
              data-href=".sorting-frontend"
            >
              Frontend Development
            </a>
            <a
              className={`c-pointer lui-subtitle ${activeBtn(
                "sorting-others"
              )}`}
              onClick={handleFilterKeyChange("sorting-others")}
              data-href=".sorting-others"
            >
              Others
            </a>
          </div>

          <div className="skills-items row">
            {renderSkillColumns(skillsData.automation, "automation")}
            {renderSkillColumns(skillsData.frontend, "frontend")}
            {renderSkillColumns(skillsData.others, "others")}
          </div>
        </div>

        <div className="lui-bgtitle">
          <span>Skills</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsIsotope;
