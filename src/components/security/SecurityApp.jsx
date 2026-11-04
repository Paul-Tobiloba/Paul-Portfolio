import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { subscribeRouteLoading } from './routeLoading.mjs';
import BrandLoading from './BrandLoading';

export default function SecurityApp({ Component, pageProps }) {
  const router=useRouter();
  const page=useRef(null);
  const [navigating,setNavigating]=useState(false);
  useEffect(()=>subscribeRouteLoading(router.events,setNavigating),[router.events]);
  return <><Head><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="author" content="paul-tobiloba"/><link rel="icon" type="image/svg+xml" href="/assets/brand/icon.svg"/><link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png"/><link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png"/><noscript><style>{'#portfolio-loading-screen{display:none!important}'}</style></noscript></Head><BrandLoading visible={navigating} contentRef={page}/><div ref={page} data-portfolio-content="true"><Component {...pageProps}/></div></>;
}
