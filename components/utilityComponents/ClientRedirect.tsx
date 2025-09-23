"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect({to, message = "Redirecting..."}: { to: string; message?: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(to);
    }, [to, router]);

    return(
        <div style={{ padding: 40, textAlign: "center" }}>
            {message}
        </div>
    );
}