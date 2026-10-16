import type { Metadata } from "next";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteContent } from "@/siteContent";
import { Reveal, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Korean Hub by email, phone, or social media.",
};

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-hub grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionTitle
            title="Get in touch"
            description="Questions before you book? Reach out any time — a real person will get back to you."
          />

          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-celadon-600" aria-hidden="true" />
              <a href={`mailto:${siteContent.contact.email}`} className="hover:text-celadon-700">
                {siteContent.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-celadon-600" aria-hidden="true" />
              <a href={`tel:${siteContent.contact.phone}`} className="hover:text-celadon-700">
                {siteContent.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-celadon-600" aria-hidden="true" />
              <a href={siteContent.socialMedia.instagram} className="hover:text-celadon-700">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Facebook className="h-4 w-4 text-celadon-600" aria-hidden="true" />
              <a href={siteContent.socialMedia.facebook} className="hover:text-celadon-700">
                Facebook
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
