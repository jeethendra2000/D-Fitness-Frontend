import type { Metadata } from "next";
import HeroSection from "@/components/sections/herosection";
import WhyChooseUS from "@/components/sections/whychooseus";
import GetInTouch from "@/components/homeComponents/getintouch";
import AdBanner from "@/components/homeComponents/adbanner";
import Packages from "@/components/homeComponents/packages";
import Team from "@/components/homeComponents/team";
import Testimonial from "@/components/homeComponents/testimonial";
export const metadata: Metadata = {
  title: "Home Page",
  description: "D-Fitness Home Page",
};
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* <AdBanner /> */}
      {/* <!-- Services Section Begin --> */}
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
            <div className="col-lg-3 order-lg-1 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-1.jpg"
                  width={200}
                  height={200}
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-2 col-md-6 p-0">
              <div className="ss-text">
                <h4>Personal training</h4>
                <p>
                  Get one-on-one sessions with certified trainers who design
                  customized workouts to match your fitness level, goals, and
                  schedule.
                </p>
                <a href="#">Explore</a>
              </div>
            </div>
            <div className="col-lg-3 order-lg-3 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-2.jpg"
                  width={200}
                  height={200}
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-4 col-md-6 p-0">
              <div className="ss-text">
                <h4>Group fitness classes</h4>
                <p>
                  Join energetic sessions like Zumba, HIIT, Yoga, and CrossFit.
                  Stay motivated with music, teamwork, and fun calorie-burning
                  challenges.
                </p>
                <a href="#">Explore</a>
              </div>
            </div>
            <div className="col-lg-3 order-lg-8 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-4.jpg"
                  width={200}
                  height={200}
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-7 col-md-6 p-0">
              <div className="ss-text second-row">
                <h4>Body building</h4>
                <p>
                  Achieve your dream physique with tailored hypertrophy
                  programs, nutrition planning, and progressive training
                  support.
                </p>
                <a href="#">Explore</a>
              </div>
            </div>
            <div className="col-lg-3 order-lg-6 col-md-6 p-0">
              <div className="ss-pic">
                <Image
                  src="/img/services/services-3.jpg"
                  width={200}
                  height={200}
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-lg-3 order-lg-5 col-md-6 p-0">
              <div className="ss-text second-row">
                <h4>Strength training</h4>
                <p>
                  Build power and endurance with our state-of-the-art equipment
                  and structured weight training programs guided by
                  professionals.
                </p>
                <a href="#">Explore</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Services Section End --> */}
      <WhyChooseUS />
      <Packages />
      <Team />
      <Testimonial />
      <GetInTouch />
    </>
  );
}
