"use client";

// The rest of the homepage, one section after another (in the order they
// appear on the page). The text for all of them comes from siteContent.ts.
//
//   WhyKoreanHub ... four reason cards
//   LessonsPreview . individual + group lesson cards
//   TeacherPreview . teacher photo and short bio
//   HowItWorks ..... numbered steps
//   Testimonials ... student quotes
//   FAQSection ..... expandable questions

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, MessagesSquare, Plus, Sparkles, UserRound, type LucideIcon } from "lucide-react";
import { ButtonLink, Reveal, SectionTitle } from "@/components/ui";
import { LessonCard } from "@/components/LessonCard";
import { getPrimaryTeacher, siteContent } from "@/siteContent";

type Testimonial = (typeof siteContent.testimonials)[number];
type FaqItem = (typeof siteContent.faq)[number];

const ICONS: Record<string, LucideIcon> = {
  teacher: UserRound,
  schedule: CalendarCheck,
  speaking: MessagesSquare,
  simple: Sparkles,
};

export function WhyKoreanHub() {
  const { title, description, reasons } = siteContent.homepage.whyKoreanHub;

  return (
    <section className="border-b border-ink/10 py-24 sm:py-32">
      <div className="container-hub">
        <SectionTitle title={title} description={description} />

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = ICONS[reason.icon] ?? Sparkles;
            return (
              <Reveal key={reason.title} delay={index * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="h-full bg-porcelain p-8"
                >
                  <Icon className="h-6 w-6 text-celadon-600" aria-hidden="true" />
                  <h3 className="mt-5 font-medium">{reason.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{reason.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LessonsPreview() {
  return (
    <section className="border-b border-ink/10 bg-porcelain-dim py-24 sm:py-32">
      <div className="container-hub">
        <SectionTitle
          title="Two ways to learn"
          description="Both are live, online, one hour, twice a week — the difference is who's in the room."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {siteContent.lessons.map((lesson, index) => (
            <Reveal key={lesson.id} delay={index * 0.1}>
              <LessonCard lesson={lesson} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeacherPreview() {
  const teacher = getPrimaryTeacher();

  return (
    <section className="border-b border-ink/10 py-24 sm:py-32">
      <div className="container-hub grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-celadon-100">
            <Image
              src={teacher.photo}
              alt={`Portrait of ${teacher.name}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-medium text-celadon-700">Your teacher</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
            {teacher.name}
          </h2>
          <p className="mt-1 text-ink/60">{teacher.role}</p>
          <p className="mt-6 max-w-prose text-lg text-ink/80">{teacher.shortBio}</p>
          <div className="mt-8">
            <ButtonLink href="/teacher" variant="secondary">
              Meet {teacher.name}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = siteContent.homepage.howItWorks;

  return (
    <section id="how-it-works" className="border-b border-ink/10 bg-celadon-900 py-24 text-porcelain sm:py-32">
      <div className="container-hub">
        <SectionTitle
          className="[&_p]:text-porcelain/70"
          title="How it works"
          description="Registering takes a couple of minutes. Your actual lesson time is agreed with you personally, not assigned by an algorithm."
        />

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-5 sm:gap-4">
          <motion.div
            className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-porcelain/20 sm:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <li className="relative">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ochre-400 font-display text-sm text-ink">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-porcelain/70">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-md border border-ink/10 bg-porcelain p-8">
      <blockquote className="text-lg leading-relaxed text-ink/80">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-medium text-ink">{testimonial.name}</span>
        <span className="text-ink/50"> · {testimonial.level}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="border-b border-ink/10 bg-porcelain-dim py-24 sm:py-32">
      <div className="container-hub">
        <SectionTitle title="What students say" />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {siteContent.testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.08} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-lg font-medium">{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink/20"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-5 text-ink/70">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-hub max-w-3xl">
        <SectionTitle title="Frequently asked questions" />
        <Reveal className="mt-12">
          <FAQAccordion items={siteContent.faq} />
        </Reveal>
      </div>
    </section>
  );
}
