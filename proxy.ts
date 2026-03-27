import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/survey", "/recommendations"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authRoutes.some((r) => pathname.startsWith(r)) && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
