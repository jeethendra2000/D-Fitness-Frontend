import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const BACKEND = process.env.NEXT_PUBLIC_API_BASE;
const INTERNAL_SECRET = process.env.INTERNAL_SECRET;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) redirect("/auth/login");

  try {
    const resp = await fetch(`${BACKEND}/api/auth/verify-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session}`,
      },
    });

    if (!resp.ok) redirect("/auth/login");
    const body = await resp.json();
    const role = body?.role || "customer";

    return (
      <>
        {role === "admin" && <header>Admin header / nav</header>}
        {role === "trainer" && <header>Trainer header / nav</header>}
        {role === "customer" && <header>Customer header / nav</header>}
        <main>{children}</main>
      </>
    );
  } catch (err) {
    console.error("verify-session failed in layout:", err);
    redirect("/auth/login");
  }
}