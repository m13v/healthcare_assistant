import './globals.css'
import { CSPostHogProvider } from './providers'
import { Inter } from 'next/font/google'
import Header from '@/components/ui/header'
import { type ReactNode } from 'react'
import { AI } from '../lib/chat/actions'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { cn } from '@/lib/utils'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const runtime = "edge";

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AI>
      <html lang="en" suppressHydrationWarning>
        <CSPostHogProvider>
          <body
            className={cn(
              'font-sans antialiased',
              GeistSans.variable,
              GeistMono.variable,
              inter.variable,
              'font-inter',
              'bg-white',
              'text-gray-900',
              'tracking-tight'
            )}
          >
            <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:text-clip">
              <Header />
              <main className="flex flex-col flex-1">{children}</main>
            </div>
          </body>
        </CSPostHogProvider>
      </html>
    </AI>
  )
}