const colorMap = {
  green:  { chip: "bg-emerald-100 text-emerald-700", num: "bg-emerald-400" },
  orange: { chip: "bg-orange-100 text-orange-600",   num: "bg-orange-300"  },
  red:    { chip: "bg-red-100 text-red-600",          num: "bg-red-300"     },
};

export function StatBadge({ value, label, color }: { value: number; label: string; color: "green" | "orange" | "red" }) {
  const { chip, num } = colorMap[color];
  return (
    <div className={`flex items-center gap-2 rounded-full px-4 py-2.5 ${chip}`}>
      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold text-white ${num}`}>
        {value}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
