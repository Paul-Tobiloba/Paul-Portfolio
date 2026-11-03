const aliases = {
  "send-phishingemail": "email-start", "send-phishing-email": "email-start",
  "get-help": "help", "get-projects": "projects", "get-skills": "skills", "get-experience": "experience", "open-project": "open", cls: "clear", "clear-host": "clear",
  "get-whatyourbrowserknows": "browserinfo", getuserinfo: "browserinfo", "get-userinfo": "browserinfo", "get-browserinfo": "browserinfo",
  "get-netipconfiguration": "ipconfig", "get-location": "location", "test-connection": "ping", pingip: "ping",
  "get-games": "games", "stop-game": "exit", "get-date": "date",
};
const starters = { "start-phishingquiz": "phishing", "start-socshift": "soc", "start-portquiz": "ports" };

// Fixed portfolio commands only. No input is ever evaluated as JavaScript or PowerShell.
export function resolvePortfolioCommand(input, projects) {
  const [raw = "", ...args] = input.trim().toLowerCase().split(/\s+/);
  const command = Object.hasOwn(aliases,raw) ? aliases[raw] : raw;
  if (!raw) return { kind: "empty" };
  if (command === "open") {
    const project = args.length === 1 && projects.find(item => item.slug === args[0]);
    return project ? { kind: "open", href: `/works/${project.slug}` } : { kind: "error", message: "Use open <project-slug>. Run projects to see the available slugs." };
  }
  if (Object.hasOwn(starters,command) && !args.length) return { kind: "play", game: starters[command] };
  if (command === "play") return args.length === 1 && ["phishing", "soc", "ports"].includes(args[0]) ? { kind: "play", game: args[0] } : { kind: "error", message: "Choose play phishing, play soc or play ports." };
  if (command === "email") return args.length === 1 && ["click","report","delete","undo","next","retry","pause","resume"].includes(args[0]) ? { kind:"email-action", action:args[0] } : { kind:"error",message:"Use email report, click, delete, undo, next, retry, pause or resume. Start with Send-PhishingEmail." };
  if (command === "answer") return args.length === 1 && /^[a-z0-9-]{1,16}$/.test(args[0]) ? { kind: "answer", answer: args[0] } : { kind: "error", message: "Use answer <choice>, for example answer phishing. Run games to pick a challenge." };
  if (command === "ping") return args.length <= 1 && (!args[0] || /^[a-z0-9.:[\]-]{1,253}$/.test(args[0])) ? { kind: "ping", target: args[0] || "self" } : { kind: "error", message: "Use ping or ping this-site for this site’s HTTP response time." };
  if (["email-start", "help", "whoami", "projects", "skills", "experience", "resume", "contact", "clear", "browserinfo", "ipconfig", "location", "hostname", "date", "games", "exit"].includes(command) && !args.length) return { kind: command };
  return { kind: "error", message: `Command not found: ${raw}. Type help to see the available commands.` };
}
