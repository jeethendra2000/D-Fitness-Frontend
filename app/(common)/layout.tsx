import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Header from "@/components/layoutComponents/header";
import Footer from "@/components/layoutComponents/footer";
import Loader from "@/components/utilityComponents/Loader";
import Search from "@/components/layoutComponents/search";
import ToastProvider from "@/components/utilityComponents/ToastProvider";
import SiteShell from "@/components/layoutComponents/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D-Fitness",
  description: "D-Fitness Web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
          strategy="afterInteractive"
        /> */}
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/barfiller.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Loader/> */}
        {/* <Header /> */}
        <AppRouterCacheProvider>
          {/* <main>{children}</main> */}
          <SiteShell>{children}</SiteShell>
          <ToastProvider />
        </AppRouterCacheProvider>
        <Search />
        {/* <Footer /> */}

        {/* JS Files */}
        <Script src="/js/jquery-3.3.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script
          src="/js/jquery.magnific-popup.min.js"
          strategy="afterInteractive"
        />
        <Script src="/js/masonry.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.barfiller.js" strategy="afterInteractive" />
        <Script src="/js/jquery.slicknav.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
        {/* <script
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCguol9y5YQ2z0b-MTBsfYpimEcIicd4pY&callback=initMap"
        ></script> */}
      </body>
    </html>
  );
}
