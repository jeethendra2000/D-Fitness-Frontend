import Link from "next/link";
import { navItemsList } from "@/configs/navItemsList";
import NavItem from "./navItem";

export default function Sidebar() {
  return (
    <>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="fa fa-close"></i>
        </div>
        <div className="canvas-search search-switch">
          <i className="fa fa-search"></i>
        </div>
        <nav className="canvas-menu mobile-menu">
          <ul>
            {navItemsList.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="canvas-social">
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
        </div>
      </div>
    </>
  );
}
