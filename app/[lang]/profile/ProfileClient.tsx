"use client";

import { useState } from "react";
import RecommendationsBlock from "@/components/RecommendationsBlock";
import { OrganList } from "./OrganList";
import { Body } from "./Body";
import Button from "@/components/Button";
import type { Organ } from "./organs";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileClientProps {
  dict: Dictionary;
  organs: Organ[];
  lang: string;
}

export default function ProfileClient({ dict, organs, lang }: ProfileClientProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"diagnostics" | "recommendations" | "summary">("diagnostics");
  const { tabDiagnostics, tabRecommendations, tabSummary, diagnosticsTitle, summaryTitle, summaryP1, summaryP2, summaryP3, summaryP4, summaryConclusion } = dict.profile;
  const { recommendations } = dict;

  return (
    <main className="flex flex-1 flex-col items-center p-8">
      <div className="flex gap-2 mb-17.5">
        <Button onClick={() => setActiveTab("diagnostics")} color={activeTab === "diagnostics" ? "dark" : "light"} fullWidth={false}>
          {tabDiagnostics}
        </Button>
        <Button onClick={() => setActiveTab("recommendations")} color={activeTab === "recommendations" ? "dark" : "light"} fullWidth={false}>
          {tabRecommendations}
        </Button>
        <Button onClick={() => setActiveTab("summary")} color={activeTab === "summary" ? "dark" : "light"} fullWidth={false}>
          {tabSummary}
        </Button>
      </div>

      {activeTab === "diagnostics" && (
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
          <div className="flex gap-8 h-170">
            <Body organs={organs} onOrganClick={setOpenId} activeId={openId} />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-black">{diagnosticsTitle}</h2>
              <OrganList items={organs} openId={openId} setOpenId={setOpenId} />
            </div>
          </div>

        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="w-full max-w-lg">
          <RecommendationsBlock dict={recommendations} lang={lang} />
        </div>
      )}

      {activeTab === "summary" && (
        <div className="flex flex-col gap-6 pb-10 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-foreground">{summaryTitle}</h2>
          <p className="text-muted leading-7">{summaryP1}</p>
          <p className="text-muted leading-7">{summaryP2}</p>
          <p className="text-muted leading-7">{summaryP3}</p>
          <p className="text-muted leading-7 italic">
            <strong className="text-foreground">{summaryConclusion}</strong> {summaryP4}
          </p>
        </div>
      )}
    </main>
  );
}
