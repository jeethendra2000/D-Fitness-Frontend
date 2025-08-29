import Image from "next/image";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/herosection";
import WhyChooseUS from "@/components/sections/whychooseus";
import GetInTouch from "@/components/homeComponents/getintouch";
import Testimonial from "@/components/homeComponents/testimonial";
import AdBanner from "@/components/homeComponents/adbanner";
export const metadata: Metadata = {
  title: "Home Page",
  description: "D-Fitness Home Page",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUS />
      <AdBanner />
      <Testimonial />
      <GetInTouch />
    </>
  );
}
