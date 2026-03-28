"use client";

import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Organ } from "./organs";
import { organPositions } from "./organPositions";

const dotColors = {
  ok:       { ping: "bg-green-600",  dot: "bg-green-600" },
  warning:  { ping: "bg-yellow-400", dot: "bg-yellow-400" },
  critical: { ping: "bg-red-500",    dot: "bg-red-500" },
};

interface BodyProps {
  organs: Organ[];
  onOrganClick: (id: string) => void;
  activeId?: string | null;
}

export const Body = ({ organs, onOrganClick, activeId }: BodyProps) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="shrink-0 relative h-148.75">
        <div className="relative w-84.5 h-148.75">
          <Image
            src="/images/body_outline.png"
            alt="Body outline"
            fill
            className="object-contain select-none"
            draggable={false}
            loading="eager"
          />
          {organs.map((organ) => {
            const pos = organPositions[organ.id];
            if (!pos) return null;
            const colors = dotColors[organ.status];
            return (
              <Tooltip.Root key={organ.id}>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => onOrganClick(organ.id)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${activeId && activeId !== organ.id ? "opacity-40 scale-50" : "opacity-100 scale-100"}`}
                    style={{ left: pos.x, top: pos.y }}
                    aria-label={organ.title}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.ping} opacity-75`} />
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${colors.dot}`} />
                    </span>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={6}
                    className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg select-none z-50 [transform-origin:var(--radix-tooltip-content-transform-origin)] data-[state=delayed-open]:animate-[tooltip-in_200ms_ease] data-[state=instant-open]:animate-[tooltip-in_200ms_ease] data-[state=closed]:animate-[tooltip-out_200ms_ease_forwards]"
                  >
                    {organ.title}
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            );
          })}
        </div>
      </div>
    </Tooltip.Provider>
  );
};
