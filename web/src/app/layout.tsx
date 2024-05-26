import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import LenisWrapper from '@/components/common/LenisWrapper'
import Header from '@/components/common/header/Header'

import './globals.css'
import { ThemeProvider } from '@/components/common/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: {
    default: 'Synesthesia',
    template: '%s | Synesthesia',
  },
  description: 'Find your favourite events',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <Header />
          <LenisWrapper>{children}</LenisWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
