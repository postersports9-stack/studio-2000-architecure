import { Phone, Mail, Clock, MapPin } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-40">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-12 bg-background/60" aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.3em] text-background/70">Контакт</span>
        </div>

        <h2 className="font-serif text-5xl leading-[1.0] text-balance sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Контактирајте нè
          <br />
          <span className="text-background/50">веднаш.</span>
        </h2>

        <a
          href="tel:070220772"
          className="group mt-12 inline-flex items-center gap-6 border-y border-background/30 py-8 transition-colors hover:border-background md:mt-16 md:py-12"
        >
          <Phone className="h-8 w-8 transition-transform group-hover:-rotate-12 md:h-12 md:w-12" aria-hidden="true" />
          <span className="font-serif text-4xl tracking-tight md:text-6xl lg:text-7xl">070 220 772</span>
        </a>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-background/20 pt-16 md:grid-cols-3 md:gap-8">
          <ContactItem icon={Mail} label="Електронска пошта" value="kontakt@studio2000.mk" href="mailto:kontakt@studio2000.mk" />
          <ContactItem icon={Clock} label="Работно време" value="Понеделник — Петок" sub="09:00 — 18:00" />
          <ContactItem icon={MapPin} label="Студио" value="Бул. Партизански Одреди 15" sub="1000 Скопје, С. Македонија" />
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-background/20 pt-10 text-xs uppercase tracking-[0.2em] text-background/60 md:flex-row md:items-center">
          <div>STUDIO 2000 — Архитектонско Студио</div>
          <div>© {new Date().getFullYear()} Сите права задржани.</div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  value: string
  sub?: string
  href?: string
}) {
  const content = (
    <>
      <Icon className="mb-6 h-5 w-5 text-background/60" aria-hidden={true} />
      <div className="text-xs uppercase tracking-[0.2em] text-background/50">{label}</div>
      <div className="mt-3 font-serif text-2xl">{value}</div>
      {sub && <div className="mt-1 text-sm text-background/60">{sub}</div>}
    </>
  )

  if (href) {
    return (
      <a href={href} className="group block transition-opacity hover:opacity-70">
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}
