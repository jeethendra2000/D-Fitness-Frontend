import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* */}
      <section className="footer-section">
        <div className="container">
          <div className="row">
            {/* 1. About / Logo Section */}
            <div className="col-lg-6">
              <div className="fs-about">
                <div className="fa-logo">
                  <Link href="/">
                    <Image
                      src="/img/logo.png"
                      width={180}
                      height={60}
                      alt="D-Fitness Gym Logo"
                      style={{
                        objectFit: "contain",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </Link>
                </div>
                <p>
                  Transform your body and mind at D-Fitness Gym. Located in
                  Hassan, Karnataka, we provide top-tier equipment and
                  professional training to help you reach your goals.
                </p>
                <div className="fa-social">
                  <Link href="https://facebook.com" target="_blank">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link href="https://instagram.com" target="_blank">
                    <i className="fa fa-instagram"></i>
                  </Link>
                  <Link href="https://youtube.com" target="_blank">
                    <i className="fa fa-youtube-play"></i>
                  </Link>
                  <Link href="https://wa.me/919108720358" target="_blank">
                    <i className="fa fa-whatsapp"></i>
                  </Link>
                  <Link href="mailto:dfitnessgym2025@gmail.com">
                    <i className="fa fa-envelope-o"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Useful Links */}
            <div className="col-lg-2 offset-lg-2 col-md-3 col-sm-6">
              <div className="fs-widget">
                <h4>Useful links</h4>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link href="/team">Our Team</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Support Links */}
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="fs-widget">
                <h4>Support</h4>
                <ul>
                  <li>
                    <Link href="/auth/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* 5. Copyright */}
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="copyright-text">
                <p>
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  Copyright &copy; {currentYear} <strong>D-Fitness Gym</strong>.
                  All rights reserved.
                  {/* Made with{" "} <i className="fa fa-heart" aria-hidden="true"></i> |  */}{" "}
                  <Link href="https://colorlib.com" target="_blank">
                    Colorlib
                  </Link>
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* */}
    </footer>
  );
}
