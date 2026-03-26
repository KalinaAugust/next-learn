"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/survey", label: "Take Survey" },
  { href: "/recommendations", label: "My Results" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-black/10 dark:border-white/10 px-6 py-4">
      <nav className="flex gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
              pathname === href
                ? "text-black dark:text-white underline underline-offset-4"
                : "text-black/50 dark:text-white/50"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
