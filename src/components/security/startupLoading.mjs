export const STARTUP_MARKER = 'data-portfolio-startup';
export const LOADER_MAX_WAIT = 1100;

// Runs before the body is parsed. Only an executed script can hide the page.
export const startupScript = `(()=>{const root=document.documentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const started=String(performance.now());setTimeout(()=>{if(root.getAttribute('${STARTUP_MARKER}')===started)root.removeAttribute('${STARTUP_MARKER}');},${LOADER_MAX_WAIT});root.setAttribute('${STARTUP_MARKER}',started);})();`;

export const startupStyles = `
html:not([${STARTUP_MARKER}]) [data-startup-loader]{display:none!important}
html[${STARTUP_MARKER}] [data-portfolio-content]{visibility:hidden;opacity:0}
html[${STARTUP_MARKER}] [data-startup-loader]{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:#090e0c;visibility:visible;opacity:1;pointer-events:auto;transition:none}
html[${STARTUP_MARKER}] [data-startup-loader][data-startup-exiting]{opacity:0;pointer-events:none;transition:opacity 140ms ease-out}
html[${STARTUP_MARKER}] body:has([data-portfolio-content]){background:#090e0c;overflow:hidden}
`;
