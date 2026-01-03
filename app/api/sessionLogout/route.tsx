import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import admin from "@/firebaseAdmin";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value || "";
  try {
    if (sessionCookie) {
      const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
      await admin.auth().revokeRefreshTokens(decoded.uid);
    }
  } catch (err) {
    // ignore verification errors
  }

  const res = NextResponse.json({ ok: true });
  // Use exactly the same attributes used when creating the cookie.
  res.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    // If you used a domain when setting the cookie, add it here:
    // domain: "localhost"
  });

  return res;
}