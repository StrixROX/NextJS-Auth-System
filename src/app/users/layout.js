'use client'

import styles from './form.module.css'

export default function FormLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src="/images/banner.webp" alt="Banner" className={styles.banner} />
        <div className={styles.formWrapper}>
          {children}
        </div>
      </div>
    </div>
  )
}