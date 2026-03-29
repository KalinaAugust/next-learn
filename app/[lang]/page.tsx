import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { home: { title, subtitle, cta, footer } } = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col flex-1 items-center justify-between font-sans">
      <div className="fixed inset-0 -z-[5] bg-cover bg-center" style={{ backgroundImage: "url('/images/background_2.jpg')" }} />
      <div className="flex flex-1 items-center justify-center">
        <main className="flex flex-col items-center gap-8 py-16 px-16 text-center backdrop-blur-md bg-black/40 border border-white/20 rounded-3xl shadow-xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {title}
          </h1>
          <p className="max-w-md text-lg leading-8 text-emerald-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {subtitle}
          </p>
          <Link
            href={`/${lang}/survey`}
            className="flex h-12 items-center justify-center rounded-full bg-green-900 px-8 text-sm font-medium text-white transition-all hover:bg-green-800 shadow-[0_0_12px_rgba(34,197,94,0.4)] hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
          >
            {cta}
          </Link>
        </main>
      </div>
      <footer className="py-6 text-sm text-emerald-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        {footer.replace("{{year}}", String(new Date().getFullYear()))}
      </footer>
    </div>
  );
}
