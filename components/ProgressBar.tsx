const colorMap = {
  green:  { bar: "bg-emerald-400", text: "text-emerald-600" },
  orange: { bar: "bg-orange-300",  text: "text-orange-500"  },
  red:    { bar: "bg-red-300",     text: "text-red-500"     },
};

export function ProgressBar({ label, value, color }: { label: string; value: number; color: "green" | "orange" | "red" }) {
  const { bar, text } = colorMap[color];
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-36 shrink-0">{label}</span>
      <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-semibold tabular-nums w-8 text-right ${text}`}>{value}%</span>
    </div>
  );
}
