import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const locales = ["en", "ru"] as const;
const defaultLocale = "ru";

const protectedRoutes = ["/survey", "/recommendations"];
const authRoutes = ["/login", "/register"];

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.trim();
  return locales.includes(preferred as (typeof locales)[number])
    ? preferred
    : defaultLocale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Step 1: ensure locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Step 2: auth checks on locale-stripped path
  const locale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) ?? defaultLocale;
  const bare = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const session = await auth();

  if (protectedRoutes.some((r) => bare.startsWith(r)) && !session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (authRoutes.some((r) => bare.startsWith(r)) && session) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)"],
};
