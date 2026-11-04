// Only explicitly reviewed public destinations belong here. Legacy database
// preview and video fields are never a source of public calls to action.
const publicSites = new Map([
  ['diergasia', 'https://diergasia.com/'],
  ['thelade-consult', 'https://www.theladeconsult.com/'],
  ['heroesforchristministry', 'https://heroesforchristministry.org/'],
]);
const approvedWalkthroughs = new Map();

export function projectAvailability(project) {
  const liveUrl = publicSites.get(project.slug) ?? null;
  const videoUrl = approvedWalkthroughs.get(project.slug) ?? null;
  const hasGallery = Boolean(project.projectImg?.length || project.image);
  const isLab = project.slug === 'sign-in-triage-lab';
  const isPrivate = project.slug === 'reconciliation-rpa';
  return {
    liveUrl, videoUrl, hasGallery, isLab,
    label: isLab ? 'Synthetic lab' : liveUrl ? 'Public website' : isPrivate ? 'Private deployment' : videoUrl ? 'Walkthrough available' : hasGallery ? 'Gallery available' : 'Case study available',
  };
}
