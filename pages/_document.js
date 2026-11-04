import { Html, Head, Main, NextScript } from "next/document";
import { startupScript, startupStyles } from "../src/components/security/startupLoading.mjs";

export default function Document() {
  return <Html lang="en" data-scroll-behavior="smooth"><Head><style dangerouslySetInnerHTML={{__html: startupStyles}}/><script dangerouslySetInnerHTML={{__html: startupScript}}/></Head><body><Main /><NextScript /></body></Html>;
}
