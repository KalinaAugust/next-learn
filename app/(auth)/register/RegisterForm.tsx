"use client";

import { useActionState } from "react";
import { register, type RegisterState } from "@/lib/actions/auth";
import Link from "next/link";
import Button from "@/components/Button";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const inputClass =
  "w-full rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-brand";
const errorClass = "text-xs text-red-600";

interface RegisterFormProps {
  dict: Dictionary["register"];
  lang: string;
}

export default function RegisterForm({ dict, lang }: RegisterFormProps) {
  const [state, action, pending] = useActionState<
    RegisterState | undefined,
    FormData
  >(register, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">{dict.name}</label>
        <input id="name" name="name" type="text" className={inputClass} required />
        {state?.errors?.name && (
          <p className={errorClass}>{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="reg-email" className="block text-sm font-medium text-foreground">{dict.email}</label>
        <input id="reg-email" name="email" type="email" className={inputClass} required />
        {state?.errors?.email && (
          <p className={errorClass}>{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="reg-password" className="block text-sm font-medium text-foreground">{dict.password}</label>
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

      <Button type="submit" disabled={pending}>
        {pending ? dict.loading : dict.submit}
      </Button>

      <p className="text-center text-sm text-muted">
        {dict.hasAccount}{" "}
        <Link
          href={`/${lang}/login`}
          className="text-foreground underline underline-offset-4"
        >
          {dict.signIn}
        </Link>
      </p>
    </form>
  );
}
