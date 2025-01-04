import React from "react"
import BlogSummaryCard from "../BlogSummaryCard/BlogSummaryCard"
import { getBlogPostList } from "@/helpers/file-helpers"

async function BlogSummaryCards() {
  const blogs = await getBlogPostList()

  return (
    <>
      {blogs.map(({ slug, ...delegated }) => {
        return <BlogSummaryCard key={slug} slug={slug} {...delegated} />
      })}
    </>
  )
}

export default BlogSummaryCards
