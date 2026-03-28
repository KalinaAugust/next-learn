import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const d = dict.about;

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {d.title}
        </h1>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">{d.whoWeAre.title}</h2>
          <p className="text-muted leading-7">{d.whoWeAre.body}</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">{d.mission.title}</h2>
          <p className="text-muted leading-7">{d.mission.body}</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="mt-6 text-xl font-medium text-foreground">{d.team.title}</h2>
          <ul className="flex flex-col gap-4">
            {[
              { name: "Dr. Sanya Muha", role: "Drugs Reviewer", photo: "/images/team/member1.jpg" },
              { name: "Dr. Ilya Lis", role: "Medical Cyborg", photo: "/images/team/member2.jpg" },
              { name: "Dr. Alyona", role: "Vegan Cannibal", photo: "/images/team/member3.jpg" },
            ].map(({ name, role, photo }) => (
              <li
                key={name}
                className="flex items-center gap-4 rounded-xl border border-border px-5 py-4"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image src={photo} alt={name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{name}</p>
                  <p className="text-sm text-subtle">{role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">{d.disclaimer.title}</h2>
          <p className="text-muted leading-7">{d.disclaimer.body}</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">{d.contact.title}</h2>
          <p className="text-muted leading-7">
            {d.contact.body}{" "}
            <a
              href="mailto:hello@health-advisor.app"
              className="font-medium text-foreground underline underline-offset-4"
            >
              hello@health-advisor.app
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
