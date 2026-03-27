"use server";

import { pool } from "@/lib/auth-db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function register(
  _state: RegisterState | undefined,
  formData: FormData
): Promise<RegisterState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  const errors: RegisterState["errors"] = {};
  if (!name || name.length < 2)
    errors.name = ["Имя должно содержать минимум 2 символа."];
  if (!email || !email.includes("@"))
    errors.email = ["Введите корректный email."];
  if (!password || password.length < 8)
    errors.password = ["Пароль должен содержать минимум 8 символов."];
  if (Object.keys(errors).length > 0) return { errors };

  const existing = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );
  if (existing.rows.length > 0)
    return { errors: { email: ["Этот email уже зарегистрирован."] } };

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (id, name, email, password)
     VALUES (gen_random_uuid()::text, $1, $2, $3)`,
    [name, email, hashedPassword]
  );

  redirect("/login?registered=1");
}
