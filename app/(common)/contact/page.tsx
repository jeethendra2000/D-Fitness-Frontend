import GetInTouch from "@/components/homeComponents/getintouch";
import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact US",
  description: "Contact Enquiry for D-Fitness Gym Owner",
};

export default async function ContactUS() {
  return (
    <>
      <Breadcrumb title="Contact us" />

      {/* <!-- Contact Section Begin --> */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title contact-title">
                <span>Contact us</span>
                <h2>GET IN TOUCH</h2>
              </div>
              <div className="contact-widget">
                <div className="cw-text">
                  <i className="fa fa-map-marker"></i>
                  <p>
                    Dream fitness gym
                    <br />
                    b, Arsikere road, Katihalli, Hassan,
                    <br /> Karnataka 573201
                  </p>
                </div>
                <div className="cw-text">
                  <i className="fa fa-mobile"></i>
                  <ul>
                    <li> +91 99016 47430</li>
                    <li> +91 99016 47430</li>
                  </ul>
                </div>
                <div className="cw-text email">
                  <i className="fa fa-envelope"></i>
                  <p>dfitness@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="leave-comment">
                <form action="#">
                  <input type="text" placeholder="Name" />
                  <input type="text" placeholder="Email" />
                  <input type="text" placeholder="Website" />
                  <textarea placeholder="Comment"></textarea>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>

          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995151.6664747568!2d74.91060687812502!3d13.01584400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba549574cd865ad%3A0x725c42ba1817d759!2sD%20FITNESS%20CENTER!5e0!3m2!1sen!2sin!4v1762932038892!5m2!1sen!2sin"
              width="600"
              height="550"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      {/* <!-- Contact Section End --> */}

      <GetInTouch />
    </>
  );
}
