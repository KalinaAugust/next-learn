"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getRecommendations, type SurveyData, type Recommendation } from "@/lib/recommendations";

const priorityBorder: Record<Recommendation["priority"], string> = {
  high: "border-l-red-400",
  medium: "border-l-amber-500",
  low: "border-l-priority-low",
};

const priorityLabel: Record<Recommendation["priority"], string> = {
  high: "High priority",
  medium: "Medium priority",
  low: "General",
};

function getSnapshot(): string {
  return sessionStorage.getItem("healthSurveyData") ?? "";
}

function getServerSnapshot(): null {
  return null;
}

export default function RecommendationsBlock() {
  const raw = useSyncExternalStore(() => () => {}, getSnapshot, getServerSnapshot);

  if (raw === null) return null;

  if (!raw) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <p className="text-muted">Please complete the survey first.</p>
        <Link
          href="/survey"
          className="text-sm font-medium underline underline-offset-4 text-foreground"
        >
          Go to Survey
        </Link>
      </div>
    );
  }

  let data: SurveyData;
  try {
    data = JSON.parse(raw);
  } catch {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <p className="text-muted">Survey data is invalid. Please retake the survey.</p>
        <Link href="/survey" className="text-sm font-medium underline underline-offset-4 text-foreground">
          Go to Survey
        </Link>
      </div>
    );
  }

  const recommendations = getRecommendations(data);

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Your Recommendations</h2>
      <p className="text-sm text-muted pb-2">
        Based on your survey responses. Always consult a qualified healthcare professional before making changes to your health routine.
      </p>

      {recommendations.map((rec) => (
        <div
          key={rec.title}
          className={`rounded-xl border border-border border-l-4 ${priorityBorder[rec.priority]} bg-surface px-6 py-5 space-y-1`}
        >
          <p className="text-xs font-medium text-subtle uppercase tracking-wide">
            {priorityLabel[rec.priority]}
          </p>
          <h3 className="text-base font-semibold text-foreground">{rec.title}</h3>
          <p className="text-sm leading-6 text-muted">{rec.body}</p>
        </div>
      ))}

      <div className="pt-4">
        <Link
          href="/survey"
          className="text-sm font-medium underline underline-offset-4 text-foreground"
        >
          Retake the survey
        </Link>
      </div>
    </div>
  );
}
