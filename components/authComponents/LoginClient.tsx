"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, microsoftProvider } from "@/firebase";

import MyPassField from "@/components/authComponents/passField";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "@/components/utilityComponents/Loader";


export default function LoginClient() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [redirecting, setRedirecting] = useState(false); 
    const backendURL = process.env.NEXT_PUBLIC_API_BASE;
    
    async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(loading) return; // Prevent multiple clicks
        if (loading || redirecting) return;
        setLoading(true);
        try{
            const form = e.currentTarget;
            const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
            const password = (form.elements.namedItem("password") as HTMLInputElement)?.value || "";
            
            // Firebase Sign In
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCred.user.getIdToken();

            // Send token to backend login endpoint. Include remember flag if you want session cookie
            const resp = await fetch(`${backendURL}/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "tokenId": idToken, "remember": true }),
                credentials: "include", // Allow cookies (session cookie) if backend sets it
            });

            if(!resp.ok) {
                const body = await resp.json().catch(() => ({}));
                throw new Error(body.detail || body.error|| "Login failed on backend");
            }

            const data = await resp.json();
            console.log("Data: ",data);
            const role = data?.customClaims?.role || "customer";
            toast.success("Login successful!", { autoClose: 1500 });

            // Show full-screen loader while navigating
            setRedirecting(true);

            // Allow cookie write to settle
            await new Promise(r => setTimeout(r, 100));

            const target =
              role === "admin"
                ? "/dashboard/admin"
                : role === "trainer"
                ? "/dashboard/trainer"
                : "/dashboard/customer";

            router.replace(target);

        }catch(err:any){
            console.log('Error: ',err);
            toast.error(err.message || "Login failed", { autoClose: 3000 });
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            {redirecting && <Loader message="Loading your dashboard..." dimBackground={true} />}
            <form onSubmit={handleLoginSubmit} aria-disabled={loading || redirecting}>
                <input type="text" placeholder="Email" name="email" disabled={loading || redirecting} />
                <MyPassField label="Password" name="password" />
                <div className="flex justify-between mb-5">
                <p>Don't have an account? <a href="/auth/signup" style={{ color: "#ff1313" }}>Register</a></p>
                <p><Link href="/forgot-password" style={{ color: "#ff1313" }}>Forgot Password</Link></p>
                </div>
                <button type="submit" disabled={loading || redirecting}>{ loading ? <CircularProgress style={{color: "#fff", fontSize: 10 }} /> : redirecting ? "Redirecting..." : "Login"}</button>
            </form>
        </>
    );
}
