const disciplines = [
  ['cybersecurity', 'Cybersecurity'],
  ['automation', 'Automation'],
  ['frontend', 'Frontend'],
  ['others', 'Tools & data'],
];

export function buildSkillGroups(skills) {
  const seen = new Set();
  return disciplines.map(([id, name]) => ({
    id,
    name,
    tools: (skills[id] || []).filter(tool => {
      const key = tool.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(({ name, desc }) => ({ name, desc })),
  }));
}

// Rectangles are measured from the real controls, so long labels and loaded
// fonts keep their connections attached without fixed-position hit targets.
export function signalRoutes(bounds, hub, tools) {
  if (!(bounds.width > 0 && bounds.height > 0)) return [];
  const centerX = hub.left - bounds.left + hub.width / 2;
  const centerY = hub.top - bounds.top + hub.height / 2;
  return tools.map(({ name, rect }) => {
    const left = rect.left + rect.width / 2 < hub.left + hub.width / 2;
    const start = {
      x: centerX + (left ? -hub.width / 2 : hub.width / 2),
      y: centerY,
    };
    const end = {
      x: rect.left - bounds.left + (left ? rect.width : 0),
      y: rect.top - bounds.top + rect.height / 2,
    };
    const bend = (start.x + end.x) / 2;
    return {
      name,
      start,
      end,
      d: `M${start.x},${start.y} C${bend},${start.y} ${bend},${end.y} ${end.x},${end.y}`,
    };
  });
}
