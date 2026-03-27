import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-background text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Your Personal Health Advisor
        </h1>
        <p className="max-w-md text-lg leading-8 text-muted">
          Answer a few questions about your health and lifestyle to receive personalized recommendations tailored to your condition.
        </p>
        <Link
          href="/survey"
          className="flex h-12 items-center justify-center rounded-full bg-brand px-8 text-sm font-medium text-background transition-colors hover:bg-brand-hover"
        >
          Take the Survey
        </Link>
      </main>
    </div>
  );
}
