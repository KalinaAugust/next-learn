"use client";

import { signOut } from "next-auth/react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SettingsClientProps {
  dict: Dictionary["settings"];
  lang: string;
}

export default function SettingsClient({ dict, lang }: SettingsClientProps) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">{dict.title}</h1>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-subtle">
          {dict.account}
        </h2>
        <div className="rounded-lg border border-border bg-background">
          <button
            onClick={() => signOut({ callbackUrl: `/${lang}` })}
            className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-muted"
          >
            {dict.logout}
          </button>
        </div>
      </section>
    </main>
  );
}
