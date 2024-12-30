import React from "react"
import styles from "./homepage.module.css"
import BlogSummaryCards from "@/components/BlogSummaryCards"

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      <BlogSummaryCards />
    </div>
  )
}

export default Home
