import { NextResponse } from "next/server";
import admin from "@/firebaseAdmin";

export const runtime = "nodejs";


export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { idToken } = body as { idToken?: string };
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days (ms)
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const secure = process.env.NODE_ENV === "production";
    const headers = new Headers();
    const res = NextResponse.json({ ok: true });
    res.cookies.set("session", sessionCookie, {
      maxAge: Math.floor(expiresIn / 1000), // seconds
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure,
    });

    return res;
  } catch (err) {
    console.error("sessionLogin error:", err);
    return NextResponse.json({ error: "Unable to create session cookie" }, { status: 500 });
  }
}