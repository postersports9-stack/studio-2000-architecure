import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-foreground/30">404</span>
        <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
          Страницата не постои
        </h1>
        <p className="mt-6 text-sm text-foreground/50">
          Содржината што ја барате не е пронајдена.
        </p>
        <Link
          href="/"
          className="mt-12 text-xs uppercase tracking-[0.25em] text-foreground/60 transition-colors hover:text-foreground"
        >
          ← Назад кон почетна
        </Link>
      </section>
      <SiteFooter />
    </main>
  )
}
