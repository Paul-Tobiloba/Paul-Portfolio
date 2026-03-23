import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { TypeAnimation } from "react-type-animation";
import Resume from "../src/components/Resume";
import Layout from "../src/layouts/Layout";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import {
  servicesSliderProps,
  testimonialsSliderProps,
} from "../src/sliderProps";
import { blogPosts } from "../src/data/blogPosts";
import { getProjects } from "../src/lib/projects";

const testimonials = [
  {
    name: "Abhi Kuril",
    role: "CEO, Advanced Cloud Partners",
    text: "Working with Paul has been a game-changer for our team. His deep knowledge of AI and workflow automation streamlined our operations and added real value. He brings both skill and strategy to the table.",
    image: "assets/images/testi4-2.jpg"
  },
  {
    name: "Charles Okafor",
    role: "CEO, Noirak Technologies",
    text: "Paul's meticulous nature and drive for excellence truly stand out. He has a sharp eye for both design and functionality, always pushing the boundaries to deliver more than expected.",
    image: "assets/images/testi4-3.jpg"
  },
  {
    name: "Oluwafemi Bombata",
    role: "Lead Solutions Architect, SakalGb",
    text: "I’ve had the pleasure of watching him consistently deliver exceptional results across a wide range of client projects. His ability to understand complex requirements, automate workflows, and collaborate seamlessly with cross-functional teams makes him an invaluable asset. Paul brings a rare combination of technical depth, creativity, and professionalism to every engagement.",
    image: "assets/images/testi4-4.jpg"
  },
  {
    name: "Ayomide Adefe",
    role: "Business Analyst, IPNX Nigeria",
    text: "Paul has an impressive grasp of RPA and process automation. His ability to dissect intricate workflows and convert them into elegant, functional systems is second to none.",
    image: "assets/images/testi4-7.jpg"
  },
  {
    name: "Akin Oluka",
    role: "Automation Engineer, Parallex Bank",
    text: "I’ve had the pleasure of collaborating with Paul on several client projects. His ability to blend technical knowledge with teamwork makes him not only effective but also inspiring to work alongside.",
    image: "assets/images/testi4-5.jpg"
  },
  {
    name: "Ebenezer Adeleye",
    role: "Solutions Architect",
    text: "Collaborating with Paul across diverse client engagements has shown me just how impactful his workflow automation skills are. He approaches challenges with clarity and consistently crafts solutions that are both robust and easy to maintain. A true team player with a sharp problem-solving mindset.",
    image: "assets/images/testi4-1.jpg"
  },
  {
    name: "Tochukwu Jonah",
    role: "Workflow Developer, Wema Bank",
    text: "Paul has a rare combination of frontend finesse and automation expertise. His contributions elevated our systems and brought clarity and efficiency to our workflows.",
    image: "assets/images/testi4-6.jpg"
  }
];


const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const SkillsIsotope = dynamic(() => import("../src/components/skills"), {
  ssr: false,
});
const Index = ({ projects }) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = ({ target: { name, value } }) => {
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      subject: contactForm.subject.trim(),
      message: contactForm.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setContactStatus({
        type: "error",
        message: "Please complete all required fields before sending your message.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setContactStatus({ type: "idle", message: "" });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message right now.");
      }

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setContactStatus({
        type: "success",
        message: "Thanks, your message was sent successfully.",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error.message || "Unable to send message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout pageClassName={"home"}>
      {/* Section - Hero Started */}
      <section
        className="lui-section lui-section-hero lui-gradient-top"
        id="started-section"
      >
        <div className="container">
          {/* Hero Started */}
          <div className="lui-started v-line v-line-left">
            <div className="section hero-started">
              <div
                className="content scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="titles">
                  <div className="lui-subtitle">
                    <span>
                      {" "}
                      Hello, <b>my name is</b>
                    </span>
                  </div>
                  <h1
                    className="title splitting-text-anim-1 scroll-animate"
                    data-splitting="chars"
                    data-animate="active"
                  >
                    <span>
                      <b>Paul</b> Tobiloba{" "}
                    </span>
                  </h1>
                  <div className="label lui-subtitle">
                    {" "}
                    I am a{" "}
                    <strong>
                      <TypeAnimation
                        sequence={[
                          "Solutions Architect",
                          2000, // Hold for 2 seconds
                          "AI Automations Specialist",
                          2000, // Hold for 2 seconds
                          "Web Developer",
                          2000, // Hold for 2 seconds
                          "Power Developer",
                          2000, // Hold for 2 seconds
                        ]}
                        wrapper="span"
                        speed={60} // Typing speed (60ms per character)
                        deletionSpeed={40} // Speed of deletion effect
                        style={{ fontSize: "inherit", display: "inline-block" }}
                        repeat={Infinity}
                      />
                    </strong>
                  </div>
                </div>
                <div className="description">
                  <div>
                    <p>
                      I’m from Lagos, Nigeria. I specialize in web development
                      and streamlining business processes through automation and
                      process mapping. With a focus on efficiency and
                      documentation, I help organizations simplify workflows and
                      boost productivity.
                    </p>
                  </div>
                  <div className="social-links">
                    <a target="_blank" rel="nofollow" href="https://github.com/Paul-Tobiloba">
                      <FaGithub />
                    </a>
                    <a target="_blank" rel="nofollow" href="https://www.linkedin.com/in/oluwatobiloba-paul/">
                      <FaLinkedin />
                    </a>
                    <a target="_blank" rel="nofollow" href="https://x.com/TobyCodes">
                      <FaXTwitter />
                    </a>
                  </div>
                </div>
                <div className="bts">
                  <a
                    target="_blank"
                    href="https://cal.com/paul-tobiloba"
                    className="btn"
                  >
                    <span>Schedule a call</span>
                  </a>
                  <a target="_blank" href="/resume.pdf" className="btn-lnk">
                    {" "}
                    Download Resume{" "}
                  </a>
                </div>
              </div>
              <div
                className="slide scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img
                  decoding="async"
                  src="assets/images/profile_portrait1.png"
                  alt="<b>Paul</b> Tobiloba"
                />
                <span className="circle circle-1" />
                <span
                  className="circle img-1"
                  style={{
                    backgroundImage: "url(assets/images/pat-1.png)",
                  }}
                />
                <span
                  className="circle img-2"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                  }}
                />
                <span
                  className="circle img-3"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                  }}
                />
                <div className="info-list">
                  <ul>
                    <li>
                      <span className="num">
                        6 <strong>+</strong>
                      </span>
                      <span className="value">
                        Years of <strong>Experience</strong>
                      </span>
                    </li>
                    <li>
                      <span className="num">18</span>
                      <span className="value">
                        Completed <strong>Projects</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> AI Overlord </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Services */}
      <section
        className="lui-section lui-gradient-bottom"
        id="services-section"
      >
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> What I Do </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Services</b>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Services */}
        <div className="v-line v-line-right">
          <div className="container">
            <Swiper
              {...servicesSliderProps}
              className="swiper-container js-services scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <SwiperSlide className="swiper-slide">
                <div className="services-item">
                  <div className="lui-subtitle">
                    <span> Web Development </span>
                  </div>
                  <div className="icon" />
                  <h5 className="lui-title">
                    <span> Frontend Web Developer </span>
                  </h5>
                  <div className="lui-text">
                    <div>
                      {" "}
                      I build responsive, user-friendly websites with a focus on
                      performance, ensuring seamless integration between design
                      and functionality using modern frameworks like React and
                      Next.js{" "}
                    </div>
                  </div>
                  <div className="icon" />
                  <a href="#pricing-section" className="lnk">
                    {" "}
                    See Pricing{" "}
                  </a>
                  <div
                    className="image"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="services-item">
                  <div className="lui-subtitle">
                    <span> Business Process Management </span>
                  </div>
                  <div className="icon" />
                  <h5 className="lui-title">
                    <span> Solutions Architect </span>
                  </h5>
                  <div className="lui-text">
                    <div>
                      <p>
                        I help businesses streamline complex workflows by
                        designing and implementing efficient systems. Through
                        process mapping and automation, I develop tailored
                        solutions that optimize business processes, enhance
                        productivity, and reduce operational risks.
                      </p>
                    </div>
                  </div>
                  <div className="icon" />
                  <a href="#pricing-section" className="lnk">
                    {" "}
                    See Pricing{" "}
                  </a>
                  <div
                    className="image"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="services-item">
                  <div className="lui-subtitle">
                    <span> Scripting & Automations </span>
                  </div>
                  <div className="icon" />
                  <h5 className="lui-title">
                    <span> Automations Specialist </span>
                  </h5>
                  <div className="lui-text">
                    <div>
                      {" "}
                      With extensive experience in automation, I specialize in
                      simplifying repetitive tasks and boosting efficiency for
                      organizations. Using tools like Power Automate, n8n, and
                      make.com, I design and deploy automated workflows that
                      integrate various systems, helping businesses save time
                      and reduce human error.{" "}
                    </div>
                  </div>
                  <div className="icon" />
                  <a href="#pricing-section" className="lnk">
                    {" "}
                    See Pricing{" "}
                  </a>
                  <div
                    className="image"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="services-item">
                  <div className="lui-subtitle">
                    <span> Power Platform </span>
                  </div>
                  <div className="icon" />
                  <h5 className="lui-title">
                    <span> Power Developer </span>
                  </h5>
                  <div className="lui-text">
                    <div>
                      {" "}
                      I develop custom solutions on Microsoft’s Power Platform,
                      optimizing workflows and creating apps that improve
                      business processes, enhance collaboration, and drive
                      productivity across organizations.{" "}
                    </div>
                  </div>
                  <div className="icon" />
                  <a href="#pricing-section" className="lnk">
                    {" "}
                    See Pricing{" "}
                  </a>
                  <div
                    className="image"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
              <div className="swiper-pagination" />
            </Swiper>
            <div className="lui-bgtitle">
              <span> Services </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Skills */}
      <section className="lui-section lui-gradient-center" id="skills-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Professional Skills </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Tech Stack</b>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Skills */}
        <SkillsIsotope />
      </section>

      {/* Section - Works */}
      <section className="lui-section lui-gradient-top" id="works-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Portfolio </span>
              </h2>
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
        </div>
        {/* Works */}
        <div className="v-line v-line-right">
          <div className="container">
            <PortfolioIsotope projects={projects} />
            <div className="lui-bgtitle">
              <span> Portfolio </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Resume */}
      <Resume />
      {/* Section - Testimonials */}
      <section
        className="lui-section lui-gradient-center"
        id="testimonials-section"
      >
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Testimonials </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  what <b>Customers Say</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="v-line v-line-right">
          <div className="container">
          <Swiper {...testimonialsSliderProps} className="swiper-container js-testimonials scrolla-element-anim-1 scroll-animate" data-animate="active">
  {testimonials.map((testimonial, index) => (
    <SwiperSlide key={index} className="swiper-slide">
      <div className="testimonials-item">
        <div className="image">
          {/* <img decoding="async" src={testimonial.image} alt={testimonial.name} /> */}
          <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(108 171 221)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
          </div>
        </div>
        <div className="text lui-text">
          <p>{testimonial.text}</p>
        </div>
        <div className="info">
          <h6 className="name"><span>{testimonial.name}</span></h6>
          <div className="author"><span>{testimonial.role}</span></div>
        </div>
        <div className="bg-img" style={{ backgroundImage: "url(assets/images/pat-2.png)" }} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

            <div className="lui-bgtitle">
              <span> Reviews </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Pricing */}
      <section className="lui-section lui-gradient-center" id="pricing-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Pricing </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  ways to <b>Work With Me</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Pricing */}
        <div className="v-line v-line-left">
          <div className="container">
            <div className="pricing-items row">
              <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div
                  className="pricing-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="lui-subtitle">
                    <span> Advisory Session </span>
                  </div>
                  <div className="icon" />
                  <div className="price">
                    <span>
                      {" "}
                      75 <b>$</b>
                    </span>
                    <em>Hour</em>
                  </div>
                  <div className="lui-text">
                    <div>
                      <p>
                        Best for technical direction, solution architecture,
                        automation planning, workflow reviews, and fixing stuck
                        projects without committing to a full build sprint.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div>
                      <ul>
                        <li>
                          <i className="fas fa-check" />
                          Automation roadmap and process audit
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Web architecture and integration advice
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Stack and tooling recommendations
                        </li>
                        <li>
                          <em>Implementation not included</em>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#contact-section" className="btn btn-solid">
                    <span>Book a Call</span>
                  </a>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(/assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </div>
              <div className="pricing-col center col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div className="label">
                  <span> Popular </span>
                </div>
                <div
                  className="pricing-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="lui-subtitle">
                    <span> Build Sprint </span>
                  </div>
                  <div className="icon" />
                  <div className="price">
                    <span>
                      {" "}
                      2,800 <b>$</b>
                    </span>
                    <em>Starting</em>
                  </div>
                  <div className="lui-text">
                    <div>
                      <p>
                        Ideal for focused delivery: landing pages, internal
                        tools, client portals, Power Automate workflows, and
                        AI-assisted business automations with a clear scope.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div>
                      <ul>
                        <li>
                          <i className="fas fa-check" />
                          Discovery and scope alignment
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Design, development, and QA
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Documentation and handoff support
                        </li>
                        <li>
                          <em>Complex enterprise integrations scoped separately</em>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#contact-section" className="btn btn-solid">
                    <span>Start Project</span>
                  </a>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(/assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </div>
              <div className="pricing-col col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div
                  className="pricing-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="lui-subtitle">
                    <span> Monthly Retainer </span>
                  </div>
                  <div className="icon" />
                  <div className="price">
                    <span>
                      {" "}
                      4,500 <b>$</b>
                    </span>
                    <em>Month</em>
                  </div>
                  <div className="lui-text">
                    <div>
                      <p>
                        For teams that need an ongoing technical partner to
                        improve operations, ship product updates, and maintain
                        automations without hiring a full in-house specialist.
                      </p>
                    </div>
                  </div>
                  <div className="list">
                    <div>
                      <ul>
                        <li>
                          <i className="fas fa-check" />
                          Priority delivery queue
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Ongoing web and automation support
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Weekly check-ins and reporting
                        </li>
                        <li>
                          <i className="fas fa-check" />
                          Continuous optimization and iteration
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#contact-section" className="btn btn-solid">
                    <span>Discuss Retainer</span>
                  </a>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(/assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Pricing </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Blog */}
      <section className="lui-section lui-gradient-top" id="blog-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Latest Blog </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  practical notes on <b>automation delivery</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Archive */}
        <div className="v-line v-line-right">
          <div className="container">
            <div className="blog-items row">
              {blogPosts.map((post) => (
                <div
                  key={post.slug}
                  className="col-xs-12 col-sm-6 col-md-6 col-lg-6"
                >
                  <div
                    className="archive-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="image">
                      <Link legacyBehavior href={`/blog/${post.slug}`}>
                        <a>
                          <img
                            decoding="async"
                            src={post.image}
                            alt={post.title}
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
                </div>
              ))}
            </div>
            <div className="load-more">
              <Link legacyBehavior href="/blog">
                <a
                  className="btn scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <span>View Blog</span>
                </a>
              </Link>
            </div>
            <div className="lui-bgtitle">
              <span> Blog </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Contacts */}
      <section className="lui-section lui-gradient-bottom" id="contact-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Contact Me </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  Let’s <b>Talk About Ideas</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="lui-contacts v-line v-line-left">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                <div className="numbers-items">
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-map" />
                    </div>
                    <div className="title">
                      <span> Address </span>
                    </div>
                    <div className="lui-text">
                      <span> Westwood Estate, Badore Ajah-Lekki, Lagos, Nigeria </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-user" />
                    </div>
                    <div className="title">
                      <span> Freelance </span>
                    </div>
                    <div className="lui-text">
                      <span> Available Right Now </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-envelope" />
                    </div>
                    <div className="title">
                      <span> Email </span>
                    </div>
                    <div className="lui-text">
                      <span> oluwatobiloba.xyz@gmail.com </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-address-book" />
                    </div>
                    <div className="title">
                      <span> Phone </span>
                    </div>
                    <div className="lui-text">
                      <span> Tel:+234 0810 695 5510 </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                <div
                  className="contacts-form scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(/assets/images/pat-1.png)",
                    }}
                  />
                  <div className="contacts-form">
                    <form onSubmit={handleContactSubmit} id="cform">
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div className="group">
                            <label>
                              Your Full Name <b>*</b>
                              <input
                                type="text"
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactChange}
                                autoComplete="name"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div className="group">
                            <label>
                              Your Email Address <b>*</b>
                              <input
                                type="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactChange}
                                autoComplete="email"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="group">
                            <label>
                              Your Subject <b>*</b>
                              <input
                                type="text"
                                name="subject"
                                value={contactForm.subject}
                                onChange={handleContactChange}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="group">
                            <label>
                              Your Message <b>*</b>
                              <textarea
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactChange}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right">
                          <div className="terms-label">
                            * Accept the terms and conditions.
                          </div>
                          <button type="submit" className="btn" disabled={isSubmitting}>
                            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                    {contactStatus.message ? (
                      <div
                        className="alert-success"
                        style={{
                          display: "block",
                          color: contactStatus.type === "error" ? "#b42318" : undefined,
                        }}
                      >
                        <p>{contactStatus.message}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Contact Me </span>
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

export default Index;
