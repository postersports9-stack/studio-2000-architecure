import type { Metadata } from 'next'
import { Libre_Franklin } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { PageTransition } from '@/components/page-transition'
import './globals.css'

const din = localFont({
  src: [
    {
      path: './fonts/PFDinTextPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PFDinTextPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-din',
  display: 'swap',
})

const franklin = Libre_Franklin({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-franklin',
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
    <html lang="mk" className={`${franklin.variable} ${din.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
