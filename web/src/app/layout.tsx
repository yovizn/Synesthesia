import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/common/ThemeProvider'
import LenisWrapper from '@/components/common/LenisWrapper'
import AuthProvider from '@/components/common/AuthProvider'

import './globals.css'

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
      suppressHydrationWarning={true}
    >
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <AuthProvider>
            <LenisWrapper>{children}</LenisWrapper>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
