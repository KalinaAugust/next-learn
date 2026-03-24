const todos = [
  { id: 1, text: "Learn Next.js App Router", done: true },
  { id: 2, text: "Build a todos page", done: true },
  { id: 3, text: "Add navigation header", done: false },
  { id: 4, text: "Deploy to production", done: false },
];

export default function TodosPage() {
  return (
    <main className="flex-1 p-8 max-w-lg mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <ul className="flex flex-col gap-3">
        {todos.map(({ id, text, done }) => (
          <li
            key={id}
            className="flex items-center gap-3 p-3 rounded-lg border border-black/10 dark:border-white/10"
          >
            <span
              className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                done
                  ? "bg-black dark:bg-white border-black dark:border-white"
                  : "border-black/30 dark:border-white/30"
              }`}
            />
            <span className={done ? "line-through text-black/40 dark:text-white/40" : ""}>
              {text}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
