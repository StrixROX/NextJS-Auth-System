'use client'

import styles from '../form.module.css'

import { redirect } from "next/navigation"
import SignUpHandler from "./signup"
import { useState } from 'react'

function validate(formData) {
  const errList = []

  // validation checks
  if (formData.get('password') !== formData.get('password-re')) {
    errList.push('Passwords do not match')
  }

  return {
    isValid: (errList.length === 0),
    errList
  }
}

export default function SignUpPage() {
  const [errors, setErrors] = useState([])

  async function handleSubmit(formData) {
    const { isValid, errList } = validate(formData)
    if (!isValid) {
      setErrors(errList)
      return false
    }

    const { success, msgs } = await SignUpHandler(formData)
    if (!success) {
      setErrors(msgs)
      return false
    }

    redirect('/users/signin', 'push')
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Sign up</h1>
      <span className={styles.error}>{errors.join('\n')}</span>
      <input type="text" name="name" placeholder="Name" required tabIndex={1} autoFocus />
      <input type="text" name="username" placeholder="Username" required tabIndex={2} />
      <input type="password" name="password" placeholder="Password" required tabIndex={3} />
      <input type="password" name="password-re" placeholder="Confirm password" required tabIndex={4} />
      <input type="submit" value="Sign up" />
      <a href="/users/signin" className={styles.hyperlink}>Sign in</a>
    </form>
  )
}