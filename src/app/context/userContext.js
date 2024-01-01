'use client'

import { createContext, useContext, useState } from "react"

const UserContext = createContext(null)
const ChangeUserContext = createContext(null)
const SignOutContext = createContext(null)

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  function changeUser(newUser) {
    if (newUser !== null) {
      setUser(newUser)
    }
  }

  function signOut() {
    setUser(null)
  }

  return (
    <UserContext.Provider value={user}>
      <ChangeUserContext.Provider value={changeUser}>
        <SignOutContext.Provider value={signOut}>
          {children}
        </SignOutContext.Provider>
      </ChangeUserContext.Provider>
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export function useChangeUser() {
  return useContext(ChangeUserContext)
}

export function useSignOut() {
  return useContext(SignOutContext)
}