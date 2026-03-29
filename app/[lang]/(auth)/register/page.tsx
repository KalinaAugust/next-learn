import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="fixed inset-0 -z-[5] bg-cover bg-center" style={{ backgroundImage: "url('/images/background_2.jpg')" }} />
      <div className="w-full max-w-sm space-y-5 rounded-3xl border border-white/20 backdrop-blur-md bg-black/40 shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-white">{dict.register.title}</h1>
        <RegisterForm dict={dict.register} lang={lang} />
      </div>
    </main>
  );
}
