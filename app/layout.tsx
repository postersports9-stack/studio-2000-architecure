import type { Metadata } from 'next'
import { Onest, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PageTransition } from '@/components/page-transition'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
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
    <html lang="mk" className={`${onest.variable} ${lora.variable} bg-background`}>
      <body className="font-sans antialiased">
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
