import type { Metadata } from "next";
import { siteContent } from "@/siteContent";
import { CTASection, Reveal, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Students",
  description: "Who Korean Hub lessons are for, how online lessons work, and what to expect after you register.",
};

const SECTIONS = [
  {
    title: "Who these classes are for",
    body: "Korean Hub is for adult learners who want real conversation practice with a dedicated teacher — whether you're starting from zero or already hold conversations and want to go further. There's no age cutoff or entry test; the teacher will help place you at the right level after registration.",
  },
  {
    title: "How lessons work",
    body: "Lessons are live and online, one hour long, twice a week, for both the individual and group formats. You'll join by video call at the time agreed with your teacher — no pre-recorded videos, no self-paced modules to work through alone.",
  },
  {
    title: "What to expect",
    body: "Expect a conversational, teacher-led class rather than a rigid curriculum. Your teacher will adapt pace and material to your level and goals, whether that's everyday conversation, travel, exam preparation, or something more specific.",
  },
  {
    title: "How online lessons happen",
    body: "You'll need a stable internet connection and a device with a camera and microphone. Your teacher will share the video call link and any materials directly with you once your schedule is confirmed.",
  },
  {
    title: "The registration process",
    body: "Registration happens directly on this website — choose a lesson type and fill in a short form with your details and goals. It's a request, not an instant booking, and there's no account to create or password to remember.",
  },
  {
    title: "Schedule confirmation",
    body: `After you register, ${siteContent.brand.name} will contact you directly — by email or phone — to talk through your goals and agree on the specific days and times for your lessons. This step is handled personally, not automatically.`,
  },
  {
    title: "What happens after you register",
    body: "You'll see a confirmation on-screen once your request has been received, and Korean Hub will reach out shortly after. There's no dashboard to check or account to log into — everything from here happens by direct contact.",
  },
];

export default function ForStudentsPage() {
  return (
    <>
      <section className="border-b border-ink/10 py-20 sm:py-28">
        <div className="container-hub">
          <SectionTitle
            title="For students"
            description="Everything you need to know before you register — no account required."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hub grid gap-12 sm:grid-cols-2">
          {SECTIONS.map((section, index) => (
            <Reveal key={section.title} delay={(index % 2) * 0.1}>
              <h2 className="font-display text-2xl">{section.title}</h2>
              <p className="mt-3 max-w-prose text-ink/70">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection headline="Ready to begin?" ctaLabel="Request a lesson" ctaHref="/book" />
    </>
  );
}
