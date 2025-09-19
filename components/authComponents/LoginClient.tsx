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


export default function LoginClient() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const backendURL = process.env.NEXT_PUBLIC_API_BASE;
    
    async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try{
            const form = e.currentTarget;
            const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
            const password = (form.elements.namedItem("password") as HTMLInputElement)?.value || "";
            
            // Firebase Sign In
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCred.user.getIdToken();

            // Send token to backend login endpoint. Include remember flag if you want session cookie
            const resp = await fetch(`${backendURL}/api/auth/login/`, {
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
            toast.success("Login successful!", { autoClose: 2000 });

            // Route by role (server middleware also enforces)
            if (role === "admin") router.push("/dashboard/admin");
            else if (role === "trainer") router.push("/dashboard/trainer");
            else router.push("/dashboard/customer");

        }catch(err:any){
            console.log('Error: ',err);
            toast.error(err.message || "Login failed", { autoClose: 3000 });
        }finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLoginSubmit}>
            <input type="text" placeholder="Email" name="email" />
            <MyPassField label="Password" name="password" />
            <div className="flex justify-between mb-5">
            <p>Don't have an account? <a href="/auth/signup" style={{ color: "#ff1313" }}>Register</a></p>
            <p><Link href="/forgot-password" style={{ color: "#ff1313" }}>Forgot Password</Link></p>
            </div>
            <button type="submit">{ loading ? <CircularProgress /> : "Login"}</button>
        </form>
    );
}
