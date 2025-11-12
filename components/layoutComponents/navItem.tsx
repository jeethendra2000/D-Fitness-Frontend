"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={isActive ? "active" : ""}>
      {href === "/" ? (
        <a href={href}>{label}</a>
      ) : (
        <Link href={href}>{label}</Link>
      )}
    </li>
  );
}
