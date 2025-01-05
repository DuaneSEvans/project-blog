"use client"
import React from "react"
import clsx from "clsx"
import { Rss, Sun, Moon } from "react-feather"
import Logo from "@/components/Logo"
import VisuallyHidden from "@/components/VisuallyHidden"
import styles from "./Header.module.css"
import { DARK_COLORS, LIGHT_COLORS } from "@/constants"
import Cookies from "js-cookie"

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    const root = document.documentElement
    const colors = newTheme === "light" ? LIGHT_COLORS : DARK_COLORS

    root.setAttribute("data-color-theme", newTheme)
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    Cookies.set("color-theme", newTheme, {
      expires: 1000,
    })
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button onClick={handleChangeTheme} className={styles.action}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  )
}

export default Header
