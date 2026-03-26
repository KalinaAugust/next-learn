"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getRecommendations, type SurveyData, type Recommendation } from "@/lib/recommendations";

const priorityBorder: Record<Recommendation["priority"], string> = {
  high: "border-l-red-500",
  medium: "border-l-amber-400",
  low: "border-l-green-500",
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

export default function RecommendationsPage() {
  const raw = useSyncExternalStore(() => () => {}, getSnapshot, getServerSnapshot);

  // null = SSR, not yet hydrated
  if (raw === null) return null;

  if (!raw) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center gap-4 px-4">
        <p className="text-zinc-600 dark:text-zinc-400">Please complete the survey first.</p>
        <Link
          href="/survey"
          className="text-sm font-medium underline underline-offset-4 text-black dark:text-zinc-50"
        >
          Go to Survey
        </Link>
      </main>
    );
  }

  const data: SurveyData = JSON.parse(raw);
  const recommendations = getRecommendations(data);

  return (
    <main className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Your Recommendations</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 pb-2">
          Based on your survey responses. Always consult a qualified healthcare professional before making changes to your health routine.
        </p>

        {recommendations.map((rec, i) => (
          <div
            key={i}
            className={`rounded-xl border border-black/10 dark:border-white/10 border-l-4 ${priorityBorder[rec.priority]} bg-white dark:bg-black px-6 py-5 space-y-1`}
          >
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
              {priorityLabel[rec.priority]}
            </p>
            <h2 className="text-base font-semibold text-black dark:text-zinc-50">{rec.title}</h2>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{rec.body}</p>
          </div>
        ))}

        <div className="pt-4">
          <Link
            href="/survey"
            className="text-sm font-medium underline underline-offset-4 text-black dark:text-zinc-50"
          >
            Retake the survey
          </Link>
        </div>
      </div>
    </main>
  );
}
