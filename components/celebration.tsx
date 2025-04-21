"use client"

import { useEffect, useRef } from "react"
import styles from "./celebration.module.css"

interface CelebrationProps {
  name: string
}

export default function Celebration({ name }: CelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Confetti particles
    const particles: Particle[] = []
    const particleCount = 150
    const gravity = 0.3
    const colors = [
      "#ff80ab",
      "#f48fb1",
      "#f06292",
      "#ec407a",
      "#e91e63",
      "#d81b60",
      "#c2185b",
      "#ad1457",
      "#880e4f",
      "#ffffff",
    ]

    class Particle {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
      x: number
      y: number
      size: number
      color: string
      velocity: { x: number; y: number }
      rotation: number
      rotationSpeed: number
      shape: "circle" | "square" | "heart"

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height - canvas.height
        this.size = Math.random() * 10 + 5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.velocity = {
          x: Math.random() * 6 - 3,
          y: Math.random() * 3 + 3,
        }
        this.rotation = Math.random() * 360
        this.rotationSpeed = Math.random() * 10 - 5
        this.shape = Math.random() < 0.33 ? "circle" : Math.random() < 0.66 ? "square" : "heart"
      }

      update() {
        this.velocity.y += gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.rotation += this.rotationSpeed

        if (
          this.y > this.canvas.height + this.size ||
          this.x < -this.size ||
          this.x > this.canvas.width + this.size
        ) {
          this.x = Math.random() * this.canvas.width
          this.y = -this.size
          this.velocity = {
            x: Math.random() * 6 - 3,
            y: Math.random() * 3 + 3,
          }
        }
      }

      draw() {
        const ctx = this.ctx

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation * Math.PI) / 180)

        if (this.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        } else if (this.shape === "square") {
          ctx.fillStyle = this.color
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else if (this.shape === "heart") {
          const size = this.size
          ctx.beginPath()
          ctx.moveTo(0, -size / 4)
          ctx.bezierCurveTo(size / 4, -size / 2, size / 2, -size / 4, size / 2, size / 8)
          ctx.bezierCurveTo(size / 2, size / 2, 0, size / 2, 0, size / 2)
          ctx.bezierCurveTo(0, size / 2, -size / 2, size / 2, -size / 2, size / 8)
          ctx.bezierCurveTo(-size / 2, -size / 4, -size / 4, -size / 2, 0, -size / 4)
          ctx.fillStyle = this.color
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, ctx))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          container.classList.add(styles.visible)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(container)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      observer.disconnect()
    }
  }, [])

  return (
    <section className={`section ${styles.celebrationSection}`}>
      <div ref={containerRef} className={styles.celebrationContainer}>
        <canvas ref={canvasRef} className={styles.confettiCanvas}></canvas>

        <div className={styles.content}>
          <h2 className={styles.celebrationTitle}>Selamat Ulang Tahun!</h2>
          <h3 className={styles.celebrationName}>{name}</h3>
          <p className={styles.celebrationMessage}>
            Selamat ulang tahun, Sayang. Di antara semua hal indah yang pernah Tuhan ciptakan, kamu adalah salah satu
            yang paling aku syukuri. Hadirmu nggak cuma jadi pelengkap hariku, tapi juga alasan aku terus belajar jadi
            versi terbaik dari diriku sendiri. Semoga di usia baru ini, kamu selalu dikelilingi cinta, kedamaian, dan
            harapan-harapan baik yang perlahan jadi nyata. Dan aku, dengan seluruh rasa yang aku punya, akan tetap di
            sini menemani, menjaga, dan mencintaimu, dengan cara yang paling tulus aku bisa.
          </p>
          <div className={styles.heart}></div>
        </div>
      </div>
    </section>
  )
}
