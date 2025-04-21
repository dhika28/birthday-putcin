import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Selamat Ulang Tahun Ni Wayan Putri Sina Wirandani",
  description: "Perayaan hari spesialmu",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <div className="layoutWrapper">
          <main className="mainContent">{children}</main>
          <footer className="footer">
            <div className="footerContainer">
              <p className="footerText">
                © {new Date().getFullYear()} Dhika — Made with <span className="heartIcon">❤️</span>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


