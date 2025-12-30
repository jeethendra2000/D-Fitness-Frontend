import GetInTouch from "@/components/homeComponents/getintouch";
import Breadcrumb from "@/components/sections/breadcrumb";
import ContactForm from "@/components/homeComponents/ContactForm"; // Import the new component
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact US",
  description: "Contact Enquiry for D-Fitness Gym Owner",
};

export default async function ContactUS() {
  return (
    <>
      <Breadcrumb title="Contact us" />

      {/* */}
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
                    <li> +91 9108720358</li>
                    <li> +91 8618964880</li>
                  </ul>
                </div>
                <div className="cw-text email">
                  <i className="fa fa-envelope"></i>
                  <p>dfitnessgym2025@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              {/* Replaced static HTML form with the functional Client Component */}
              <ContactForm />
            </div>
          </div>

          <div className="map">
            {/* Updated Map Link to actually point to Hassan, Karnataka */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62203.20818296232!2d76.05977937402035!3d13.006935105260192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5483296215033%3A0x2897c768c8b4b1a4!2sHassan%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709228471234!5m2!1sen!2sin"
              width="600"
              height="550"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      {/* */}

      <GetInTouch />
    </>
  );
}
