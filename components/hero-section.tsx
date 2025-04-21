"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./hero-section.module.css"

interface HeroSectionProps {
  name: string
  date: string
}

export default function HeroSection({ name, date }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      // Parallax background effect
      container.style.backgroundPosition = `${50 + x * 10}% ${50 + y * 10}%`
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Trigger initial animations
    const elements = container.querySelectorAll(`.${styles.animateIn}`)
    elements.forEach((el, index) => {
      setTimeout(() => {
        ;(el as HTMLElement).style.opacity = "1"
        ;(el as HTMLElement).style.transform = "translateY(0)"
      }, 300 * index)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Typing animation effect
  useEffect(() => {
    const fullText = name
    let timer: NodeJS.Timeout

    if (isDeleting) {
      setTypingSpeed(75)
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length - 1))
      }, typingSpeed)
    } else {
      setTypingSpeed(150)
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1))
      }, typingSpeed)
    }

    if (!isDeleting && displayText === fullText) {
      setTimeout(() => {
        setIsDeleting(true)
      }, 1000)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setTimeout(() => {}, 500)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, name, typingSpeed])

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBackground}
      >
        <source src="/putcin.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌓 Overlay for better text visibility */}
      <div className={styles.overlay}></div>

      {/* ✨ Main Content */}
      <div className={styles.content}>
        <h2 className={`${styles.animateIn} ${styles.greeting}`}>Selamat Ulang Tahun</h2>
        <h1 ref={nameRef} className={`${styles.animateIn} ${styles.name}`}>
          {displayText}
          <span className={styles.cursor}>|</span>
        </h1>
        <p className={`${styles.animateIn} ${styles.date}`}>{date}</p>
      </div>

      {/* 💫 Optional particles */}
      {/* <div className={styles.particles}></div> */}
    </div>
  )
}
