'use client'

import { redirect } from 'next/navigation'
import styles from './home.module.css'

import { useSignOut, useUser } from '@/app/context/userContext'

export default function Home() {
  const user = useUser()
  const signOut = useSignOut()

  if (!user) {
    redirect('/users/signin', 'push')
  }

  return (
    <div>
      <h1 className={styles.greeting}>Hello{user === null ? '!' : ', ' + user.name + '!'}</h1>
      <div className={styles.links}>
        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : (
              <>
                <a href="/users/signin">Sign-in</a> / <a href="/users/signup">Sign-up</a>
              </>
            )
        }
      </div>
    </div>
  )
}
