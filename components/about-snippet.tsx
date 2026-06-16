'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutSnippet() {
  return (
    <section className="bg-background py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left Column — Title */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-foreground/60" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/70">За Нас</span>
            </div>
            <h2 className="font-serif text-4xl leading-[1.1] text-balance md:text-5xl lg:text-6xl">
              Архитектонско биро со повеќедецениско искуство.
            </h2>
          </div>

          {/* Right Column — Content Snippet */}
          <div className="flex flex-col justify-between items-start">
            <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
              Студио 2000 е архитектонско биро основано во 2000-та година во Скопје и предводено од искусен архитект — член на Академијата на Архитекти при Асоцијацијата на архитекти на Македонија. Студиото располага со компетентен и стручен кадар за изработка на идејни и основни проекти со високо професионална техничка обработка и со 3D визуелизација.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] text-background transition-all hover:bg-background hover:text-foreground"
              >
                <span>Повеќе за нас</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
