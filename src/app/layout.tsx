import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sipo App',
  description: 'Clon de Twitter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className='bg-slate-50 min-h-screen flex'>
        <wc-toast></wc-toast>
        {children}
        </main>
      </body>
    </html>
  )
}
