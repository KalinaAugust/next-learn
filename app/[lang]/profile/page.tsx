import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { getOrgans } from "@/app/profile/organs";
import ProfileClient from "@/app/profile/ProfileClient";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const organs = getOrgans(dict);
  return <ProfileClient dict={dict} organs={organs} lang={lang} />;
}
