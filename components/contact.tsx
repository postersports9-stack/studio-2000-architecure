'use client'

import { useState } from "react"
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react"

type FormState = "idle" | "submitting" | "success" | "error"

export function Contact() {
  const [state, setState] = useState<FormState>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("submitting")
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setState("success")
        form.reset()
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-12 md:py-20">

        {/* Header */}
        <div className="mb-16 flex items-center gap-3">
          <span className="h-px w-12 bg-foreground/60" aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/70">Контакт</span>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">

          {/* Left — info */}
          <div className="flex flex-col justify-between">
            <div>
              <a
                href="tel:070220772"
                className="group inline-flex items-center gap-5 border-y border-foreground/20 py-7 transition-colors hover:border-foreground/50"
              >
                <Phone className="h-6 w-6 transition-transform group-hover:-rotate-12" aria-hidden="true" />
                <span className="font-serif text-3xl tracking-tight md:text-4xl">070 220 772</span>
              </a>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <ContactItem icon={Mail} label="Електронска пошта" value="contact@studio2000.com.mk" href="mailto:contact@studio2000.com.mk" />
              <ContactItem icon={Clock} label="Работно време" value="Пон — Пет" sub="09:00 — 18:00" />
              <ContactItem icon={MapPin} label="Студио" value="ул. Питу Гули 40" sub="1000 Скопје" />
            </div>
          </div>

          {/* Right — form */}
          <div>
            {state === "success" ? (
              <div className="flex h-full flex-col items-start justify-center">
                <div className="mb-4 h-px w-12 bg-foreground/40" />
                <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                  Пораката е<br />испратена.
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-foreground/60">
                  Ви благодариме на интересот. Ќе ви одговориме во најкраток можен рок.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-10 text-xs uppercase tracking-[0.25em] text-foreground/50 transition-colors hover:text-foreground"
                >
                  Испрати нова порака
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Ime" name="name" required placeholder="Вашето име" />
                  <Field label="Презиме" name="surname" placeholder="Вашето презиме" />
                </div>
                <Field label="Електронска пошта" name="email" type="email" required placeholder="ime@primer.mk" />
                <Field label="Телефон" name="phone" type="tel" placeholder="+389 70 000 000" />
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-foreground/50">
                    Порака <span className="text-foreground/30">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Опишете го вашиот проект или прашање..."
                    className="w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-colors focus:border-foreground/60"
                  />
                </div>

                {state === "error" && (
                  <p className="text-xs text-red-600">
                    Настана грешка. Обидете се повторно или контактирајте нè директно.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] text-background transition-all hover:bg-background hover:text-foreground disabled:opacity-50"
                >
                  {state === "submitting" ? "Се испраќа..." : "Испрати порака"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer bar */}
        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-foreground/20 pt-10 text-xs uppercase tracking-[0.2em] text-foreground/40 md:flex-row md:items-center">
          <div>STUDIO 2000 — Архитектонско Студио</div>
          <div>© {new Date().getFullYear()} Сите права задржани.</div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label, name, type = "text", required, placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.2em] text-foreground/50">
        {label} {required && <span className="text-foreground/30">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border-b border-foreground/20 bg-transparent py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-colors focus:border-foreground/60"
      />
    </div>
  )
}

function ContactItem({
  icon: Icon, label, value, sub, href,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  value: string
  sub?: string
  href?: string
}) {
  const content = (
    <>
      <Icon className="mb-4 h-4 w-4 text-foreground/40" aria-hidden={true} />
      <div className="text-xs uppercase tracking-[0.2em] text-foreground/40">{label}</div>
      <div className="mt-2 font-serif text-xl">{value}</div>
      {sub && <div className="mt-1 text-sm text-foreground/50">{sub}</div>}
    </>
  )

  if (href) return <a href={href} className="block transition-opacity hover:opacity-70">{content}</a>
  return <div>{content}</div>
}
