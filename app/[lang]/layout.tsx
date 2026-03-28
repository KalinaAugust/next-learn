import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { SessionProvider } from "next-auth/react";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Advisor",
  description: "Get personalized health recommendations based on your lifestyle",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnimatedBackground />
        <SessionProvider>
          <Header dict={dict.nav} lang={lang as Locale} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
