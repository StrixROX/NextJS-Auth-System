'use client'

import styles from '../form.module.css'

import { redirect } from "next/navigation"
import SignInHandler from "./signin"
import { useState } from 'react'

export default function SignUpPage() {
  const [errors, setErrors] = useState([])

  async function handleSubmit(formData) {
    const { success, msgs } = await SignInHandler(formData)
    if (!success) {
      setErrors(msgs)
      return false
    }

    redirect('/users', 'push')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src="/images/banner.webp" alt="Banner" className={styles.banner} />
        <div className={styles.formWrapper}>
          <form action={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Sign in</h1>
            <span className={styles.error}>{errors.join('\n')}</span>
            <input type="text" name="username" placeholder="Username" required tabIndex={1} autoFocus />
            <input type="password" name="password" placeholder="Password" required tabIndex={2} />
            <input type="submit" value="Sign in" />
            <a href="/users/signup" className={styles.hyperlink}>Sign up</a>
          </form>
        </div>
      </div>
    </div>
  )
}