"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/survey", label: "Take Survey" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <nav aria-label="Main navigation" className="flex items-center gap-6">
        {links
          .filter(({ href }) => href === "/" || href === "/about" || !!session)
          .map(({ href, label }) => (
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
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === "/profile" ? "text-foreground underline underline-offset-4" : "text-subtle"}`}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                aria-label="Settings"
                className={`transition-colors hover:text-foreground ${pathname === "/settings" ? "text-foreground" : "text-subtle"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </Link>
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
