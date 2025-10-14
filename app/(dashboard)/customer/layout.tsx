import { cookies } from "next/headers";
import React from "react";
import ClientRedirect from "@/components/utilityComponents/ClientRedirect";
import RoleHeader from "@/components/layoutComponents/RoleHeader"

const BACKEND = process.env.NEXT_PUBLIC_API_BASE;

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session)
    return (
      <ClientRedirect
        to="/auth/login"
        message="No session, redirecting to login page"
      />
    );

  try {
    const resp = await fetch(`${BACKEND}/auth/verify-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      cache: "no-store",
    });

    if (!resp.ok)
      return (
        <ClientRedirect
          to="/auth/login"
          message="Session invalid, redirecting..."
        />
      );

    const body = await resp.json().catch(() => ({}));
    const role = body?.role || "customer";

    // return <>{children}</>
    return (
      <>
        <RoleHeader role={role} />
        <main>{children}</main>
      </>
    );
  } catch (err) {
    console.error("[dashboard/layout] verify-session failed:", err);
    return (
      <ClientRedirect
        to="/auth/login"
        message="Error verifying session, redirecting..."
      />
    );
  }
}