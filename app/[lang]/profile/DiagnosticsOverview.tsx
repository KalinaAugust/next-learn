import type { Organ } from "./organs";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { StatBadge } from "@/components/StatBadge";
import { ProgressBar } from "@/components/ProgressBar";

interface Props {
  organs: Organ[];
  dict: Dictionary["profile"];
}

export function DiagnosticsOverview({ organs, dict }: Props) {
  const total = organs.length;
  const critical = organs.filter((o) => o.status === "critical").length;
  const warning = organs.filter((o) => o.status === "warning").length;
  const ok = organs.filter((o) => o.status === "ok").length;

  const healthScore = Math.round((ok * 100 + warning * 50) / (total * 100) * 100);
  const attentionPct = Math.round(((critical + warning) / total) * 100);
  const urgentTagsCount = organs.reduce(
    (acc, o) => acc + o.tags.filter((t) => t.type === "urgent" || t.type === "attention").length,
    0,
  );
  const totalTags = organs.reduce((acc, o) => acc + o.tags.length, 0);
  const riskPct = totalTags > 0 ? Math.round((urgentTagsCount / totalTags) * 100) : 0;

  return (
    <div className="w-full max-w-4xl rounded-2xl border border-border bg-white px-5 py-3.5 flex items-center gap-6">
      {/* Stat badges */}
      <div className="flex items-center gap-2 shrink-0">
        <StatBadge value={critical} label={dict.overviewCritical} color="red" />
        <StatBadge value={warning} label={dict.overviewWarnings} color="orange" />
        <StatBadge value={ok} label={dict.overviewOk} color="green" />
      </div>

      <div className="w-px h-8 bg-border shrink-0" />

      {/* Progress bars */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <ProgressBar label={dict.overviewHealthIndex} value={healthScore} color={healthScore >= 70 ? "green" : healthScore >= 40 ? "orange" : "red"} />
        <ProgressBar label={dict.overviewSystemsAtRisk} value={attentionPct} color={attentionPct <= 30 ? "green" : attentionPct <= 60 ? "orange" : "red"} />
        <ProgressBar label={dict.overviewRiskLevel} value={riskPct} color={riskPct <= 25 ? "green" : riskPct <= 50 ? "orange" : "red"} />
      </div>
    </div>
  );
}
