"use client";

import { useActionState } from "react";
import { register, type RegisterState } from "@/lib/actions/auth";
import Link from "next/link";

const inputClass =
  "w-full rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-brand";
const errorClass = "text-xs text-red-600";

export default function RegisterForm() {
  const [state, action, pending] = useActionState<
    RegisterState | undefined,
    FormData
  >(register, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">Имя</label>
        <input id="name" name="name" type="text" className={inputClass} required />
        {state?.errors?.name && (
          <p className={errorClass}>{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="reg-email" className="block text-sm font-medium text-foreground">Email</label>
        <input id="reg-email" name="email" type="email" className={inputClass} required />
        {state?.errors?.email && (
          <p className={errorClass}>{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="reg-password" className="block text-sm font-medium text-foreground">Пароль</label>
        <input
          id="reg-password"
          name="password"
          type="password"
          className={inputClass}
          required
        />
        {state?.errors?.password && (
          <p className={errorClass}>{state.errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand py-2.5 text-sm font-medium text-background transition-colors hover:bg-brand-hover disabled:opacity-50"
      >
        {pending ? "Создание аккаунта..." : "Создать аккаунт"}
      </button>

      <p className="text-center text-sm text-muted">
        Уже есть аккаунт?{" "}
        <Link
          href="/login"
          className="text-foreground underline underline-offset-4"
        >
          Войти
        </Link>
      </p>
    </form>
  );
}
