import { isIP } from 'node:net';

const header = (req,name) => {
  const value=req.headers[name];
  return (Array.isArray(value)?value[0]:value || '').slice(0,256);
};
export default function handler(req,res) {
  res.setHeader('Cache-Control','private, no-store, max-age=0');
  res.setHeader('Vercel-CDN-Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if (req.method!=='GET') { res.setHeader('Allow','GET'); return res.status(405).json({error:'Use GET.'}); }
  if (req.query.ping==='1') return res.status(200).json({ok:true});
  // On Vercel these are platform-supplied headers. Locally ignore forwarded headers.
  const deployed=process.env.VERCEL==='1';
  const candidate=deployed ? header(req,'x-forwarded-for').split(',')[0].trim() : req.socket?.remoteAddress || '';
  const ip=isIP(candidate)?candidate:null;
  let city=deployed?header(req,'x-vercel-ip-city'):'';
  try { city=decodeURIComponent(city); } catch { city=''; }
  return res.status(200).json({
    ip,
    scope:deployed?'Public address observed by this site (may be a VPN or proxy)':'Local development connection; not your public internet address',
    city:city || null,
    region:deployed?header(req,'x-vercel-ip-country-region') || null:null,
    country:deployed?header(req,'x-vercel-ip-country') || null:null,
    note:'IP location is approximate and may describe a VPN, proxy or network exit. This endpoint does not save the report; hosting providers may keep normal request logs.',
  });
}
