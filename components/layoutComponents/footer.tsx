import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer>
      {/* <!-- Footer Section Begin --> */}
      <section className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="fs-about">
                <div className="fa-logo">
                  <Link href="#">
                    <Image
                      src="/img/logo.png"
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore dolore magna aliqua
                  endisse ultrices gravida lorem.
                </p>
                <div className="fa-social">
                  <Link href="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa fa-twitter"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa fa-youtube-play"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa fa-instagram"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa  fa-whatsapp"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa  fa-envelope-o"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="fs-widget">
                <h4>Useful links</h4>
                <ul>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                  <li>
                    <Link href="/ourteam">Our Team</Link>
                  </li>
                  <li>
                    <Link href="/gallery">Gallery</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="fs-widget">
                <h4>Support</h4>
                <ul>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/myaccount">My account</Link>
                  </li>
                  <li>
                    <Link href="/subscribe">Subscribe</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="fs-widget">
                <h4>Tips & Guides</h4>
                <div className="fw-recent">
                  <h6>
                    <Link href="#">
                      Physical fitness may help prevent depression, anxiety
                    </Link>
                  </h6>
                  <ul>
                    <li>3 min read</li>
                    <li>20 Comment</li>
                  </ul>
                </div>
                <div className="fw-recent">
                  <h6>
                    <Link href="#">
                      Fitness: The best exercise to lose belly fat and tone
                      up...
                    </Link>
                  </h6>
                  <ul>
                    <li>3 min read</li>
                    <li>20 Comment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="copyright-text">
                <p>
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  Copyright &copy;
                  {new Date().getFullYear()} All rights reserved |{" "}
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
      {/* <!-- Footer Section End --> */}
    </footer>
  );
}
