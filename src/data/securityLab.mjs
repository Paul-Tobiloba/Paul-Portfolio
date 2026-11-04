export const signInLab = {
  slug: 'sign-in-triage-lab',
  title: 'Suspicious Sign-in Triage',
  subtitle: 'A synthetic SOC lab for investigating a successful sign-in after repeated failures.',
  year: '2026',
  technologies: 'Identity sign-in logs, SOC triage',
  categories: 'Cybersecurity Lab',
  filters: ['sorting-cybersecurity'],
  image: '/assets/security/sign-in-triage-cover.svg',
  projectImg: [],
  description: [
    'I built this interactive exercise to show how I would triage an identity alert using a small, fictional sign-in timeline. It uses sample events only, with no production identity or customer data.',
    'The scenario starts with failures at 09:14:02 and 09:14:19, followed by a success at 09:15:03. The three events share an identity and source. The exercise separates those observations from evidence that is still missing, including device context, MFA details and user confirmation.',
    'The investigation follows three steps: order the events, identify what the available context can and cannot support, and decide what to verify before closing or escalating the alert.',
  ],
  conclusion: [
    'The three events span 61 seconds. A success following failures makes the alert worth investigating, but the timeline alone does not establish account compromise.',
    'The proposed next step is to correlate device and MFA evidence and confirm the sign-in with the user. Escalation depends on the combined evidence and the team’s incident procedure.',
  ],
};
