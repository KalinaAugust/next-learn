"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/survey", label: "Take Survey" },
  { href: "/recommendations", label: "My Results" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <nav aria-label="Main navigation" className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              pathname === href
                ? "text-foreground underline underline-offset-4"
                : "text-subtle"
            }`}
          >
            {label}
          </Link>
        ))}

        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-subtle">
                {session.user?.name ?? session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-subtle transition-colors hover:text-foreground"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-subtle transition-colors hover:text-foreground"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
