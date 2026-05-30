import type { Metadata } from 'next'
import { Onest, Cormorant } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

const cormorant = Cormorant({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STUDIO 2000 — Архитектонско Студио',
  description:
    'Елитно архитектонско студио специјализирано за висококвалитетен просторен дизајн. Контактирајте нè на 070 220 772.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mk" className={`${onest.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
