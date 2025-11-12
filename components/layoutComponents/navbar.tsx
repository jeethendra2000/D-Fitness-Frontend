import Link from "next/link";
import { navItemsList } from "@/configs/navItemsList";
import NavItem from "./navItem";

export default function Navbar() {
  return (
    <nav className="nav-menu">
      <ul>
        {navItemsList.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label} />
        ))}
      </ul>
    </nav>
  );
}
