"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdAssignment, MdInfo, MdPerson, MdSettings, MdLogin } from "react-icons/md";
import type { Locale } from "@/app/[lang]/dictionaries";

type NavDict = {
  survey: string;
  about: string;
  profile: string;
  login: string;
  homeAriaLabel: string;
};

interface HeaderProps {
  dict: NavDict;
  lang: Locale;
}

export default function Header({ dict, lang }: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: `/${lang}/survey`, label: dict.survey, icon: <MdAssignment size={18} /> },
    { href: `/${lang}/about`, label: dict.about, icon: <MdInfo size={18} /> },
  ];

  const otherLang: Locale = lang === "en" ? "ru" : "en";
  // Replace locale prefix in current pathname for the switcher link
  const switcherHref = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`) || `/${otherLang}`;

  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <nav aria-label="Main navigation" className="flex items-center gap-6">
        <Link href={`/${lang}`} aria-label={dict.homeAriaLabel} className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 7c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" fill="currentColor" fillOpacity="0.12" />
            <path d="M14 9v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 14h1M18 14h1M14 9v1M14 18v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 11.5c.8-1.2 2-2 3-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
          </svg>
          <span className="text-sm font-semibold tracking-widest uppercase">HealthAdvisor</span>
        </Link>

        {links
          .filter(({ href }) => href === `/${lang}/about` || !!session)
          .map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 text-sm font-medium tracking-widest uppercase transition-colors hover:text-foreground ${
                pathname === href
                  ? "text-foreground underline underline-offset-4"
                  : "text-subtle"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <>
              <Link
                href={`/${lang}/profile`}
                className={`flex items-center gap-1.5 text-sm font-medium tracking-widest uppercase transition-colors hover:text-foreground ${pathname === `/${lang}/profile` ? "text-foreground underline underline-offset-4" : "text-subtle"}`}
              >
                <MdPerson size={18} />
                {dict.profile}
              </Link>
              <Link
                href={`/${lang}/settings`}
                aria-label="Settings"
                className={`transition-colors hover:text-foreground ${pathname === `/${lang}/settings` ? "text-foreground" : "text-subtle"}`}
              >
                <MdSettings size={20} />
              </Link>
            </>
          ) : (
            <Link
              href={`/${lang}/login`}
              className="flex items-center gap-1.5 text-sm font-medium tracking-widest uppercase text-subtle transition-colors hover:text-foreground"
            >
              <MdLogin size={18} />
              {dict.login}
            </Link>
          )}

          <Link
            href={switcherHref}
            className="text-xs font-semibold uppercase tracking-widest text-subtle hover:text-foreground transition-colors border border-border rounded px-2 py-1"
          >
            {otherLang}
          </Link>
        </div>
      </nav>
    </header>
  );
}
