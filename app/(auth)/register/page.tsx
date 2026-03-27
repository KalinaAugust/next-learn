import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-semibold text-foreground">Регистрация</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
