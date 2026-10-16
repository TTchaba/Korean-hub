"use client";

// Small building blocks used all over the site:
//   Button / ButtonLink ... buttons (ButtonLink is a button that navigates)
//   SectionTitle .......... heading + intro text at the top of a section
//   Reveal ................ fades content in as you scroll down
//   CTASection ............ the dark "call to action" band at the bottom of pages
//   ErrorState ............ friendly message screen (404, errors)

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Buttons ──────────────────────────────────────────────────────────

type Variant = "primary" | "secondary";

function buttonClasses(variant: Variant, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-medium transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary"
      ? "bg-ink text-porcelain hover:bg-celadon-700"
      : "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5",
    className
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

// ── Section heading ──────────────────────────────────────────────────

export function SectionTitle({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-ink/70">{description}</p>}
    </div>
  );
}

// ── Scroll reveal ────────────────────────────────────────────────────

/** Fades and lifts its content into view once, when it scrolls onto the screen. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Call-to-action band ──────────────────────────────────────────────

export function CTASection({
  headline,
  description,
  ctaLabel,
  ctaHref,
}: {
  headline: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-ink py-24 text-porcelain sm:py-28">
      <div className="container-hub text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
            {headline}
          </h2>
          {description && <p className="mx-auto mt-4 max-w-lg text-porcelain/70">{description}</p>}
          <div className="mt-10">
            <ButtonLink href={ctaHref} className="bg-porcelain text-ink hover:bg-ochre-400">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Error / message screen ───────────────────────────────────────────

export function ErrorState({
  title,
  description,
  actionLabel = "Back to homepage",
  actionHref = "/",
}: {
  title: string;
  description: ReactNode;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-hub mx-auto max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dancheong-500/10">
          <XCircle className="h-8 w-8 text-dancheong-500" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-3xl">{title}</h1>
        <p className="mt-3 text-ink/70">{description}</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href={actionHref}>{actionLabel}</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
