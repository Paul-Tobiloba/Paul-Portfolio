import { useState } from "react";
import { useRouter } from "next/router";
import PortfolioShell from "../src/components/security/PortfolioShell";
import WritingList from "../src/components/security/WritingList";
import { blogPosts } from "../src/data/blogPosts";
import styles from "../styles/SecurityPortfolio.module.css";
export default function Blog() {
  const router=useRouter();
  const [query,setQuery]=useState("");
  const tag=typeof router.query.tag==="string"?router.query.tag:"";
  const topics=[...new Set(blogPosts.flatMap(post=>post.tags))];
  const posts=blogPosts.filter(post=>(!tag||post.tags.includes(tag)||post.categories.includes(tag))&&(post.title+" "+post.excerpt).toLowerCase().includes(query.trim().toLowerCase()));
  function topic(value){router.replace({pathname:"/blog",query:value?{tag:value}:{}},undefined,{shallow:true,scroll:false});}
  return <PortfolioShell title="Blog | Paul Tobiloba" description="Practical writing on web development, automation, Python and reliable systems."><main id="main" className={`${styles.main} ${styles.archiveMain}`}><div className={styles.archiveHeading}><h1>Blog</h1><p>Practical notes from building real systems.<br/>Web development, automation and the lessons along the way.</p></div><div className={styles.archiveTools}><label className={styles.searchField}>Search articles<input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Find a topic or article"/></label><label className={styles.searchField}>Topic<select value={tag} onChange={event=>topic(event.target.value)}><option value="">All topics</option>{topics.map(value=><option key={value} value={value}>{value}</option>)}</select></label></div><p className={styles.caption} aria-live="polite">{posts.length} {posts.length===1?"article":"articles"}</p><WritingList posts={posts}/>{!posts.length&&<div className={styles.emptyResults}><h2>No matching articles</h2><p>Try another topic or search term.</p><button type="button" className={styles.secondaryButton} onClick={()=>{setQuery("");topic("");}}>Reset filters</button></div>}</main></PortfolioShell>;
}
Blog.securityPortfolio=true;
