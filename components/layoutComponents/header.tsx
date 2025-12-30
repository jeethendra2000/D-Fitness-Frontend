import Navbar from "@/components/layoutComponents/navbar";
import Sidebar from "@/components/layoutComponents/sidebar";
import Image from "next/image";
import Link from "next/link";
// import AuthStatusMenu from "../authComponents/AuthStatusMenu";

export default function Header() {
  return (
    <>
      <Sidebar />
      <header className="header-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/img/logo.png"
                    width={150}
                    height={150}
                    alt="D-Fitness Gym Logo"
                    style={{
                      objectFit: "contain",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <Navbar />
            </div>
            <div className="col-lg-3">
              <div className="top-option">
                {/* Search removed, Social Links kept */}
                <div className="to-social">
                  <Link href="https://www.facebook.com" target="_blank">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link href="https://www.instagram.com" target="_blank">
                    <i className="fa fa-instagram"></i>
                  </Link>
                  <Link href="https://wa.me/919108720358" target="_blank">
                    <i className="fa fa-whatsapp"></i>
                  </Link>
                  <Link href="mailto:dfitnessgym2025@gmail.com" target="_blank">
                    <i className="fa fa-envelope-o"></i>
                  </Link>
                  <Link href="https://www.youtube.com" target="_blank">
                    <i className="fa fa-youtube-play"></i>
                  </Link>
                </div>
                {/* <AuthStatusMenu /> */}
              </div>
            </div>
          </div>
          <div className="canvas-open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
}
