"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/utilityComponents/Loader";

export default function LogoutButton() {
  const router = useRouter();
  const backendURL = process.env.NEXT_PUBLIC_API_BASE;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  async function handleLogout() {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      await signOut(auth);
      await fetch(`${backendURL}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});

      await new Promise((r) => setTimeout(r, 80));

      toast.success("Logged Out", { autoClose: 2500 });
      router.replace("/");
    } catch (e: unknown) {
      console.error("Error during logout:", e);

      let errorMessage = "Logout Failed";
      if (e instanceof Error) {
        errorMessage = e.message;
      }

      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader message="Signing you out..." dimBackground={true} />}
      <button
        onClick={handleLogout}
        style={{
          background: "#ff1313",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: 4,
          cursor: loading ? "default" : "pointer",
          fontSize: 14,
          marginLeft: 12,
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Signing out..." : "Logout"}
      </button>
    </>
  );
}
