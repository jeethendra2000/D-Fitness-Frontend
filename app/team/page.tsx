import GetInTouch from "@/components/homeComponents/getintouch";
import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team Page",
  description: "D-Fitness Our Team Page",
};

export default async function Team() {
  return (
    <>
      <Breadcrumb title="Our Team" />

      {/* <!-- Team Section Begin --> */}
      <section className="team-section team-page spad">
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
            <div className="col-lg-4 col-sm-6">
              <div className="ts-item set-bg" data-setbg="img/team/team-1.jpg">
                <div className="ts_text">
                  <h4>Athart Rachel</h4>
                  <span>Gym Trainer</span>
                  <div className="tt_social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa  fa-envelope-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="ts-item set-bg" data-setbg="img/team/team-2.jpg">
                <div className="ts_text">
                  <h4>Athart Rachel</h4>
                  <span>Gym Trainer</span>
                  <div className="tt_social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa  fa-envelope-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="ts-item set-bg" data-setbg="img/team/team-3.jpg">
                <div className="ts_text">
                  <h4>Athart Rachel</h4>
                  <span>Gym Trainer</span>
                  <div className="tt_social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa  fa-envelope-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="ts-item set-bg" data-setbg="img/team/team-4.jpg">
                <div className="ts_text">
                  <h4>Athart Rachel</h4>
                  <span>Gym Trainer</span>
                  <div className="tt_social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa  fa-envelope-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="ts-item set-bg" data-setbg="img/team/team-5.jpg">
                <div className="ts_text">
                  <h4>Athart Rachel</h4>
                  <span>Gym Trainer</span>
                  <div className="tt_social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa  fa-envelope-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="ts-item set-bg" data-setbg="img/team/team-6.jpg">
                <div className="ts_text">
                  <h4>Athart Rachel</h4>
                  <span>Gym Trainer</span>
                  <div className="tt_social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa  fa-envelope-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Team Section End --> */}

      <GetInTouch />
    </>
  );
}
