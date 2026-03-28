"use client";

import { useState } from "react";
import RecommendationsBlock from "@/components/RecommendationsBlock";
import { OrganList } from "@/app/profile/OrganList";
import { Body } from "@/app/profile/Body";
import Button from "@/components/Button";
import type { Organ } from "@/app/profile/organs";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileClientProps {
  dict: Dictionary;
  organs: Organ[];
  lang: string;
}

export default function ProfileClient({ dict, organs, lang }: ProfileClientProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"diagnostics" | "recommendations">("diagnostics");
  const d = dict.profile;

  return (
    <main className="flex flex-1 flex-col items-center p-8">
      <div className="flex gap-2 mb-17.5">
        <Button onClick={() => setActiveTab("diagnostics")} color={activeTab === "diagnostics" ? "dark" : "light"} fullWidth={false}>
          {d.tabDiagnostics}
        </Button>
        <Button onClick={() => setActiveTab("recommendations")} color={activeTab === "recommendations" ? "dark" : "light"} fullWidth={false}>
          {d.tabRecommendations}
        </Button>
      </div>

      {activeTab === "diagnostics" && (
        <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
          <div className="flex gap-8 h-170">
            <Body organs={organs} onOrganClick={setOpenId} activeId={openId} />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-black">{d.diagnosticsTitle}</h2>
              <OrganList items={organs} openId={openId} setOpenId={setOpenId} />
            </div>
          </div>

          <div className="flex flex-col gap-6 pb-10">
            <h2 className="text-2xl font-semibold text-foreground">{d.summaryTitle}</h2>
            <p className="text-muted leading-7">{d.summaryP1}</p>
            <p className="text-muted leading-7">{d.summaryP2}</p>
            <p className="text-muted leading-7">{d.summaryP3}</p>
            <p className="text-muted leading-7 italic">
              <strong className="text-foreground">{d.summaryConclusion}</strong> {d.summaryP4}
            </p>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="w-full max-w-lg">
          <RecommendationsBlock dict={dict.recommendations} lang={lang} />
        </div>
      )}
    </main>
  );
}
