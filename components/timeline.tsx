"use client"

import { useEffect, useRef } from "react"
import styles from "./timeline.module.css"

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0.2 },
    )

    const timelineItems = document.querySelectorAll(`.${styles.timelineItem}`)
    timelineItems.forEach((item) => {
      observer.observe(item)
    })

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [])

  return (
    <section className={`section ${styles.timelineSection}`}>
      <h2 className="section-title">Perjalanan Kita Bersama</h2>
      <div ref={timelineRef} className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>

        <div className={`${styles.timelineItem} ${styles.left}`}>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>Kenangan Pertama</div>
            <h3 className={styles.timelineTitle}>Saat Kita Pertama Bertemu</h3>
            <p className={styles.timelineText}>Awal yang indah untuk cerita kita. Momen yang memulai segalanya.</p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.right}`}>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>Momen Spesial</div>
            <h3 className={styles.timelineTitle}>Perjalanan Pertama Kita</h3>
            <p className={styles.timelineText}>
              Ingat perjalanan spontan yang kita lakukan? Tawa, pemandangan, dan kenangan indah.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.left}`}>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>Pencapaian</div>
            <h3 className={styles.timelineTitle}>Hari yang Tak Terlupakan</h3>
            <p className={styles.timelineText}>
              Beberapa momen tetap bersama kita selamanya, mengubah cara kita melihat dunia.
            </p>
          </div>
        </div>

        <div className={`${styles.timelineItem} ${styles.right}`}>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>Hari Ini</div>
            <h3 className={styles.timelineTitle}>Ulang Tahun Spesialmu</h3>
            <p className={styles.timelineText}>
              Merayakan dirimu dan semua kebahagiaan yang kamu bawa ke dunia di sekitarmu.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
