import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { pool } from "@/lib/auth-db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("[auth] Missing credentials");
            return null;
          }

          console.log("[auth] Looking up user:", credentials.email);
          const { rows } = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [credentials.email]
          );
          const user = rows[0];
          console.log("[auth] User found:", !!user, "has password:", !!user?.password);

          if (!user?.password) return null;

          const pwd = credentials.password as string;
          console.log("[auth] Password length received:", pwd.length, "hash prefix:", user.password.substring(0, 7));

          const ok = await bcrypt.compare(pwd, user.password);
          console.log("[auth] Password match:", ok);

          return ok ? { id: user.id, name: user.name, email: user.email } : null;
        } catch (e) {
          console.error("[auth] authorize error:", e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },
});
