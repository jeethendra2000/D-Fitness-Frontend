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

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


export default function LoginClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [signInWithEmailAndPassword, user, hookLoading, hookError] =
    useSignInWithEmailAndPassword(auth);

  const mapFirebaseError = (err: unknown) => {
    if (!(err instanceof Error)) return "Login failed. Please try again.";
    const msg = err.message || "";
    if (msg.includes("auth/user-not-found")) return "No account found for this email.";
    if (msg.includes("auth/wrong-password")) return "Incorrect password.";
    if (msg.includes("auth/invalid-email")) return "Invalid email address.";
    if (msg.includes("auth/user-disabled")) return "This account has been disabled.";
    return msg;
  };

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading || redirecting) return;
    setLoading(true);

    try {
      const form = e.currentTarget;
      const email =
        (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
      const password =
        (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

      // Firebase Sign In (client)
      const userCred = await signInWithEmailAndPassword(email, password);
      if (!userCred?.user) throw new Error("No user returned from Firebase");

      // Get ID token and create a secure session cookie via server API
      const idToken = await userCred.user.getIdToken();
      const resp = await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!resp.ok) throw new Error("Failed to create server session");

      toast.success("Login successful!", { autoClose: 1500 });

      setRedirecting(true);
      await new Promise((r) => setTimeout(r, 100));
      router.replace("/admin/dashboard");
    } catch (err: unknown) {
      console.log("Error: ", err);
      const msg = mapFirebaseError(err instanceof Error ? err : hookError ?? err);
      toast.error(msg, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {redirecting && (
        <Loader message="Loading your dashboard..." dimBackground={true} />
      )}
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
            <Link href="/forgot-password" style={{ color: "#ff1313" }}>
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