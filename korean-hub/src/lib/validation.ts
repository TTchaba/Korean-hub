import { z } from "zod";
import { siteContent } from "@/siteContent";

// Allowed values come from siteContent.ts, so editing the lists there
// automatically updates what the form (and the server) will accept.
function ids(list: Array<{ id: string }>): [string, ...string[]] {
  return list.map((item) => item.id) as [string, ...string[]];
}

/**
 * Used twice: in the browser for instant feedback, and again on the
 * server in /api/registrations (never trust the browser alone).
 */
export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(80, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .regex(/^[0-9+\s()-]+$/, "Use only numbers, spaces, and + ( ) -."),
  koreanLevel: z.enum(ids(siteContent.koreanLevels), {
    errorMap: () => ({ message: "Select your current Korean level." }),
  }),
  lessonType: z.enum(ids(siteContent.lessons), {
    errorMap: () => ({ message: "Select a lesson type." }),
  }),
  preferredDays: z
    .array(z.enum(ids(siteContent.booking.days)))
    .min(1, "Choose at least one day that could work for you."),
  preferredTime: z.enum(ids(siteContent.booking.timeSlots), {
    errorMap: () => ({ message: "Choose a preferred time of day." }),
  }),
  goals: z.string().trim().max(600, "Keep this under 600 characters.").optional(),
  additionalInfo: z.string().trim().max(600, "Keep this under 600 characters.").optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(10, "Message is too short.").max(2000, "Message is too long."),
});
