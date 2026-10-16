# Korean Hub

Website for Korean Hub (online Korean lessons). Built with Next.js, React, TypeScript,
Tailwind CSS, Framer Motion and Firebase Firestore.

Students send a **registration request** (lesson type, details, preferred days and time of day).
The request is saved as `pending` and the teacher contacts the student by email or phone.
**The website takes no payments.**

## Run it

```bash
npm install
cp .env.example .env.local     # fill in the 3 Firebase values
npm run dev                    # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

The site displays without Firebase keys; only *sending* a form needs them. It
uses local system-font fallbacks, so development does not require access to
Google Fonts.

## Where to edit things

| I want to change… | Edit this |
|---|---|
| Any text, lesson **prices**, teacher info, contact details, social links, FAQ, testimonials, menu links, day/time options, Google Form fallback, SEO | `src/siteContent.ts` |
| Colours, fonts sizes, spacing scale | `tailwind.config.ts` |
| The teacher photo | replace `public/images/teacher-placeholder.svg`, then update `teachers[0].photo` in `siteContent.ts` |
| Who can read/write Firestore | `firestore.rules` |

## Folder map

```
src/
  siteContent.ts          ← ALL editable website content (start here)
  app/                    ← one folder per page; each page.tsx is that page
    page.tsx                  home
    lessons/ teacher/ for-students/ contact/ book/
    api/registrations/        saves a registration to Firestore
    api/contact/              saves a contact message to Firestore
    layout.tsx                fonts, page frame (Header + Footer)
    globals.css               base styles
  components/
    ui.tsx                  buttons, section title, scroll reveal, CTA band, error screen
    Header.tsx / Footer.tsx
    HomeHero.tsx            hero + Korean word flip-cards
    HomeSections.tsx        the other homepage sections
    LessonCard.tsx          lesson card (home + lessons page)
    BookingForm.tsx         the whole registration flow
    ContactForm.tsx
  lib/
    utils.ts                small helpers (class names, price formatting)
    validation.ts           form rules, used by the browser AND the server
    firebase.ts             Firestore connection (server only)
```

## Firestore

Collections: `registrations`, `contactSubmissions`.

A registration has: `fullName, email, phone, koreanLevel, lessonType, lessonTitle,
preferredDays, preferredTime, goals?, additionalInfo?, status, createdAt, updatedAt`.
`status` starts as `pending`; change it by hand in the Firebase console to
`contacted`, `confirmed` or `cancelled`.

Setup: create a Firebase project → enable Firestore → Project settings → Service accounts →
*Generate new private key* → copy the three values into `.env.local`
(`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`; keep the quotes and `\n`).
Publish `firestore.rules` — browsers get no direct database access, only the server writes.

## Deploying

This project contains no deployment configuration of its own (no `firebase.json` or GitHub
workflow). Whichever host you use needs the same three Firebase environment variables, plus
`NEXT_PUBLIC_SITE_URL`. The site uses server API routes, so it cannot be deployed as plain static files.
