import React from "react"
import BlogHero from "@/components/BlogHero"
import { MDXRemote } from "next-mdx-remote/rsc"
import styles from "./postSlug.module.css"
import { loadBlogPost } from "@/helpers/file-helpers"

async function BlogPost({ params }) {
  const { postSlug } = await params
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(postSlug)
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content}>{content}</MDXRemote>
      </div>
    </article>
  )
}

export default BlogPost
