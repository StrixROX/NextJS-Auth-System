import './globals.css'

import styles from './layout.module.css'
import UserProvider from './context/userContext'

export const metadata = {
  title: 'NextJS Auth System',
  description: 'Simple authentication system using NextJS',
}

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <img src="/images/banner.webp" alt="Banner" className={styles.banner} />
              <div className={styles.formWrapper}>
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </UserProvider>
  )
}
