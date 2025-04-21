"use client"

import { useRef, useEffect } from "react"
import styles from "./memory-video.module.css"

export default function MemoryVideo() {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = -(y - centerY) / 20
      const rotateY = (x - centerX) / 20

      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const resetTilt = () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg)"
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", resetTilt)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", resetTilt)
    }
  }, [])

  return (
    <section className={styles.memorySection}>

      <div className={styles.videoFrame} ref={frameRef}>
        <div className={styles.frameBorder}></div>
        <video
          className={styles.video}
          src="/us.mp4"
          controls
          muted
          loop
        />
        <div className={styles.caption}>
          <h3>Kenangan Manis</h3>
          <p>Momen spesial yang tak terlupakan</p>
        </div>
      </div>
    </section>
  )
}
