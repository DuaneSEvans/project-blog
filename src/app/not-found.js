import Link from "next/link"
import styles from "./not-found.module.css"

export const metadata = {
  title: "404 Not Found",
}

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2>404 Not Found</h2>
      <p>No blog here!</p>
      <Link className={styles.returnHome} href="/">
        Return Home
      </Link>
    </div>
  )
}
