const scenarios = [
  {
    id: 'password', tactic: 'Credential phishing', sender: 'Workplace IT', address: 'identity@workplace-access.example',
    subject: 'Action required: keep your work account active', destination: 'https://workplace-access.example/confirm', knownDomain: 'workplace.example',
    body: ['Hello,', 'Your workplace password is due to expire today. To keep access to email and cloud services, confirm your current password before the end of the next hour.'],
    cta: 'Keep my account active', signoff: 'Workplace IT',
    signals: ['The sender and destination use workplace-access.example instead of the known workplace.example domain.', 'A one-hour deadline pressures you to act before checking.', 'An unsolicited message asks you to confirm a current password.'],
    lesson: 'Open the known workplace portal independently and verify the request through a trusted channel.',
    attack: { type: 'identity', title: 'Training account takeover', events: ['Lookalike sign-in page opened in the simulation', 'Demo credentials captured — no real input requested', 'Attacker session created for training.user@example.test', 'Mock mailbox access established'], impact: 'The simulated attacker now has a session in the training account. Your actual account and device are untouched.' },
  },
  {
    id: 'invoice', tactic: 'Malicious attachment', sender: 'LedgerWorks Billing', address: 'billing@ledgerworks-payments.example',
    subject: 'Overdue invoice — review the attached statement', destination: 'Attachment: Invoice_November.xlsm (simulation only)', knownDomain: 'ledgerworks.example',
    body: ['Hello,', 'Our records show an outstanding balance. Please open the attached invoice today to avoid a service interruption.', 'If the spreadsheet displays a security notice, select Enable Content so the payment information can load.'],
    cta: 'Open invoice & enable content', attachment: 'Invoice_November.xlsm', signoff: 'LedgerWorks Accounts',
    signals: ['An unexpected macro-enabled .xlsm attachment asks you to enable active content.', 'The sender uses ledgerworks-payments.example rather than the known supplier domain.', 'A service-interruption threat adds pressure to open the file.'],
    lesson: 'Verify unexpected invoices with the supplier using a known contact. Follow your organisation’s attachment policy and do not enable macros from an untrusted document.',
    attack: { type: 'files', title: 'Training ransomware incident', events: ['Mock spreadsheet opened', 'Malicious macro enabled in the simulation', 'Fictional workspace files marked as encrypted', 'Training desktop enters a simulated locked state'], impact: 'Only the fictional filenames below change. This page has not read, downloaded, encrypted or modified any real file.' },
  },
  {
    id: 'consent', tactic: 'OAuth consent phishing', sender: 'ProjectSpace Sharing', address: 'share@projectspace-notices.example',
    subject: 'A confidential project folder has been shared with you', destination: 'https://projectspace-notices.example/authorize', knownDomain: 'projectspace.example',
    body: ['Hi,', 'A new project folder is ready for your review. Approve the Document Viewer app to open the files.', 'The app requests mailbox access, cloud-file access and ongoing access so your review can stay synced.'],
    cta: 'Approve access & view folder', permissions: ['Read your mailbox', 'Read your cloud files', 'Maintain ongoing access'], signoff: 'ProjectSpace Documents',
    signals: ['Viewing a shared document should not require broad mailbox and ongoing access.', 'The app and sender have not been independently verified.', 'The destination differs from the known projectspace.example service domain.'],
    lesson: 'Review the app, publisher and requested permissions. Verify a sharing request independently and use your organisation’s approval process before granting access.',
    attack: { type: 'cloud', title: 'Training cloud-access incident', events: ['Unverified app approval selected', 'Demo mailbox and file permissions granted', 'Fictional cloud documents copied to a mock export', 'Persistent demo app access established'], impact: 'This illustrates account/data access through consent, not a device infection. No real OAuth flow, permission grant or export has occurred.' },
  },
];

export const phishingTypes = scenarios.map(({id,tactic}) => ({id,tactic}));
function messageAt(index, now) { return { ...scenarios[index], receivedAt: now.toISOString() }; }
export function createPhishingEmail(now = new Date()) {
  return { kind: 'phishing-email', phase: 'delivered', round: 0, total: scenarios.length, reported: 0, mistakes: 0, paused: false, attackStep: 0, feedback: null, previousFeedback: null, reviews: [], message: messageAt(0,now) };
}
function reportFeedback(state) {
  return { title: 'Reported to the training SOC', tone: 'success', description: `Correct: this is ${state.message.tactic.toLowerCase()}. Reporting flags the simulated message for investigation and helps protect other recipients.`, lesson: state.message.lesson };
}
export function actOnPhishingEmail(state, action) {
  if (!state || state.kind !== 'phishing-email') return { error: 'No active training email. Run Send-PhishingEmail first.' };
  if (action === 'pause' || action === 'resume') {
    if (!['reported','attacking'].includes(state.phase)) return { error: 'There is no running progression to pause. Choose an action on the current email.' };
    return { state: { ...state, paused: action === 'pause' } };
  }
  if (action === 'next') {
    if (state.phase !== 'reported') return { error: 'Report the current email before moving to the next one.' };
    return { state: advancePhishingEmail({ ...state, paused: false }) };
  }
  if (action === 'retry' && ['attacking','clicked'].includes(state.phase)) return { state: { ...state, phase: 'delivered', attackStep: 0, feedback: null, paused: false } };
  if (action === 'undo' && state.phase === 'deleted') return { state: { ...state, phase: 'delivered', feedback: null } };
  if (state.phase !== 'delivered') return { error: 'Use email next after reporting, email retry after the simulated attack, or Send-PhishingEmail to restart.' };
  if (action === 'click') return { state: { ...state, phase: 'attacking', attackStep: 0, paused: false, mistakes: state.mistakes + 1, feedback: { title: 'Risky click · simulated compromise', tone: 'caution', description: 'The training attack below shows a possible consequence. No page opened and no credentials, real files or permissions were requested.', lesson: state.message.lesson } } };
  if (action === 'report') {
    const feedback=reportFeedback(state);
    const review={...feedback,round:state.round+1,tactic:state.message.tactic,subject:state.message.subject,signals:state.message.signals};
    return { state: { ...state, phase:'reported', reported:state.reported+1, feedback, reviews:[...(state.reviews || []),review] } };
  }
  if (action === 'delete') return { state: { ...state, phase: 'deleted', feedback: { title: 'Removed from the training inbox', tone: 'neutral', description: 'Deleting avoids the lure, but it does not alert the security team. It does not infect your device. Undo this demo deletion and report the message to complete the round.', lesson: 'Reporting suspicious messages gives the security team evidence to investigate and warn other people.' } } };
  return { error: 'Choose email click, email report, email delete or email undo.' };
}

// Called only by local UI timers or explicit progression controls. No OS/device operations.
export function advancePhishingEmail(state, { finishAttack = false, now = new Date() } = {}) {
  if (!state || state.paused) return state;
  if (state.phase === 'reported') {
    if (state.round + 1 === state.total) return { ...state, phase: 'complete' };
    return { ...state, phase: 'delivered', round: state.round + 1, attackStep: 0, previousFeedback: { ...state.feedback, signals: state.message.signals, round: state.round + 1 }, feedback: null, message: messageAt(state.round + 1,now) };
  }
  if (state.phase === 'attacking') {
    const step=finishAttack ? state.message.attack.events.length : state.attackStep + 1;
    return { ...state, attackStep: step, phase: step >= state.message.attack.events.length ? 'clicked' : 'attacking' };
  }
  return state;
}

export function phishingAnnouncement(state) {
  const round=`Email ${state.round+1} of ${state.total}.`;
  if (state.phase === 'complete') return `Challenge complete. ${state.reported} of ${state.total} reported. ${state.mistakes} risky clicks. No real device was affected.`;
  if (state.phase === 'reported') return `${state.feedback.title}. ${state.feedback.description} ${state.paused?'Auto-advance paused.':'The next step follows automatically; feedback stays available.'}`;
  if (state.phase === 'attacking') return `${round} Simulated attack only. ${state.message.attack.events[state.attackStep-1] || 'Starting training sequence.'} ${state.paused?'Paused.':''}`;
  if (state.phase === 'clicked') return `${round} Attack simulation finished. Your actual device is untouched. Choose Contain and retry to try the same email again.`;
  if (state.phase === 'deleted') return `${round} ${state.feedback.description}`;
  return `${round} Training email delivered: ${state.message.subject}. Choose Report phishing, Delete or the simulated link. ${state.previousFeedback?.description || ''}`;
}

export function simulateEmailDelivery(signal, delay = 900) {
  return new Promise((resolve, reject) => {
    let timer;
    const finish = () => { signal?.removeEventListener('abort', cancel); resolve(); };
    const cancel = () => { clearTimeout(timer); signal?.removeEventListener('abort', cancel); reject(new DOMException('Cancelled', 'AbortError')); };
    if (signal?.aborted) return cancel();
    signal?.addEventListener('abort', cancel, { once: true });
    timer = setTimeout(finish, delay);
  });
}
