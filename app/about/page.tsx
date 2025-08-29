import type { Metadata } from "next";
import WhyChooseUS from "@/components/sections/whychooseus";
import AdBanner from "@/components/homeComponents/adbanner";
import Testimonial from "@/components/homeComponents/testimonial";
import GetInTouch from "@/components/homeComponents/getintouch";

export const metadata: Metadata = {
  title: "About US",
  description: "About D-Fitness WebApp and Developers",
};
export default async function About() {
  return (
    <>
      {/* <!-- Breadcrumb Section Begin --> */}
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb-bg.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>About us</h2>
                <div className="bt-option">
                  <a href="./index.html">Home</a>
                  <span>About</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ChoseUs Section Begin --> */}
      <WhyChooseUS />
      {/* <!-- ChoseUs Section End --> */}

      {/* <!-- About US Section Begin --> */}
      <section className="aboutus-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="about-video set-bg" data-setbg="img/about-us.jpg">
                <a
                  href="https://www.youtube.com/watch?v=EzKkl64rRbM"
                  className="play-btn video-popup"
                >
                  <i className="fa fa-caret-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="about-text">
                <div className="section-title">
                  <span>About Us</span>
                  <h2>What we have done</h2>
                </div>
                <div className="at-desc">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                    commodo viverra maecenas accumsan lacus vel facilisis.
                    aliquip ex ea commodo consequat sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor.
                  </p>
                </div>
                <div className="about-bar">
                  <div className="ab-item">
                    <p>Body building</p>
                    <div id="bar1" className="barfiller">
                      <span className="fill" data-percentage="80"></span>
                      <div className="tipWrap">
                        <span className="tip"></span>
                      </div>
                    </div>
                  </div>
                  <div className="ab-item">
                    <p>Training</p>
                    <div id="bar2" className="barfiller">
                      <span className="fill" data-percentage="85"></span>
                      <div className="tipWrap">
                        <span className="tip"></span>
                      </div>
                    </div>
                  </div>
                  <div className="ab-item">
                    <p>Fitness</p>
                    <div id="bar3" className="barfiller">
                      <span className="fill" data-percentage="75"></span>
                      <div className="tipWrap">
                        <span className="tip"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About US Section End --> */}

      {/* <!-- Team Section Begin --> */}
      <section className="team-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Team</span>
                  <h2>TRAIN WITH EXPERTS</h2>
                </div>
                <a href="#" className="primary-btn btn-normal appoinment-btn">
                  appointment
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ts-slider owl-carousel">
              <div className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg="img/team/team-1.jpg"
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg="img/team/team-2.jpg"
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg="img/team/team-3.jpg"
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg="img/team/team-4.jpg"
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg="img/team/team-5.jpg"
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg="img/team/team-6.jpg"
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Team Section End --> */}

      {/* <!-- Banner Section Begin --> */}
      <AdBanner />
      {/* <!-- Banner Section End --> */}

      {/* <!-- Testimonial Section Begin --> */}
      <Testimonial />
      {/* <!-- Testimonial Section End --> */}

      {/* <!-- Get In Touch Section Begin --> */}
      <GetInTouch />
      {/* <!-- Get In Touch Section End --> */}
      {/* <!-- Breadcrumb Section End --> */}
    </>
  );
}
