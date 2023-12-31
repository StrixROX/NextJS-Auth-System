'use client'

import styles from '../form.module.css'

import { redirect } from "next/navigation"
import SignUpHandler from "./signup"
import { useState } from 'react'

export default function SignUpPage() {
  const [errors, setErrors] = useState([])

  async function handleSubmit(formData) {
    if (formData.get('password') !== formData.get('password-re')) {
      setErrors(['Passwords do not match'])

      return false
    }

    const { success, msgs } = await SignUpHandler(formData)

    if (success) {
      redirect('/users', 'push')
    }

    setErrors(msgs)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src="/images/banner.webp" alt="Banner" className={styles.banner} />
        <div className={styles.formWrapper}>
          <form action={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Sign up</h1>
            <span className={styles.error}>{errors.join('\n')}</span>
            <input type="text" name="name" placeholder="Name" required tabIndex={1} autoFocus />
            <input type="text" name="username" placeholder="Username" required tabIndex={2} />
            <input type="password" name="password" placeholder="Password" required tabIndex={3} />
            <input type="password" name="password-re" placeholder="Confirm password" required tabIndex={4} />
            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </div>
  )
}