import type { Metadata } from "next";
import HeroSection from "@/components/sections/herosection";
import WhyChooseUS from "@/components/sections/whychooseus";
import GetInTouch from "@/components/homeComponents/getintouch";
import AdBanner from "@/components/homeComponents/adbanner";
import Packages from "@/components/homeComponents/packages";
import Team from "@/components/homeComponents/team";
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
      <Packages />
      <Team />
      <GetInTouch />
    </>
  );
}
