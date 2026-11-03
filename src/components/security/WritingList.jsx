import Link from "next/link";
import styles from "../../../styles/SecurityPortfolio.module.css";
export default function WritingList({ posts, compact=false }) {
  const Heading=compact?"h3":"h2";
  return <div className={compact?styles.writingCompact:styles.writingList}>{posts.map(post=><article key={post.slug} className={styles.writingItem}><Link href={`/blog/${post.slug}`} className={styles.writingImage} aria-label={`Read ${post.title}`}><img src={post.image} alt={post.title} width="1200" height="800" loading="lazy" decoding="async"/></Link><div><p className={styles.caption}>{post.date} · {post.categories.join(" / ")}</p><Heading><Link href={`/blog/${post.slug}`}>{post.title}</Link></Heading><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`} className={styles.textLink}>Read article</Link></div></article>)}{compact&&<Link href="/blog" className={styles.secondaryButton}>Browse all writing</Link>}</div>;
}
