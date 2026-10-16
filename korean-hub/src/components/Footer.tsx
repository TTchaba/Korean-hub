import Link from "next/link";
import { siteContent } from "@/siteContent";

export function Footer() {
  const { brand, contact, socialMedia, navigation, site } = siteContent;

  return (
    <footer className="border-t border-ink/10 bg-porcelain-dim">
      <div className="container-hub grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg">{brand.name}</p>
          <p className="mt-3 max-w-[26ch] text-sm text-ink/70">{brand.description}</p>
        </div>

        <nav aria-label="Site">
          <p className="text-sm font-medium text-ink/50">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navigation.links
              .filter((link) => link.href !== "/" && link.href !== "/contact")
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-celadon-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/book" className="hover:text-celadon-700">
                {navigation.ctaLabel}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium text-ink/50">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-ink/50">Follow</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={socialMedia.instagram} className="hover:text-celadon-700">
                Instagram
              </a>
            </li>
            <li>
              <a href={socialMedia.facebook} className="hover:text-celadon-700">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="brush-divider" />

      <div className="container-hub flex flex-col gap-2 py-6 text-xs text-ink/50 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <p>Registration is a request — your schedule is confirmed personally.</p>
      </div>
    </footer>
  );
}
