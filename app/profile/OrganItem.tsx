import Image from "next/image";
import type { Organ } from "@/app/profile/organs";
import { Tag } from "@/app/profile/Tag";

export const OrganItem = ({ organ, isOpen, onToggle }: { organ: Organ; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border border-border rounded-xl p-3 w-full bg-white">
      <button
        className="flex items-center justify-between gap-2 w-full cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <Image src={organ.icon} alt={organ.title} width={27} height={27} />
          <h3 className="text-sm font-semibold">{organ.title}</h3>
        </div>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="mt-3 rounded-lg bg-amber-50/60 p-3 flex flex-col gap-3">
            <p className="text-sm text-gray-600 leading-relaxed">{organ.description}</p>
            <ul className="flex flex-col gap-1.5">
              {organ.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {organ.tags.map((tag, i) => (
                <Tag key={i} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
