import { useState } from "react";

const educationData = [
  {
    id: 1,
    title: "Cyber Security",
    academy: "Miva University",
    dec: "Bachelor of Science in Cyber Security...",
    startYear: "2023",
    endYear: "2026",
  },
  {
    id: 2,
    title: "IT Developer Expert",
    academy: "Nintex University",
    dec: "Completed requirements to be recognized as a Certified k2 IT Developer.",
    startYear: "2023",
    endYear: "2023",
  },
  {
    id: 3,
    title: "Maths & Statistics",
    academy: "Polytechnic of Ibadan",
    dec: "National Diploma in Math and Statistics...",
    startYear: "2012",
    endYear: "2014",
  },
];

const experienceData = [
  {
    id: 1,
    title: "AI Automations / Workflow Developer",
    company: "Freelance",
    dec: [
      "Developed and implemented AI-driven automation solutions for various clients, enhancing operational efficiency and reducing manual workload.",
      "Designed and built custom automation workflows using n8n, Make.com, and other platforms, integrating AI capabilities to optimize business processes.",
      "Collaborated with clients to identify automation opportunities, analyze requirements, and deliver tailored solutions that meet specific business needs.",
      "Created user-friendly interfaces and dashboards to visualize automation processes and provide insights into performance metrics."
    ],
    startYear: "2023",
    endYear: false,
  },
  {
    id: 2,
    title: "Automations Developer",
    company: "Advanced Cloud Partners, USA",
    dec: [
      "Streamlined business processes through process mapping and automation, enhancing efficiency and productivity for multiple clients across diverse industries.",
      "Developed and customized business processes using n8n, Make.com, Power Automate, Zenphi, and other platforms, incorporating custom nodes and user-friendly interfaces to enhance workflow adoption and improve user experience.",
      "Redesigned and optimized existing Power Automate flows, integrating them with K2 solutions to consolidate disparate automation processes into cohesive, scalable systems.",
      "Utilized open-source automation tools alongside MS/Google platform capabilities to deliver tailored, high-value automation solutions aligned with client needs.",
      "Documented technical specifications, process requirements, and UI design decisions to ensure maintainability and support future enhancements.",
    ],
    startYear: "2024",
    endYear: false,
  },
  {
    id: 3,
    title: "Solutions Architect / K2 & Frontend Developer",
    company: "SakalGb Solutions, Nigeria",
    dec: [
      "Built User-friendly interfaces for business processes.",
      "Redesigned K2 custom Themes into modern interfaces using CSS and Javascript.",
      "Streamlined business processes through process mapping and automation, improving overall efficiency and productivity.",
      "Collaborated with cross-functional teams to identify areas for improvement and develop solutions.",
      "Built Power Automate Desktop Bots to automate reconciliation of external records with organization's GL account records.",
      "Automated various processes using K2, including LASG E-Planning Permit, Account Opening, Foreign Operations Portal, Project Management, Employee Onboarding and Offboarding.",
      "Maintained detailed documentation of business process requirements, product value optimization, and risk management.",
      "Conducted training sessions to educate interns on business processes and technologies.",
      "Provided technical support to clients and resolved issues promptly.",
    ],
    startYear: "2022",
    endYear: false,
  },
  {
    id: 4,
    title: "Lead Engineer / Frontend Developer",
    company: "Noirak Technologies,  Nigeria",
    dec: [
      "Built responsive and user-friendly websites, ensuring optimal performance and functionality.",
      "Worked closely with designers and project managers to ensure timely delivery of projects.",
      "Conducted quality assurance testing and resolved issues before launch.",
      "Collaborated with back-end developers to integrate front-end features with back-end functionality.",
    ],
    startYear: "2023",
    endYear: "2025",
  },
];

const Resume = () => {
  const [educationToggle, setEducationToggle] = useState(1);
  const [experienceToggle, setExperienceToggle] = useState(1);
  return (
    <section className="lui-section lui-gradient-bottom" id="resume-section">
      {/* Heading */}
      <div className="lui-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h2
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Resume </span>
            </h2>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Story</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* History */}
      <div className="v-line v-line-left">
        <div className="container">
          <div className="row">
            {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Education </span>
              </h5>
              <div className="history-items">
                {educationData.map((education, i) => (
                  <div
                    key={education.id}
                    className={`history-item lui-collapse-item scroll-animate ${
                      educationToggle === education.id ? "opened" : ""
                    }`}
                    data-animate="active"
                  >
                    <h6
                      className={`name lui-collapse-btn ${
                        educationToggle == education.id ? "active" : ""
                      }`}
                      onClick={() =>
                        setEducationToggle(
                          educationToggle == education.id ? null : education.id
                        )
                      }
                    >
                      <span> {education.academy} </span>
                    </h6>
                    <div className="history-content">
                      <div className="subname">
                        <span> {education.title} </span>
                      </div>
                      <div className="date lui-subtitle">
                        <span>
                          {" "}
                          {education.startYear} - {education.endYear}{" "}
                        </span>
                      </div>
                      <div className="text">
                        <div>
                          <p>{education.dec}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="col-xs-12 col-sm-6 col-md-8 col-lg-12">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Experience </span>
              </h5>
              <div className="history-items">
                {experienceData.map((experience) => (
                  <div
                    className={`history-item lui-collapse-item scroll-animate ${
                      experience.id == experienceToggle ? "opened" : ""
                    }`}
                    data-animate="active"
                    key={experience.id}
                  >
                    <h6
                      className={`name lui-collapse-btn ${
                        experienceToggle == experience.id ? " active" : ""
                      }`}
                      onClick={() => setExperienceToggle(experience.id)}
                    >
                      <span> {experience.title} </span>
                    </h6>
                    <div className="history-content">
                      <div className="subname">
                        <span> {experience.company} </span>
                      </div>
                      <div className="date lui-subtitle">
                        <span>
                          {" "}
                          {experience.startYear} -{" "}
                          {experience.endYear ? (
                            experience.endYear
                          ) : (
                            <b>Present</b>
                          )}
                        </span>
                      </div>
                      <div className="text">
                        <ul
                          className="pl-6 list-disc !list-outside"
                          style={{ listStylePosition: "outside" }}
                        >
                          {experience.dec.map((desc, index) => (
                            <li key={index} className="mb-2">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lui-bgtitle">
            <span> History </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resume;
