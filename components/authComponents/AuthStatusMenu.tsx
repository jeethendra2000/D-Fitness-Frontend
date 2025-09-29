"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

export default function AuthStatusMenu() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setInitialized(true);
        });
        return () => unsub();
    }, []);

    if(!initialized){
        return <span style={{ fontSize: 12, opacity: 0.7 }}>...</span>;
    }

    if(!user){
        return (
            <button 
                onClick={() => router.push("/auth/login")} 
                style={{
                        background: "#36f8ff",
                        color: "#111",
                        padding: "6px 14px",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 14,
                        marginLeft: 12,
                    }}
                >Login</button>
        );
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <LogoutButton />
        </div>
    );
}