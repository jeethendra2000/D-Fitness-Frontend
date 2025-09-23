import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ClientRedirect from "@/components/utilityComponents/ClientRedirect";

const BACKEND = process.env.NEXT_PUBLIC_API_BASE;
const INTERNAL_SECRET = process.env.INTERNAL_SECRET;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return <ClientRedirect to="/auth/login" message="No session, redirecting to login page" />;

  try {
    const resp = await fetch(`${BACKEND}/auth/verify-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session}`,
      },
    });

    if (!resp.ok) return <ClientRedirect to="/auth/login" message="Session Invalid, redirecting to login page" />;
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
    return <ClientRedirect to="/auth/login" message="Error verifying session, redirecting..." />;
  }
}