"use client";

// The two animated "showpiece" sections at the top of the homepage:
//   Hero ......... big headline with Korean words drifting behind it
//   VocabCards ... flip-cards that reveal what each Korean word means

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Reveal, SectionTitle } from "@/components/ui";
import { siteContent } from "@/siteContent";

// A handful of everyday Korean words that drift behind the headline —
// the "characteristic thing in the subject's world" the hero opens with,
// rather than a generic stock photo or gradient blob.
const DRIFTING_WORDS = [
  { hangul: "안녕", meaning: "hello", top: "12%", left: "6%", delay: 0 },
  { hangul: "감사", meaning: "thanks", top: "68%", left: "10%", delay: 0.6 },
  { hangul: "배우다", meaning: "to learn", top: "22%", left: "82%", delay: 0.3 },
  { hangul: "잘했어", meaning: "well done", top: "78%", left: "78%", delay: 0.9 },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { heroHeadline, heroSubheadline, heroPrimaryCta, heroSecondaryCta } =
    siteContent.homepage;

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-porcelain py-24 sm:py-32">
      {!shouldReduceMotion &&
        DRIFTING_WORDS.map((word) => (
          <motion.span
            key={word.hangul}
            className="pointer-events-none absolute select-none font-display text-2xl text-celadon-300 sm:text-3xl"
            style={{ top: word.top, left: word.left }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [12, 0, 0, -12] }}
            transition={{
              duration: 6,
              delay: word.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            {word.hangul}
            <span className="ml-2 align-middle text-xs font-sans font-normal text-ink/40">
              {word.meaning}
            </span>
          </motion.span>
        ))}

      <div className="container-hub relative">
        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm tracking-wide text-celadon-700"
        >
          {siteContent.brand.logoText} · Korean Hub
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl"
        >
          {heroHeadline}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-ink/70"
        >
          {heroSubheadline}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/book">
            {heroPrimaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="secondary">
            {heroSecondaryCta}
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}

interface VocabCard {
  hangul: string;
  romanization: string;
  meaning: string;
}

const VOCAB: VocabCard[] = [
  { hangul: "사랑", romanization: "sarang", meaning: "love" },
  { hangul: "친구", romanization: "chingu", meaning: "friend" },
  { hangul: "행복", romanization: "haengbok", meaning: "happiness" },
  { hangul: "여행", romanization: "yeohaeng", meaning: "journey" },
  { hangul: "용기", romanization: "yonggi", meaning: "courage" },
  { hangul: "희망", romanization: "huimang", meaning: "hope" },
];

/**
 * A single strong concept: cards that flip from Hangul to meaning on
 * hover/tap, framed as a small daily-vocabulary moment rather than a
 * grid of unrelated effects.
 */
export function VocabCards() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  function toggle(hangul: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(hangul)) next.delete(hangul);
      else next.add(hangul);
      return next;
    });
  }

  return (
    <section className="border-b border-ink/10 bg-celadon-900 py-24 text-porcelain sm:py-32">
      <div className="container-hub">
        <SectionTitle
          className="text-porcelain [&_p]:text-porcelain/70"
          title="One word a day adds up"
          description="Every card below hides its meaning until you look. That's how real vocabulary sticks — a little curiosity, a little repetition."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {VOCAB.map((card, index) => {
            const isFlipped = flipped.has(card.hangul);
            return (
              <Reveal key={card.hangul} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => toggle(card.hangul)}
                  className="group relative h-40 w-full [perspective:800px]"
                  aria-pressed={isFlipped}
                  aria-label={`${card.hangul}, reveal meaning`}
                >
                  <motion.div
                    className="relative h-full w-full rounded-md [transform-style:preserve-3d]"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md border border-porcelain/15 bg-celadon-700 [backface-visibility:hidden]">
                      <span className="font-display text-3xl">{card.hangul}</span>
                      <span className="mt-1 text-xs text-porcelain/60">{card.romanization}</span>
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-md border border-ochre-400/40 bg-ochre-400 text-ink [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="font-display text-xl">{card.meaning}</span>
                    </div>
                  </motion.div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
