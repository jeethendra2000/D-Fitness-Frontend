import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import NotFound from "@/components/utilityComponents/notFound";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if(!pathname.startsWith("/dashboard")) return NextResponse.next();

    const session = req.cookies.get("session")?.value;
    if(!session) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    try{
        const resp = await fetch(`${BACKEND_URL}/api/auth/verify-session/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session}`,
            },
        });

        if(!resp.ok){
            const url = req.nextUrl.clone();
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }

        const body = await resp.json();
        const role = body?.role || "customer";

        if(pathname === "/dashboard" || pathname === "/dashboard/") {
            const url = req.nextUrl.clone();
            if(role === "admin") url.pathname = "/dashboard/admin";
            else if(role === "trainer") url.pathname = "/dashboard/trainer";
            else url.pathname = "/dashbo(ard/customer";
            return NextResponse.redirect(url);
        }

        if(pathname.startsWith("/dashboard/admin") && role !== "admin") {
            const url = req.nextUrl.clone();
            url.pathname = "/404";
            return NextResponse.redirect(url);
        }

        if(pathname.startsWith("/dashboard/trainer") && role !== "trainer") {
            const url = req.nextUrl.clone();
            url.pathname = "/404";
            return NextResponse.redirect(url);
        }

        if(pathname.startsWith("/dashboard/customer") && role !== "customer") {
            const url = req.nextUrl.clone();
            url.pathname = "/404";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }catch (err){
        console.error("Middleware verify-session error: ", err);
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }
}

export const config = { matcher: ["/dashboard/:path*"] };