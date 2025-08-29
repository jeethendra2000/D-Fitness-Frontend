"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav-menu">
      <ul>
        <li className={pathname === "/" ? "active" : ""}>
          <a href="/">Home</a>
        </li>
        <li className={pathname === "/services" ? "active" : ""}>
          <a href="/services">Services</a>
        </li>
        <li className={pathname === "/team" ? "active" : ""}>
          <a href="/team">Our Team</a>
        </li>
        <li className={pathname === "/gallery" ? "active" : ""}>
          <a href="/gallery">Gallery</a>
        </li>
        <li className={pathname === "/contact" ? "active" : ""}>
          <a href="/contact">Contact</a>
        </li>
        <li className={pathname === "/about" ? "active" : ""}>
          <a href="/about">About Us</a>
        </li>
        {/* <li className={pathname === "/dashboard" ? "active" : ""}>
          <a href="/dashboard">Dashboard</a>
        </li> */}
        <li className={pathname === "/login" ? "active" : ""}>
          <a href="/login">Login/signup</a>
        </li>
      </ul>
    </nav>
  );
}
