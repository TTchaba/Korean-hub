"use client";

// Top navigation bar: desktop links + the animated full-screen mobile menu.
// The links and button label are edited in siteContent.ts → navigation.

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/siteContent";
import { cn } from "@/lib/utils";

const { links, ctaLabel } = siteContent.navigation;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-porcelain/90 backdrop-blur">
      <div className="container-hub flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="font-display text-lg font-medium tracking-tight sm:text-xl">
          {siteContent.brand.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-celadon-700",
                  isActive ? "font-medium text-ink" : "text-ink/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/book"
          className="hidden rounded bg-ink px-5 py-2.5 text-sm font-medium text-porcelain transition-colors hover:bg-celadon-700 md:block"
        >
          {ctaLabel}
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded text-ink md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu: a dark panel that opens like an ink circle from the top-right corner. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ink text-porcelain md:hidden"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "circle(150% at 100% 0%)" }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: reduceMotion ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container-hub flex h-16 items-center justify-end sm:h-20">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="container-hub flex flex-1 flex-col justify-center gap-2 pb-24">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.02, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-4xl tracking-tight sm:text-5xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : links.length * 0.02, duration: 0.2 }}
                className="mt-6"
              >
                <Link
                  href="/book"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block rounded bg-porcelain px-6 py-3 font-medium text-ink"
                >
                  {ctaLabel}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
