'use client'

import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext(null)
const UpdateUserContext = createContext(null)
const SignOutContext = createContext(null)

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  async function updateUser() {
    const accessToken = localStorage.getItem('myapp.AccessToken')

    if (!accessToken) {
      return false
    }

    try {
      let profile = await fetch('/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      profile = await profile.json()

      if (profile) setUser({ accessToken, ...profile })
    } catch (err) {}
  }

  useEffect(() => {
    updateUser()
  }, [])

  function signOut() {
    localStorage.removeItem('myapp.AccessToken')
    setUser(null)
  }

  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={updateUser}>
        <SignOutContext.Provider value={signOut}>
          {children}
        </SignOutContext.Provider>
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export function useUpdateUser() {
  return useContext(UpdateUserContext)
}

export function useSignOut() {
  return useContext(SignOutContext)
}