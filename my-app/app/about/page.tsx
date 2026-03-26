export default function About() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col gap-10 py-16 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
          About Health Advisor
        </h1>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Who we are</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            Health Advisor is a digital wellness tool that helps people understand their health risks
            and lifestyle habits. By completing a short survey, users receive evidence-based
            recommendations tailored to their individual profile.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Our mission</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            To make personalised health guidance accessible to everyone. We believe that small,
            informed changes in daily habits can have a profound impact on long-term wellbeing.
            Our recommendations are grounded in current medical guidelines and are regularly
            reviewed by health professionals.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">The team</h2>
          <ul className="flex flex-col gap-4">
            {[
              { name: "Dr. Sarah Lee", role: "Medical Content Reviewer" },
              { name: "Marcus Chen", role: "Full-Stack Engineer" },
              { name: "Elena Russo", role: "Product Designer" },
            ].map(({ name, role }) => (
              <li
                key={name}
                className="flex items-center gap-4 rounded-xl border border-black/[.08] dark:border-white/[.12] px-5 py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-black dark:text-zinc-50">
                  {name[0]}
                </div>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">{name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Disclaimer</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            Health Advisor provides general wellness information only and is not a substitute for
            professional medical advice, diagnosis, or treatment. Always consult a qualified
            healthcare provider with any questions about your health.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-medium text-black dark:text-zinc-50">Contact</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-7">
            Have questions or feedback?{" "}
            <span className="font-medium text-black dark:text-zinc-50">hello@health-advisor.app</span>
          </p>
        </section>
      </main>
    </div>
  );
}
