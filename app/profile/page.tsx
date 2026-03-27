import Image from "next/image";
import RecommendationsBlock from "@/components/RecommendationsBlock";

const items = [
  "Corpus sanum",
  "Mens clara",
  "Vita brevis",
  "Tempus fugit",
  "Aqua pura",
  "Labor omnia",
  "Natura sanat",
  "Vis medicatrix",
  "Aer vivus",
  "Salus optima",
];

export default function Profile() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="flex gap-8">
        <div className="rounded-2xl border border-white/20 p-8 w-[350px] shrink-0">
          <Image
            src="/images/body_outline.png"
            alt="Body outline"
            width={350}
            height={700}
            className="w-full h-auto object-contain"
          />
        </div>
        <ul className="flex flex-col gap-1 flex-1">
          {items.map((item, i) => (
            <li key={i} className="p-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-lg mt-12">
        <RecommendationsBlock />
      </div>
    </main>
  );
}
