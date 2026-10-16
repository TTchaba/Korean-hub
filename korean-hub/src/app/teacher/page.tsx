import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Languages, Sparkles } from "lucide-react";
import { getPrimaryTeacher } from "@/siteContent";
import { CTASection, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your Teacher",
  description: "Meet the teacher behind Korean Hub — background, qualifications, and teaching approach.",
};

export default function TeacherPage() {
  const teacher = getPrimaryTeacher();

  return (
    <>
      <section className="border-b border-ink/10 py-20 sm:py-28">
        <div className="container-hub grid items-start gap-12 lg:grid-cols-[0.7fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-celadon-100">
              <Image
                src={teacher.photo}
                alt={`Portrait of ${teacher.name}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 90vw"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm font-medium text-celadon-700">Founder & teacher</p>
            <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
              {teacher.name}
            </h1>
            <p className="mt-2 text-ink/60">{teacher.role}</p>

            <div className="mt-8 space-y-5">
              {teacher.fullBio.map((paragraph, index) => (
                <p key={index} className="max-w-prose text-lg text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              <div>
                <dt className="flex items-center gap-2 text-sm text-ink/50">
                  <Sparkles className="h-4 w-4" aria-hidden="true" /> Experience
                </dt>
                <dd className="mt-1 font-display text-2xl">
                  {teacher.experienceYears > 0 ? `${teacher.experienceYears}+ years` : "[EXPERIENCE]"}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm text-ink/50">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" /> Qualifications
                </dt>
                <dd className="mt-1 space-y-0.5 text-sm">
                  {teacher.qualifications.map((q) => (
                    <p key={q}>{q}</p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm text-ink/50">
                  <Languages className="h-4 w-4" aria-hidden="true" /> Languages
                </dt>
                <dd className="mt-1 text-sm">{teacher.languagesSpoken.join(", ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-celadon-900 py-20 text-porcelain sm:py-28">
        <div className="container-hub max-w-2xl">
          <Reveal>
            <p className="text-sm font-medium text-ochre-300">Teaching philosophy</p>
            <p className="mt-4 font-display text-3xl leading-snug sm:text-4xl">
              {teacher.teachingPhilosophy}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        headline={`Learn Korean with ${teacher.name}`}
        ctaLabel="Request a lesson"
        ctaHref="/book"
      />
    </>
  );
}
