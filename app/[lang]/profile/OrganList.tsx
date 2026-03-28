"use client";
import { OrganItem } from "./OrganItem";
import type { Organ } from "./organs";

interface OrganListProps {
  items: Organ[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

export const OrganList = ({ items, openId, setOpenId }: OrganListProps) => {
  return (
    <ul className="flex flex-col gap-1 flex-1 max-w-125 w-125 pb-4">
      {items.map((item) => (
        <OrganItem
          key={item.id}
          organ={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </ul>
  );
};
