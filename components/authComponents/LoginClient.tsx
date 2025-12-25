"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // Removed signInWithPopup
import { auth } from "@/firebase"; // Removed googleProvider, microsoftProvider

import MyPassField from "@/components/authComponents/passField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "@/components/utilityComponents/Loader";

export default function LoginClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_API_BASE;

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent multiple clicks
    if (loading || redirecting) return;
    setLoading(true);

    try {
      const form = e.currentTarget;
      const email =
        (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
      const password =
        (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

      // Firebase Sign In
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();

      // Send token to backend login endpoint. Include remember flag if you want session cookie
      const resp = await fetch(`${backendURL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId: idToken, remember: true }),
        credentials: "include", // Allow cookies (session cookie) if backend sets it
      });

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        // Use || to safely check properties, ensuring a string is thrown
        throw new Error(body.detail || body.error || "Login failed on backend");
      }

      const data = await resp.json();
      console.log("Data: ", data);

      // Assuming the role is nested in customClaims
      const role = data?.customClaims?.role || "customer";
      toast.success("Login successful!", { autoClose: 1500 });

      // Show full-screen loader while navigating
      setRedirecting(true);

      // Allow cookie write to settle (Optional: added small delay for robustness)
      await new Promise((r) => setTimeout(r, 100));

      const target =
        role === "admin"
          ? "/admin/dashboard"
          : role === "trainer"
          ? "/trainer/dashboard"
          : "/customer/dashboard";

      router.replace(target);

      // FIX 1: Replaced 'any' with 'unknown' and safely access the message property (Line 69)
    } catch (err: unknown) {
      console.log("Error: ", err);

      let errorMessage = "Login failed";
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {redirecting && (
        <Loader message="Loading your dashboard..." dimBackground={true} />
      )}
      {/* FIX 3: Removed aria-disabled from form. It's now correctly applied to the button/inputs. */}
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          disabled={loading || redirecting}
        />
        <MyPassField label="Password" name="password" />
        <div className="flex justify-between mb-5">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" style={{ color: "#ff1313" }}>
              Register
            </a>
          </p>
          <p>
            <Link href="/auth/forgot-password" style={{ color: "#ff1313" }}>
              Forgot Password
            </Link>
          </p>
        </div>
        <button type="submit" disabled={loading || redirecting}>
          {loading ? (
            <CircularProgress style={{ color: "#fff", fontSize: 10 }} />
          ) : redirecting ? (
            "Redirecting..."
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
