import Image from "next/image"

const stats = [
  { value: "24", label: "Години искуство" },
  { value: "180+", label: "Завршени проекти" },
  { value: "12", label: "Меѓународни награди" },
]

export function About() {
  return (
    <section id="about" className="border-t border-border bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-foreground/60" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/70">За Нас</span>
              </div>
              <h2 className="font-serif text-4xl leading-[1.1] text-balance md:text-5xl lg:text-6xl">
                Архитектонско биро со повеќедецениско искуство.
              </h2>
              <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/70 md:text-lg">
                <p>
                  Студио 2000 е архитектонско биро основано во 2000-та година во Скопје и предводено од искусен архитект — член на Академијата на Архитекти при Асоцијацијата на архитекти на Македонија. Студиото располага со компетентен и стручен кадар за изработка на идејни и основни проекти со високо професионална техничка обработка и со 3D визуелизација.
                </p>
                <p>
                  Специјализирани сме за менаџирање, координација и дизајнирање на архитектонски проекти — од креирање на концепт до техничко финализирање со сите потребни фази и елаборати, со спецификација и пресметки на чинење и сите потребни инсталации. Вршиме надзор, ревизија и консалтинг при инвестиции за градба на објекти и комуникација со потребните институции.
                </p>
                <p>
                  Имаме големо искуство при проектирање на станбени, комерцијални, здравствени, образовни и други типови на објекти, како и при изработка на ентериерни решенија. Студио 2000 има работено проекти низ Републиката и надвор од неа — во Албанија, Украина и други средини. Учествувавме во реализирање на проекти на странски донатори, како проектот на ECHO-CRIC Италија за реставрација на домови згрижители на деца со пречки во развојот и проектот на УНДП во Ресен за реставрација на еко-системот на Преспанско Езеро.
                </p>
                <p>
                  Добитници сме на многу престижни награди, меѓу кои Прва награда на БИМАС 2006 за најдобар архитектонски проект — Скопски Саем; Втора награда на интернационалниот конкурс за идејно решение на Македонската Филхармонија; Прва награда на БИМАС 2008 за Трговски центар со катна гаража во Прилеп; Годишна награда за архитектура 2013 и многу други.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl md:text-5xl">{stat.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted lg:aspect-auto lg:min-h-[700px]">
            <Image
              src="/about-studio.jpg"
              alt="Внатрешност на студиото на STUDIO 2000"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
