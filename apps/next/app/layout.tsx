import type { Metadata } from 'next'
import { NextTamaguiProvider } from './NextTamaguiProvider'
import HocLayout from './hocLayout'
import './layout.style.css'

export const metadata: Metadata = {
  title: 'Wheely',
  description: 'Wheely ',
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          backgroundColor: '#F1F5F9',
        }}
      >
        <NextTamaguiProvider>
          <HocLayout
            style={{
              fontSize: '16px',
            }}
          >
            {children}
          </HocLayout>
        </NextTamaguiProvider>
      </body>
    </html>
  )
}
