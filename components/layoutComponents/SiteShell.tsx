"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/layoutComponents/header";
import Footer from "@/components/layoutComponents/footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <>
      {!isDashboard && <Header />}
      <main>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}