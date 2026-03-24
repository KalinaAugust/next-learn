const components = [
  {
    name: "Image",
    import: 'import Image from "next/image"',
    description: "Оптимизированные изображения с автоматическим lazy loading, изменением размера и поддержкой WebP.",
    example: `<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
/>`,
  },
  {
    name: "Link",
    import: 'import Link from "next/link"',
    description: "Клиентская навигация между страницами с предзагрузкой маршрутов.",
    example: `<Link href="/about">
  About
</Link>`,
  },
  {
    name: "Font (next/font)",
    import: 'import { Inter } from "next/font/google"',
    description: "Оптимизация веб-шрифтов: загрузка без лишних сетевых запросов, устранение сдвига макета (CLS).",
    example: `const inter = Inter({ subsets: ["latin"] })

<html className={inter.className}>`,
  },
  {
    name: "Metadata",
    import: 'import type { Metadata } from "next"',
    description: "SEO-метаданные: title, description, Open Graph и другие теги через экспорт объекта metadata.",
    example: `export const metadata: Metadata = {
  title: "My Page",
  description: "Page description",
}`,
  },
  {
    name: "Script",
    import: 'import Script from "next/script"',
    description: "Загрузка сторонних скриптов с контролем стратегии: beforeInteractive, afterInteractive, lazyOnload.",
    example: `<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
/>`,
  },
];

export default function GuidePage() {
  return (
    <main className="flex-1 p-8 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-2">Next.js Components</h1>
      <p className="text-black/50 dark:text-white/50 mb-8 text-sm">
        Базовые компоненты и API Next.js App Router
      </p>
      <ul className="flex flex-col gap-6">
        {components.map(({ name, import: imp, description, example }) => (
          <li
            key={name}
            className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden"
          >
            <div className="px-5 py-4">
              <h2 className="text-base font-semibold mb-1">{name}</h2>
              <code className="text-xs text-black/40 dark:text-white/40">{imp}</code>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60 leading-6">
                {description}
              </p>
            </div>
            <pre className="bg-black/[.03] dark:bg-white/[.04] border-t border-black/10 dark:border-white/10 px-5 py-4 text-xs overflow-x-auto">
              <code>{example}</code>
            </pre>
          </li>
        ))}
      </ul>
    </main>
  );
}
