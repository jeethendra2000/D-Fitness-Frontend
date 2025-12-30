import type { Metadata } from "next";
import HeroSection from "@/components/sections/herosection";
import WhyChooseUS from "@/components/sections/whychooseus";
import GetInTouch from "@/components/homeComponents/getintouch";
import AdBanner from "@/components/homeComponents/adbanner";
import Packages from "@/components/homeComponents/packages";
import Team from "@/components/homeComponents/team";
import Testimonial from "@/components/homeComponents/testimonial";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Page",
  description: "D-Fitness Home Page",
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* <AdBanner /> */}
      <section className="services-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>What we do?</span>
                <h2>PUSH YOUR LIMITS FORWARD</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Service 1 */}
            <div className="col-lg-3 order-lg-1 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-1.jpg"
                  width={200}
                  height={200}
                  alt="Strength training"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-2 col-md-6 p-0">
              <div className="ss-text">
                <h4>Strength training</h4>
                <p>
                  Build power and endurance with our state-of-the-art equipment
                  and structured weight training programs guided by
                  professionals.
                </p>
                {/* <Link href="/services">Explore</Link> */}
              </div>
            </div>

            {/* Service 2 - REPLACED Group Fitness with Diet & Nutrition */}
            <div className="col-lg-3 order-lg-3 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-2.jpg"
                  width={200}
                  height={200}
                  alt="Body building"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-4 col-md-6 p-0">
              <div className="ss-text">
                <h4>Body building</h4>
                <p>
                  Achieve your dream physique with tailored hypertrophy
                  programs, nutrition planning, and progressive training
                  support.
                </p>
                {/* <Link href="/services">Explore</Link> */}
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-lg-3 order-lg-8 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-4.jpg"
                  width={200}
                  height={200}
                  alt="Diet and Nutrition"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-7 col-md-6 p-0">
              <div className="ss-text second-row">
                <h4>Diet & Nutrition plan</h4>
                <p>
                  Fuel your body right with personalized meal plans and
                  nutritional guidance to maximize your workout results and
                  health.
                </p>
                {/* <Link href="/services">Explore</Link> */}
              </div>
            </div>

            {/* Service 4 */}
            <div className="col-lg-3 order-lg-6 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-3.jpg"
                  width={200}
                  height={200}
                  alt="Personal training"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-5 col-md-6 p-0">
              <div className="ss-text second-row">
                <h4>Personal training</h4>
                <p>
                  Get one-on-one sessions with certified trainers who design
                  customized workouts to match your fitness level, goals, and
                  schedule.
                </p>
                {/* <Link href="/services">Explore</Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* */}
      <WhyChooseUS />
      <Packages />
      <Team />
      <Testimonial />
      <GetInTouch />
    </>
  );
}
