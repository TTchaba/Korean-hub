import { CTASection } from "@/components/ui";
import { Hero, VocabCards } from "@/components/HomeHero";
import {
  FAQSection,
  HowItWorks,
  LessonsPreview,
  TeacherPreview,
  Testimonials,
  WhyKoreanHub,
} from "@/components/HomeSections";
import { siteContent } from "@/siteContent";

export default function HomePage() {
  const { finalCtaHeadline, finalCtaDescription, finalCtaLabel } = siteContent.homepage;

  return (
    <>
      <Hero />
      <VocabCards />
      <WhyKoreanHub />
      <LessonsPreview />
      <TeacherPreview />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTASection
        headline={finalCtaHeadline}
        description={finalCtaDescription}
        ctaLabel={finalCtaLabel}
        ctaHref="/book"
      />
    </>
  );
}
