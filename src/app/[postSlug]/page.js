import React from "react"
import BlogHero from "@/components/BlogHero"
import { MDXRemote } from "next-mdx-remote/rsc"
import styles from "./postSlug.module.css"
import { loadBlogPost } from "@/helpers/file-helpers"
import { BLOG_TITLE } from "@/constants"
import CodeSnippet from "@/components/CodeSnippet"
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo"
import CircularColorsDemo from "@/components/CircularColorsDemo"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
  const { postSlug } = await params

  const blogData = await loadBlogPost(postSlug)

  if (!blogData) {
    return null
  }

  const {
    frontmatter: { title, abstract },
  } = blogData
  return {
    title,
    description: `${abstract} • ${BLOG_TITLE}`,
  }
}

async function BlogPost({ params }) {
  const { postSlug } = await params
  const blogData = await loadBlogPost(postSlug)

  if (!blogData) {
    return notFound()
  }

  const {
    frontmatter: { title, publishedOn },
    content,
  } = blogData

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
          source={content}
        >
          {content}
        </MDXRemote>
      </div>
    </article>
  )
}

export default BlogPost
