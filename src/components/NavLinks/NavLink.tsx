"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors ${
        isActive
          ? "text-red-700 font-bold"
          : "text-gray-700 hover:text-red-700 dark:text-gray-300 dark:hover:text-red-500"
      }`}
    >
      {children}
    </Link>
  );
}