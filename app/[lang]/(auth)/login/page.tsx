import { Suspense } from "react";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-semibold text-foreground">{dict.login.title}</h1>
        <Suspense>
          <LoginForm dict={dict.login} lang={lang} />
        </Suspense>
      </div>
    </main>
  );
}
