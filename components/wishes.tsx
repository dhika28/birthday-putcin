"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import styles from "./wishes.module.css"

interface Wish {
  id: number
  message: string
  sender: string
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, 
      message: "happpy birthday putsinnn💞💞semoga panjang umurr sehatt selaluu semogaa selalu jadi putsinn yg dudu kenall dari awal ketemuu, semoga apa yg putsin pengenin tercapaii dan semogaa dilancarin semuaa apa yg lagi diusahainnn, semogaa yg terbaik buat putsinn, semogaaa bahagiaa terus sm dhikaa😁dan semogaa putsinn selalu disekelilingi sama orang-orang yg tuluss dan sayangg sm putsinn❤",
      sender: "Dudu"},
      
    {
      id: 2,
      message: "Happy 21st birthday, Putsin lovee 🫶🏻 Panjang umur sehat selaluuuu, Semoga di usia 21 ini semakin bahagiaa, makin sukses, semoga selalu dikelilingi hal” baikkk, lancar kuliah dan skripsinya sampai semhasss🙆🏻‍♀😍Pokoknya semangat terus pantang mundur Semoga semua cita cita yang putsin harapkan bisa terkabul semuaa, dan jangan bosen” temenan sama kita yaww (kelamud 😍💅🏻💃🏾) Sekali lagi, happy birthday, Putsin! Semoga tahun ini jadi tahun paling bahagia😍😍🥳🤩🤩 Love you banyak-banyak",
      sender: "Tara"},
    {
      id: 3,
      message: "who turns 21st todayy?? 😱😱 happyy birthday putrii sinaaa 🥳❤ semogaa dilancarkan semua proses sked nya, semua impian putsin terwujud yaa, banyak rezekii, makin sabarr, dann semoga makin rajin beres beres 😬 putsinn, semogaa di umur yang baru ini semua perjalanan putsin dilancarkan dan segala keputusan yang putsin ambil baik semuaa ❤ ily ",
      sender: "Ave"},
    {
      id: 4,
      message:
        "Happy Birthday, Putsin! Wishing you a day filled with love, laughter, and unforgettable memories. Thank you for always being there, for your kindness, your jokes, and all the little things that make life better. I’m so lucky to have you in my life. Here’s to more adventures, late-night talks, and dreams coming true. May this year bring you happiness, success, and everything your heart desires. Enjoy your special day to the fullest!",
        sender: "Aud"},
    { id: 5, message: "happy birthday putsinnn🥳🥳 selamat bertambah umur, semoga happy terus sehat juga dan tercapai cita citanya. semoga yang disemogakan bisa terkabul🫂 anddd skripsi semoga lancar🫰🏻🫰🏻🫰🏻",
      sender: "Bulan"},
  ])

  const [newWish, setNewWish] = useState({ message: "" })
  const [isVisible, setIsVisible] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const wishesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (wishesRef.current) {
      observer.observe(wishesRef.current)
    }

    return () => {
      if (wishesRef.current) {
        observer.unobserve(wishesRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newWish.message.trim()) {
      // We don't actually add the wish to the list as per requirement
      setNewWish({ message: "" })
      setShowPopup(true)

      // Hide popup after 5 seconds
      setTimeout(() => {
        setShowPopup(false)
      }, 5000)
    }
  }

  return (
    <section className={`section ${styles.wishesSection}`}>
      <h2 className="section-title">Harapan Ulang Tahun</h2>

      <div ref={wishesRef} className={`${styles.wishesContainer} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.wishesGrid}>
          {wishes.map((wish) => (
            <div key={wish.id} className={styles.wishCard}>
              <div className={styles.wishContent}>
              <p className={styles.wishMessage}>"{wish.message}"</p>
              <span className={styles.wishSender}>- {wish.sender}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.addWishContainer}>
          <h3 className={styles.addWishTitle}>Tulis Harapanmu disini</h3>
          <form className={styles.wishForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <textarea
                placeholder="Harapan Ulang Tahunmu"
                value={newWish.message}
                onChange={(e) => setNewWish({ message: e.target.value })}
                className={styles.textarea}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Kirim Harapan
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupAnimation}>
              <div className={styles.heart}></div>
            </div>
            <p className={styles.popupMessage}>"Harapan ini tidak akan tersimpan disini tetapi akan tersimpan di hidupmu"</p>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
