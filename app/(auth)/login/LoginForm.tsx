"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-brand";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Неверный email или пароль.");
      setPending(false);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="space-y-4">
      {registered && (
        <p className="rounded bg-success-bg px-3 py-2 text-sm text-success">
          Аккаунт создан. Войдите.
        </p>
      )}
      {error && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
          <input id="email" name="email" type="email" className={inputClass} required />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            className={inputClass}
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-brand py-2.5 text-sm font-medium text-background transition-colors hover:bg-brand-hover disabled:opacity-50"
        >
          {pending ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-subtle">или</span>
        <div className="flex-1 border-t border-border" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-brand-light"
      >
        Войти через Google
      </button>

      <p className="text-center text-sm text-muted">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="text-foreground underline underline-offset-4"
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
