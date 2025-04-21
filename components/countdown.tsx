"use client"

import { useState, useEffect } from "react"
import styles from "./countdown.module.css"

interface CountdownProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const section = document.querySelector(`.${styles.countdownSection}`)
    if (section) {
      observer.observe(section)
    }

    return () => {
      clearInterval(timer)
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [targetDate])

  return (
    <section className={`section ${styles.countdownSection}`}>
      <div className={styles.countdownContainer}>
        <h2 className="section-title">Countdown to the Big Day</h2>

        <div className={`${styles.countdownWrapper} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.countdownItem}>
            <div className={styles.countdownNumber}>{timeLeft.days}</div>
            <div className={styles.countdownLabel}>Days</div>
          </div>

          <div className={styles.countdownItem}>
            <div className={styles.countdownNumber}>{timeLeft.hours}</div>
            <div className={styles.countdownLabel}>Hours</div>
          </div>

          <div className={styles.countdownItem}>
            <div className={styles.countdownNumber}>{timeLeft.minutes}</div>
            <div className={styles.countdownLabel}>Minutes</div>
          </div>

          <div className={styles.countdownItem}>
            <div className={styles.countdownNumber}>{timeLeft.seconds}</div>
            <div className={styles.countdownLabel}>Seconds</div>
          </div>
        </div>

        <p className={styles.countdownMessage}>Until we celebrate this special day together!</p>
      </div>
    </section>
  )
}
