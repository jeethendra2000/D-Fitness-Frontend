"use client";

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

        <div className="canvas-search">
          <h5 style={{ color: "black", marginTop: "10px" }}>D-Fitness Gym</h5>
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
      </div>
    </>
  );
}
