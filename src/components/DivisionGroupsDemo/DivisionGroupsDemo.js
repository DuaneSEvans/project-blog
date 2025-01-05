"use client"
import React from "react"
import clsx from "clsx"
import { motion, LayoutGroup } from "framer-motion"
import { range } from "@/utils"
import Card from "@/components/Card"
import SliderControl from "@/components/SliderControl"
import Equation from "./Equation"
import styles from "./DivisionGroupsDemo.module.css"

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const id = React.useId()
  const items = range(numOfItems).map((i) => ({ id: `${id}${i}` }))
  const calcGroups = (numOfGroups) => {
    const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups)
    const numOfRemainders = includeRemainderArea ? numOfItems % numOfGroups : 0

    const groups = range(numOfGroups).map((groupIndex) => {
      return items.slice(
        groupIndex * numOfItemsPerGroup,
        (groupIndex + 1) * numOfItemsPerGroup
      )
    })

    const remainder = includeRemainderArea
      ? items.slice(numOfItems - numOfRemainders, numOfItems).reverse()
      : []

    return { groups, remainder }
  }

  const [groups, setGroups] = React.useState(
    calcGroups(initialNumOfGroups, items.length).groups
  )

  const [remainders, setRemainders] = React.useState(
    calcGroups(initialNumOfGroups, items.length).remainder
  )

  const handleSliderChange = (ev) => {
    const newNumOfGroups = Number(ev.target.value)
    const { groups: newGroups, remainder: newRemainders } = calcGroups(
      newNumOfGroups,
      items.length
    )
    setGroups(newGroups)
    setRemainders(newRemainders)
  }

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    groups.length < 4
      ? {
          gridTemplateColumns: `repeat(${groups.length}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        }

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label="Number of Groups"
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            value={groups.length}
            onChange={handleSliderChange}
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={clsx(styles.demoArea)} style={gridStructure}>
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                {group.map((item) => {
                  return (
                    <motion.div
                      layoutId={item.id}
                      key={item.id}
                      className={styles.item}
                    >
                      {item.id.split(id)[1]}
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {remainders.map((item) => {
              return (
                <motion.div
                  layoutId={item.id}
                  key={item.id}
                  className={styles.item}
                >
                  {item.id.split(id)[1]}
                </motion.div>
              )
            })}
          </div>
        )}

        <Equation
          dividend={items.length}
          divisor={groups.length}
          remainder={remainders.length}
        />
      </Card>
    </LayoutGroup>
  )
}

export default DivisionGroupsDemo
