'use client'

import { useSignOut, useUser } from '@/app/context/userContext'

export default function Home() {
  const user = useUser()
  const signOut = useSignOut()

  return (
    <>
      <h1>Hello{user === null ? '!' : ', ' + user.name + '!'}</h1>
      { user && (
        <button onClick={signOut}>Sign out</button>
      ) }
      <a href="/users/signup">&gt; Sign-up</a>
      <a href="/users/signin">&gt; Sign-in</a>
    </>
  )
}
