export const blogPosts = [
  {
    slug: "wordpress-web-development-what-actually-matters",
    title: "WordPress Web Development: What Actually Matters When Building Real Sites",
    excerpt:
      "WordPress is easy to start with, but real-world delivery depends on structure, performance, maintainability, and how the site will actually be managed after launch.",
    categoryText: "Web Development / WordPress / Website Performance",
    categories: ["Web Development", "WordPress"],
    date: "May 2026",
    author: "Paul Tobiloba",
    image: "/assets/images/blog-4-scaled-1.jpg",
    tags: ["WordPress", "Web Development", "CMS", "Frontend", "UX", "Website Performance"],
  },
  {
    slug: "building-rpa-reconciliation-process-bank",
    title: "Building an RPA Reconciliation Process for a Bank: What I Learned",
    excerpt:
      "Reconciliation looks simple until the data stops lining up. This article covers normalization, keys, scale, logging, and why banking automations need better process design than step-by-step scripting.",
    categoryText: "Automation Engineering / Banking / Reconciliation",
    categories: ["Automation Engineering", "Banking Automation"],
    date: "April 2026",
    author: "Paul Tobiloba",
    image: "/assets/images/blog-2.jpg",
    tags: ["RPA", "Power Automate Desktop", "Reconciliation", "Automation", "Banking", "Data Processing"],
  },
  {
    slug: "using-python-in-power-automate-desktop-rpa",
    title: "Using Python in Power Automate Desktop RPA",
    excerpt:
      "Power Automate Desktop handles orchestration well. Python becomes valuable when the workflow needs stronger data transformation, validation, parsing, API handling, or reusable business logic.",
    categoryText: "Automation Engineering / Python / Power Automate Desktop",
    categories: ["Automation Engineering", "Power Automate Desktop"],
    date: "March 2026",
    author: "Paul Tobiloba",
    image: "/assets/images/single7.jpg",
    tags: ["Python", "Power Automate Desktop", "RPA", "Automation"],
  },
];

export const getBlogPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug) ?? null;
