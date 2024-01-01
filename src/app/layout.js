import './globals.css'

import UserProvider from './context/userContext'

export const metadata = {
  title: 'NextJS Auth System',
  description: 'Simple authentication system using NextJS',
}

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserProvider>
  )
}
