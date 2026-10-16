import type { Metadata } from "next";
import { LessonCard } from "@/components/LessonCard";
import { siteContent } from "@/siteContent";
import { CTASection, Reveal, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lessons & Pricing",
  description: "Compare individual and group Korean lessons at Korean Hub, including pricing and what's included.",
};

export default function LessonsPage() {
  return (
    <>
      <section className="border-b border-ink/10 py-20 sm:py-28">
        <div className="container-hub">
          <SectionTitle
            title="Lessons & pricing"
            description="Two formats, one hour, twice a week, fully online. Choose the one that fits how you like to learn."
          />
        </div>
      </section>

      <section className="border-b border-ink/10 bg-porcelain-dim py-20 sm:py-28">
        <div className="container-hub grid gap-6 sm:grid-cols-2">
          {siteContent.lessons.map((lesson, index) => (
            <Reveal key={lesson.id} delay={index * 0.1}>
              <LessonCard lesson={lesson} detailed />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        headline="Not sure which one fits you?"
        description="Send a registration request and Korean Hub will help you choose before your first lesson."
        ctaLabel="Start registration"
        ctaHref="/book"
      />
    </>
  );
}
