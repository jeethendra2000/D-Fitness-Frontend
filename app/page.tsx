import Image from "next/image";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/herosection";

export const metadata: Metadata = {
  title: "Home Page",
  description: "D-Fitness Home Page",
};

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
