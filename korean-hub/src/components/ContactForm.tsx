"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { contactSchema } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof values;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-md border border-celadon-300 bg-celadon-50 p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-celadon-700" aria-hidden="true" />
        <div>
          <p className="font-medium text-celadon-900">Message sent</p>
          <p className="mt-1 text-sm text-celadon-700">
            Thanks for reaching out — Korean Hub will get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="mt-1.5 w-full rounded border border-ink/20 bg-porcelain px-4 py-2.5 text-sm"
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-sm text-dancheong-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="mt-1.5 w-full rounded border border-ink/20 bg-porcelain px-4 py-2.5 text-sm"
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1 text-sm text-dancheong-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="mt-1.5 w-full resize-none rounded border border-ink/20 bg-porcelain px-4 py-2.5 text-sm"
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-sm text-dancheong-500">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-dancheong-500">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded bg-ink px-6 py-3 text-sm font-medium text-porcelain transition-colors hover:bg-celadon-700 disabled:opacity-50"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Send message
      </button>
    </form>
  );
}
