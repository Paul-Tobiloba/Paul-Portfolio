const questions = {
  phishing: [
    { prompt: 'From: IT Support <help@company-login.example>. “Your account closes in 20 minutes. Sign in at company-login.example/verify and enter your MFA code.” Your company uses company.example.', choices: ['phishing','safe'], answer: 'phishing', explanation: 'The lookalike domain, urgency and request for an MFA code are warning signs. Verify through a known channel; do not use the message’s link.' },
    { prompt: 'A colleague sends an unexpected invoice attachment and asks you to enable macros to read it. The display name looks familiar, but you have not verified the request.', choices: ['phishing','safe'], answer: 'phishing', explanation: 'Treat the attachment as suspicious and verify independently. A familiar display name does not establish who sent it; enabling macros can execute code.' },
    { prompt: 'A password-reset email arrives immediately after you requested it. You ignore its link, open the company’s bookmarked portal yourself and confirm your request there. Classify that action.', choices: ['phishing','safe'], answer: 'safe', explanation: 'Using a known, independently opened portal avoids trusting an email link. No single signal makes an email trustworthy.' },
    { prompt: 'A QR-code poster promises a free premium account and asks you to sign in with your work credentials. You cannot verify who placed it.', choices: ['phishing','safe'], answer: 'phishing', explanation: 'QR codes can hide a credential-harvesting destination. Do not enter work credentials into an unverified service.' },
  ],
  soc: [
    { prompt: 'Synthetic alert: 18 failed sign-ins followed by a success for a finance account, from a new country, with an unfamiliar device. Triage: escalate or dismiss?', choices: ['escalate','dismiss'], answer: 'escalate', explanation: 'The correlated failures, success and unfamiliar context justify investigation. Verify with the account owner and follow the incident playbook; the alert alone is not proof of compromise.' },
    { prompt: 'Synthetic alert: a scanner matches an approved change window, source address and recorded ticket. The asset owner confirms the activity, and no conflicting evidence appears. Escalate or dismiss?', choices: ['escalate','dismiss'], answer: 'dismiss', explanation: 'Close as documented expected activity after that validation, recording the ticket and evidence. Continue to investigate if conflicting signals appear.' },
    { prompt: 'Synthetic alert: a cloud storage policy changes from private to public on a bucket holding customer documents. No approved change exists. Escalate or dismiss?', choices: ['escalate','dismiss'], answer: 'escalate', explanation: 'Unapproved exposure of sensitive data needs prompt escalation and authorized containment. Preserve evidence and follow the cloud incident process.' },
    { prompt: 'Synthetic alert: encoded PowerShell launches from a document process, then attempts a connection to a rare external destination. Escalate or dismiss?', choices: ['escalate','dismiss'], answer: 'escalate', explanation: 'The process chain and unusual network behavior warrant investigation. Encoded PowerShell alone is not necessarily malicious; correlate the evidence.' },
  ],
  ports: [
    { prompt: 'Which port is the conventional default for HTTPS?', choices: ['443','80','22'], answer: '443', explanation: 'HTTPS conventionally uses port 443. A service can be configured on a different port.' },
    { prompt: 'Which port is the conventional default for SSH?', choices: ['23','22','3389'], answer: '22', explanation: 'SSH conventionally uses TCP port 22; Telnet commonly uses 23.' },
    { prompt: 'Which port is conventionally used by DNS queries?', choices: ['53','25','110'], answer: '53', explanation: 'DNS conventionally uses port 53 over UDP or TCP. DNS over HTTPS and TLS use different transports.' },
    { prompt: 'Which port is the conventional default for Remote Desktop Protocol?', choices: ['445','3389','8080'], answer: '3389', explanation: 'RDP conventionally uses port 3389. Exposing it directly to the internet increases attack surface.' },
    { prompt: 'Which port is the conventional default for HTTP?', choices: ['80','443','143'], answer: '80', explanation: 'HTTP conventionally uses port 80. HTTPS adds transport encryption and conventionally uses 443.' },
  ],
};
export const gameTitles = { phishing: 'Spot the phish', soc: 'SOC shift', ports: 'Know your ports' };
export function gameView(state, feedback = '') {
  return { kind: 'game', title: gameTitles[state.game], question: state.questions[state.index] || null, round: Math.min(state.index + 1,state.questions.length), total: state.questions.length, score: state.score, complete: state.index >= state.questions.length, feedback };
}
export function startGame(game, random = Math.random) {
  if (!Object.hasOwn(questions,game)) return null;
  const deck = [...questions[game]];
  for (let i=deck.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
  return { game, questions: deck, index: 0, score: 0 };
}
export function answerGame(state, answer) {
  if (!state || state.index >= state.questions.length) return { state: null, result: { kind:'error',message:'No active game. Run games or play phishing to start.' } };
  const question=state.questions[state.index];
  if (!question.choices.includes(answer)) return { state, result: { kind:'error',message:`Choose ${question.choices.join(' or ')}. Use answer <choice>.` } };
  const correct=answer===question.answer;
  const next={...state,index:state.index+1,score:state.score+Number(correct)};
  return { state: next.index===next.questions.length ? null : next, result: gameView(next, `${correct?'Correct.':`The best answer is ${question.answer}.`} ${question.explanation}`) };
}
