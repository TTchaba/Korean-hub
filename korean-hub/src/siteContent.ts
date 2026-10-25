/**
 * ALL EDITABLE WEBSITE CONTENT LIVES IN THIS FILE.
 *
 *   site / brand ........ name, URL, short description
 *   navigation .......... menu links and the "Register Now" button label
 *   teachers ............ teacher name, photo, bio, qualifications
 *   lessons ............. lesson titles, descriptions and PRICES
 *   koreanLevels ........ options in the "Korean level" dropdown
 *   contact / socialMedia  email, phone, social links
 *   faq / testimonials .. FAQ answers and student quotes
 *   homepage ............ hero text, "why" cards, "how it works" steps
 *   booking ............. day/time options, Google Form fallback
 *   seo ................. page title and description for search engines
 *
 * Prices are informational only — the website takes no payments.
 * A price of 0 is shown on the site as "[PRICE]".
 * Anything written like [THIS] is a placeholder waiting for real content.
 */

export const siteContent = {
  site: {
    name: "Korean Hub",
    tagline: "Learn Korean with a real teacher, not an app.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    // Shown in the footer. Replace with the registered business name.
    legalName: "[LEGAL BUSINESS NAME]",
  },

  brand: {
    name: "Korean Hub",
    logoText: "한국허브",
    description:
      "A focused, one-teacher Korean language studio offering live online individual and group lessons.",
  },

  navigation: {
    links: [
      { href: "/", label: "მთავარი" },
      { href: "/lessons", label: "Lessons" },
      { href: "/teacher", label: "Teacher" },
      { href: "/for-students", label: "For Students" },
      { href: "/contact", label: "Contact" },
    ],
    ctaLabel: "Register Now",
  },

  // A list so more teachers can be added later. For now the site shows
  // the FIRST teacher only.
  teachers: [
    {
      id: "teacher-1",
      name: "[TEACHER NAME]",
      role: "Founder & Korean Language Teacher",
      photo: "/images/teacher-placeholder.svg",
      shortBio: "[SHORT TEACHER BIO — one or two sentences for cards and previews.]",
      fullBio: [
        "[TEACHER FULL BIOGRAPHY PARAGRAPH ONE. Replace with the teacher's real background, how they started teaching Korean, and what they care about in the classroom.]",
        "[TEACHER FULL BIOGRAPHY PARAGRAPH TWO. Replace with more detail on teaching style, experience with different levels, or specialisation such as exam prep, conversation, or business Korean.]",
      ],
      experienceYears: 0,
      qualifications: ["[QUALIFICATION 1]", "[QUALIFICATION 2]", "[QUALIFICATION 3]"],
      teachingPhilosophy:
        "[TEACHING PHILOSOPHY — a short paragraph on how lessons are structured and what students can expect.]",
      languagesSpoken: ["Korean", "English"],
    },
  ],

  // `price` is shown for information only. 0 displays as "[PRICE]".
  lessons: [
    {
      id: "individual",
      title: "Individual Korean",
      shortDescription: "One-on-one lessons tailored to your pace and goals.",
      description:
        "[LESSON DESCRIPTION — replace with real detail about what an individual lesson covers, materials used, and who it suits.]",
      duration: "1 hour",
      frequency: "2 times per week",
      price: 0,
      currency: "GEL",
      whatsIncluded: [
        "[INCLUSION 1 — e.g. personalised lesson plan]",
        "[INCLUSION 2 — e.g. learning materials]",
        "[INCLUSION 3 — e.g. homework and feedback]",
      ],
      isGroup: false,
    },
    {
      id: "group",
      title: "Group Korean",
      shortDescription: "Learn alongside a small group at a similar level.",
      description:
        "[LESSON DESCRIPTION — replace with real detail about group size, level matching, and lesson style.]",
      duration: "1 hour",
      frequency: "2 times per week",
      price: 0,
      currency: "GEL",
      whatsIncluded: [
        "[INCLUSION 1 — e.g. small group, max N students]",
        "[INCLUSION 2 — e.g. shared learning materials]",
        "[INCLUSION 3 — e.g. speaking practice with peers]",
      ],
      isGroup: true,
    },
  ],

  koreanLevels: [
    { id: "beginner", label: "Beginner — just starting out" },
    { id: "elementary", label: "Elementary — know the basics" },
    { id: "intermediate", label: "Intermediate — can hold conversations" },
    { id: "advanced", label: "Advanced — refining fluency" },
    { id: "unsure", label: "Not sure — I'd like guidance" },
  ],

  contact: {
    email: "[EMAIL]",
    phone: "[PHONE]",
    // Shown on the thank-you screen after someone registers.
    responseWindow: "within 1–2 business days",
  },

  socialMedia: {
    instagram: "[INSTAGRAM URL]",
    facebook: "[FACEBOOK URL]",
  },

  faq: [
    {
      id: "faq-1",
      question: "Do I need to create an account to register?",
      answer:
        "No. You choose a lesson, fill in a short registration form, and send it — there's no account or password to manage.",
    },
    {
      id: "faq-2",
      question: "When will my lesson schedule be confirmed?",
      answer:
        "Registering sends a request. Korean Hub will contact you directly by email or phone to agree on a schedule that works for you. This isn't automated — a real person confirms it with you.",
    },
    {
      id: "faq-3",
      question: "Is anything paid on this website?",
      answer:
        "No. This website doesn't take any payment. Registering only sends your details so Korean Hub can get in touch with you.",
    },
    {
      id: "faq-4",
      question: "Can I switch between individual and group lessons later?",
      answer:
        "Yes — just get in touch and Korean Hub will help you move to the option that fits you best going forward.",
    },
    {
      id: "faq-5",
      question: "[FAQ QUESTION PLACEHOLDER]",
      answer: "[FAQ ANSWER PLACEHOLDER]",
    },
  ],

  testimonials: [
    {
      id: "t1",
      name: "[STUDENT NAME]",
      level: "Beginner",
      quote: "[PLACEHOLDER TESTIMONIAL — replace with a real student quote once available.]",
    },
    {
      id: "t2",
      name: "[STUDENT NAME]",
      level: "Intermediate",
      quote: "[PLACEHOLDER TESTIMONIAL — replace with a real student quote once available.]",
    },
    {
      id: "t3",
      name: "[STUDENT NAME]",
      level: "Group student",
      quote: "[PLACEHOLDER TESTIMONIAL — replace with a real student quote once available.]",
    },
  ],

  homepage: {
    heroHeadline: "Korean, taught properly.",
    heroSubheadline:
      "Live online lessons with a dedicated teacher — individual or small group, twice a week, built around how you actually learn.",
    heroPrimaryCta: "Request a lesson",
    heroSecondaryCta: "See how it works",
    finalCtaHeadline: "Ready to start learning Korean?",
    finalCtaDescription: "Send your registration — Korean Hub will get in touch to arrange the details.",
    finalCtaLabel: "Register now",

    whyKoreanHub: {
      title: "Why learn with Korean Hub",
      description: "A small, focused studio — built around real conversation, not a course library.",
      reasons: [
        {
          icon: "teacher",
          title: "One dedicated teacher",
          description: "No rotating instructors — you build a real teaching relationship over time.",
        },
        {
          icon: "schedule",
          title: "A schedule that fits you",
          description: "Your lesson times are agreed personally with you, not assigned by a system.",
        },
        {
          icon: "speaking",
          title: "Built around speaking",
          description: "Lessons are live and conversational, not pre-recorded videos to watch alone.",
        },
        {
          icon: "simple",
          title: "Simple to start",
          description: "Fill in one short form — no account and no password to manage.",
        },
      ],
    },

    howItWorks: [
      { title: "Choose your lesson", description: "Pick individual or group Korean." },
      { title: "Register", description: "Tell us a little about you and your goals." },
      { title: "We get in touch", description: "Korean Hub contacts you by phone or email." },
      { title: "Confirm your schedule", description: "Agree lesson days and times together." },
      { title: "Start learning", description: "Begin your live online lessons." },
    ],
  },

  booking: {
    // The native registration form is the normal flow. Only if you set
    // useGoogleForm to true AND fill in googleFormUrl will /book send
    // visitors to that Google Form instead.
    useGoogleForm: false,
    googleFormUrl: "",

    // Options in the "preferred days" and "preferred time" part of the form.
    days: [
      { id: "mon", label: "Mon" },
      { id: "tue", label: "Tue" },
      { id: "wed", label: "Wed" },
      { id: "thu", label: "Thu" },
      { id: "fri", label: "Fri" },
      { id: "sat", label: "Sat" },
      { id: "sun", label: "Sun" },
    ],
    timeSlots: [
      { id: "morning", label: "Morning" },
      { id: "afternoon", label: "Afternoon" },
      { id: "evening", label: "Evening" },
    ],
    // Small note shown under the schedule options.
    scheduleNote:
      "These are only your preferences — Korean Hub will contact you to agree the final lesson times.",
  },

  seo: {
    defaultTitle: "Korean Hub — Learn Korean Online",
    titleTemplate: "%s | Korean Hub",
    defaultDescription:
      "Korean Hub offers live online individual and group Korean lessons with a dedicated teacher. Register online — your schedule is confirmed personally.",
    ogImage: "/images/og-default.svg",
  },
};


// ── Helpers (no need to edit below this line) ───────────────────────

export type Lesson = (typeof siteContent.lessons)[number];

/** The teacher shown on the site (the first one in the list). */
export function getPrimaryTeacher() {
  const teacher = siteContent.teachers[0];
  if (!teacher) throw new Error("siteContent.teachers must contain at least one teacher.");
  return teacher;
}

/** Finds a lesson by its id, e.g. "individual". Returns undefined if not found. */
export function findLessonById(lessonId: string): Lesson | undefined {
  return siteContent.lessons.find((lesson) => lesson.id === lessonId);
}
