import Navbar from "@/components/layoutComponents/navbar";
import Sidebar from "@/components/layoutComponents/sidebar";
import Image from "next/image";
import Link from "next/link";
import AuthStatusMenu from "../authComponents/AuthStatusMenu";

interface RoleHeaderProps {
  role: string;
}

export default function RoleHeader({ role }: RoleHeaderProps) {
  return (
    <>
      <Sidebar />
      <header className="header-section" data-dashboard-header>
        <div className="container-fluid">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-lg-3 col-6">
              <div className="logo">
                <Link href={`/dashboard/${role}`}>
                  <Image
                    src="/img/logo.png"
                    width={150}
                    height={150}
                    alt="D-Fitness Logo"
                  />
                </Link>
              </div>
            </div>

            {/* Right side (fills remaining width and pushes content to end) */}
            {/* <div className="col-lg-6">
              <Navbar />
            </div> */}
            <div className="col-lg-9 col-6">
              <div
                className="top-option d-flex justify-content-end"
                style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%", gap: 16 }}
              >
                <AuthStatusMenu />
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