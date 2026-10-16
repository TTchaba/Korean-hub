import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Connects to Firestore using the private service-account keys from
 * .env.local. SERVER ONLY: import this file from src/app/api/* routes,
 * never from a component, or the secrets could leak to the browser.
 */
export function getDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY (see .env.example)."
    );
  }

  const app =
    getApps()[0] ??
    initializeApp({
      // .env files store line breaks as the two characters \n — turn them back.
      credential: cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") }),
    });

  return getFirestore(app);
}
