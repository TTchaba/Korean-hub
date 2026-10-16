import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase";
import { registrationSchema } from "@/lib/validation";
import { findLessonById } from "@/siteContent";

/**
 * POST /api/registrations
 *
 * Checks the submitted registration request and saves it to the
 * Firestore "registrations" collection with status "pending".
 *
 * status values (change them by hand in the Firebase console):
 *   pending → contacted → confirmed   (or cancelled)
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 400 });
  }
  const data = parsed.data;

  // The lesson title is taken from siteContent.ts, not from the browser.
  const lesson = findLessonById(data.lessonType);
  if (!lesson) {
    return NextResponse.json({ error: "Selected lesson is not available." }, { status: 400 });
  }

  try {
    await getDb()
      .collection("registrations")
      .add({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        koreanLevel: data.koreanLevel,
        lessonType: lesson.id,
        lessonTitle: lesson.title,
        preferredDays: data.preferredDays,
        preferredTime: data.preferredTime,
        // Firestore does not accept undefined, so optional text is only added when filled in.
        ...(data.goals ? { goals: data.goals } : {}),
        ...(data.additionalInfo ? { additionalInfo: data.additionalInfo } : {}),
        status: "pending",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save registration:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
