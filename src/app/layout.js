import React from "react"
import { Work_Sans, Spline_Sans_Mono } from "next/font/google"
import clsx from "clsx"
import { cookies } from "next/headers"

import { LIGHT_TOKENS, DARK_TOKENS, BLOG_TITLE } from "@/constants"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
// this break for some reason
//import RespectMotionPreference from "@/components/RespectMotionPreference"
import "./styles.css"

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
})
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
})

export const metadata = {
  title: BLOG_TITLE,
}

async function RootLayout({ children }) {
  const userCookies = cookies()
  const colorThemeCookie = userCookies.get("color-theme") || "light"
  const theme = colorThemeCookie.value

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header initialTheme={theme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
