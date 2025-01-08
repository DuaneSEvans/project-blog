import { BLOG_TITLE } from "@/constants"
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers"
import RSS from "rss"

export async function GET() {
  const blogs = await getBlogPostList()
  const feed = new RSS(
    {
      title: BLOG_TITLE,
      description: "A sample blog",
      url: "http://localhost:3000/", // not production ready
    },
    []
  )

  for (const { slug } of blogs) {
    const {
      frontmatter: { title, abstract },
    } = await loadBlogPost(slug)
    feed.item({
      title,
      description: abstract,
      url: `http://localhost:3000/${slug}`, // not production ready
    })
  }

  const xml = feed.xml()

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
