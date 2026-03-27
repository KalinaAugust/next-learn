"use client";

import { signOut } from "next-auth/react";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">Settings</h1>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-subtle">
          Account
        </h2>
        <div className="rounded-lg border border-border bg-background">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-muted"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}
