import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer} from '@/app/components/toast-client';
import 'react-toastify/dist/ReactToastify.min.css'

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
      <ToastContainer />
        <main className='bg-slate-50 min-h-screen flex'>
        {children}
        </main>
      </body>
    </html>
  )
}
