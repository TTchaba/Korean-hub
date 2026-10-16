import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase";
import { contactSchema } from "@/lib/validation";

/** POST /api/contact — saves a contact-form message to the "contactSubmissions" collection. */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 400 });
  }

  try {
    await getDb()
      .collection("contactSubmissions")
      .add({ ...parsed.data, createdAt: FieldValue.serverTimestamp() });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
