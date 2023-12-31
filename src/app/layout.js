import './globals.css'

export const metadata = {
  title: 'NextJS Auth System',
  description: 'Simple authentication system using NextJS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
