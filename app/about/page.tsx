import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          About Health Advisor
        </h1>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">Who we are</h2>
          <p className="text-muted leading-7">
            Health Advisor is a digital wellness tool that helps people understand their health risks
            and lifestyle habits. By completing a short survey, users receive evidence-based
            recommendations tailored to their individual profile.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">Our mission</h2>
          <p className="text-muted leading-7">
            To make personalised health guidance accessible to everyone. We believe that small,
            informed changes in daily habits can have a profound impact on long-term wellbeing.
            Our recommendations are grounded in current medical guidelines and are regularly
            reviewed by health professionals.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="mt-6 text-xl font-medium text-foreground">The team</h2>
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
          <h2 className="mt-6 text-xl font-medium text-foreground">Disclaimer</h2>
          <p className="text-muted leading-7">
            Health Advisor provides general wellness information only and is not a substitute for
            professional medical advice, diagnosis, or treatment. Always consult a qualified
            healthcare provider with any questions about your health.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="mt-6 text-xl font-medium text-foreground">Contact</h2>
          <p className="text-muted leading-7">
            Have questions or feedback?{" "}
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
