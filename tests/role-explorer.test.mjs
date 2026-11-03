import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { experienceDates, experienceLabel, orderedExperience } from '../src/components/security/roleExperience.mjs';

const content = JSON.parse(readFileSync(new URL('../src/data/portfolioContent.json', import.meta.url)));

test('ordering preserves six complete roles and every responsibility without mutating source order', () => {
  const before = structuredClone(content.experience);
  const roles = orderedExperience(content.experience);
  assert.deepEqual(content.experience, before);
  assert.equal(roles.length, 6);
  assert.equal(roles.reduce((sum, role) => sum + role.dec.length, 0), 32);
  for (const role of roles) assert.deepEqual(role, before.find(original => original.id === role.id));
  assert.deepEqual(roles.map(role => role.startYear), ['2026','2025','2024','2023','2023','2022']);
});

test('internship and Union Bank dates retain the supplied months and current/ended status', () => {
  const internship = content.experience.find(role => role.id === 6);
  const union = content.experience.find(role => role.id === 1);
  assert.equal(experienceDates(internship), 'September 2026 – Present');
  assert.equal(experienceDates(internship, true), 'Sep 2026 – Present');
  assert.equal(experienceDates(union), '2025 – August 2026');
  assert.equal(experienceDates(union, true), '2025 – Aug 2026');
});

test('year-only dates and company attribution remain intact behind compact selector labels', () => {
  const freelance = content.experience.find(role => role.id === 2);
  const acp = content.experience.find(role => role.id === 4);
  const union = content.experience.find(role => role.id === 1);
  assert.equal(experienceDates(freelance), '2023 – Present');
  assert.equal(experienceDates(acp), '2024 – 2025');
  assert.equal(experienceLabel(union), 'Union Bank');
  assert.equal(union.company, 'Union Bank (Contract, secondment from SakalGb Solutions)');
  assert.equal(experienceLabel({ id: 99, company: 'New company' }), 'New company');
});
