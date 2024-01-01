'use client'

import styles from '../form.module.css'

import { useState } from 'react'
import { redirect } from "next/navigation"
import SignInHandler from "./signin"
import { useChangeUser } from '@/app/context/userContext'

export default function SignUpPage() {
  const [errors, setErrors] = useState([])

  const changeUser = useChangeUser()

  async function handleSubmit(formData) {
    const { success, user, msgs } = await SignInHandler(formData)
    if (!success) {
      setErrors(msgs)
      return false
    }

    changeUser(user)
    redirect('/', 'push')
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Sign in</h1>
      <span className={styles.error}>{errors.join('\n')}</span>
      <input type="text" name="username" placeholder="Username" required tabIndex={1} autoFocus />
      <input type="password" name="password" placeholder="Password" required tabIndex={2} />
      <input type="submit" value="Sign in" />
      <a href="/users/signup" className={styles.hyperlink}>Sign up</a>
    </form>
  )
}