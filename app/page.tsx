import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import Timeline from "@/components/timeline"
import Gallery from "@/components/gallery"
import MemoryBook from "@/components/memory-video"
import Wishes from "@/components/wishes"
import Celebration from "@/components/celebration"
import Loading from "@/components/loading"
import "@/app/globals.css"

export default function Home() {
  return (
    <main className="main-container">
      <Suspense fallback={<Loading />}>
        <HeroSection name="Ni Wayan Putri Sina Wirandani" date="22 April 2025" />
        <Timeline />
        <Gallery />
        <MemoryBook/>
        <Wishes />
        <Celebration name="Ni Wayan Putri Sina Wirandani" />
      </Suspense>
    </main>
  )
}
