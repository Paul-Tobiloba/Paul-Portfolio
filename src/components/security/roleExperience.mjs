const companyLabels = {
  6: 'Programming Buddies',
  1: 'Union Bank',
  2: 'Freelance',
  3: 'SakalGb Solutions',
  4: 'Advanced Cloud Partners',
  5: 'Noirak Technologies',
};

export function experienceLabel(role) {
  return companyLabels[role.id] || role.company;
}

export function experienceDates(role, short = false) {
  const month = value => value ? `${short ? value.slice(0, 3) : value} ` : '';
  const start = `${month(role.startMonth)}${role.startYear}`;
  const end = role.endYear ? `${month(role.endMonth)}${role.endYear}` : 'Present';
  return `${start} – ${end}`;
}

export function orderedExperience(roles) {
  return [...roles].sort((a, b) => Number(b.startYear) - Number(a.startYear));
}
