import type { Dictionary } from "@/app/[lang]/dictionaries";

export type TagType = 'urgent' | 'attention' | 'stable' | 'monitor' | 'consult' | 'lifestyle';

export interface Tag {
  type: TagType;
  label: string;
}

export interface Organ {
  id: string;
  title: string;
  icon: string;
  description: string;
  status: 'ok' | 'warning' | 'critical';
  tags: Tag[];
  items: string[];
}

const organStatic: { id: string; icon: string; status: Organ['status'] }[] = [
  { id: "knee",       icon: "/icons/knee.png",       status: "warning"  },
  { id: "brain",      icon: "/icons/brain.png",      status: "critical" },
  { id: "bladder",    icon: "/icons/bladder.png",    status: "ok"       },
  { id: "liver",      icon: "/icons/liver.png",      status: "critical" },
  { id: "heart",      icon: "/icons/heart.png",      status: "ok"       },
  { id: "intestines", icon: "/icons/intestines.png", status: "critical" },
  { id: "lungs",      icon: "/icons/lungs.png",      status: "warning"  },
  { id: "hemoglobin", icon: "/icons/hemoglobin.png", status: "warning"  },
];

export function getOrgans(dict: Dictionary): Organ[] {
  return organStatic.map((o) => {
    const text = dict.organs[o.id as keyof typeof dict.organs];
    return {
      id: o.id,
      icon: o.icon,
      status: o.status,
      title: text.title,
      description: text.description,
      items: text.items,
      tags: text.tags as Tag[],
    };
  });
}
