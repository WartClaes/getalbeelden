import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppContextProvider } from '@/services/app-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Getalbeelden',
  description: 'Getalbeelden',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
