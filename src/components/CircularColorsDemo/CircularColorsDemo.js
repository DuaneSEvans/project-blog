"use client"
import React from "react"
import clsx from "clsx"
import { Play, Pause, RotateCcw } from "react-feather"
import { motion } from "framer-motion"
import Card from "@/components/Card"
import VisuallyHidden from "@/components/VisuallyHidden"

import styles from "./CircularColorsDemo.module.css"

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
]

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)
  const id = React.useId()

  React.useEffect(() => {
    if (!playing) {
      return
    }
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [playing])

  const togglePlaying = () => {
    setPlaying(!playing)
  }

  const resetTimeElapsed = () => {
    setTimeElapsed(0)
  }

  const selectedColor = COLORS[timeElapsed % COLORS.length]

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={id}
                  transition={{ type: "spring", stiffness: 300, damping: 40 }}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={togglePlaying}>
            {playing ? <Pause /> : <Play />}
            <VisuallyHidden>{playing ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={resetTimeElapsed}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CircularColorsDemo
