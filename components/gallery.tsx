"use client"

import React, { useState } from "react"
import { useSprings, animated, to as interpolate } from "@react-spring/web"
import { useDrag } from "react-use-gesture"
import styles from "./gallery.module.css"

const images = [
  "/card0.jpg",
  "/card1.jpg",
  "/card2.jpg",
  "/card3.jpg",
  "/card4.jpg",
  "/card5.jpg",
  "/card6.jpg",
  "/card7.jpg",
  "/card8.jpg",
  "/card9.jpg",
  "/card10.jpg",
  "/card11.jpg",
  "/card12.jpg",
  "/card13.jpg",
  "/card14.jpg",
  "/card15.jpg",
]

const to = (i: number) => ({
  x: 0,
  y: i * 5,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const from = () => ({ x: 0, rot: 0, scale: 1, y: 0 })

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function Gallery() {
  const [gone] = useState(() => new Set<number>())
  const [springs, api] = useSprings(images.length, i => ({
    ...to(i),
    from: from(),
  }))

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2
    const dir = xDir < 0 ? -1 : 1
    if (!down && trigger) gone.add(index)
    api.start(i => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
      const scale = down ? 1.1 : 1
      const y = isGone ? 100 : down ? 5 : 0
      return {
        x,
        y,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })

    if (!down && gone.size === images.length) {
      setTimeout(() => {
        gone.clear()
        api.start(i => ({
          ...to(i),
        }))
      }, 600)
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.hintContainer}>
        <span className={styles.hintText}>Geser</span>
        <span className={styles.arrow}></span>
      </div>
  
      {springs.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} className={styles.deck} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            className={styles.card}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${images[i]})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}
