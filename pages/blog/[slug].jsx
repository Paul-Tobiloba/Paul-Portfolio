import Link from "next/link";
import PortfolioShell from "../../src/components/security/PortfolioShell";
import ArticleBody from "../../src/components/security/ArticleBody";
import { blogPosts, getBlogPostBySlug } from "../../src/data/blogPosts";
import styles from "../../styles/SecurityPortfolio.module.css";

export default function BlogPostPage({post}) {
  const related=blogPosts.filter(item=>item.slug!==post.slug);
  return <PortfolioShell title={`${post.title} | Paul Tobiloba`} description={post.excerpt}><main id="main" className={`${styles.main} ${styles.articleMain}`}><Link href="/blog" className={styles.textLink}>Back to blog</Link><header className={styles.articleHeading}><h1>{post.title}</h1><p>{post.excerpt}</p><div className={styles.articleMeta}><span>{post.date}</span><span>By {post.author}</span><span>{post.categories.join(" / ")}</span></div></header><figure className={styles.articleCover}><img src={post.image} alt={post.title} width="1600" height="900" fetchPriority="high"/></figure><div className={styles.articleLayout}><article className={styles.prose}><ArticleBody post={post}/></article><aside className={styles.articleAside}><h2>More writing</h2>{related.map(item=><Link key={item.slug} href={`/blog/${item.slug}`}><span className={styles.caption}>{item.date}</span><strong>{item.title}</strong></Link>)}<Link href="/blog" className={styles.textLink}>All articles</Link></aside></div><nav className={styles.nextProject} aria-label="Article navigation"><Link href="/blog" className={styles.secondaryButton}>Back to blog</Link><Link href="/#blog-section" className={styles.textLink}>Back to portfolio writing</Link></nav></main></PortfolioShell>;
}
export const getStaticPaths=async()=>({paths:blogPosts.map(post=>({params:{slug:post.slug}})),fallback:false});
export const getStaticProps=async({params})=>{const post=getBlogPostBySlug(params.slug);return post?{props:{post}}:{notFound:true};};
BlogPostPage.securityPortfolio=true;
