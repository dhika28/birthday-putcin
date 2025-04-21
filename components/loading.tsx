import styles from "./loading.module.css"

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingHeart}></div>
      <p className={styles.loadingText}>Memuat kejutan spesial...</p>
    </div>
  )
}
