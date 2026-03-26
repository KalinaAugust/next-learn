"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { SurveyData } from "@/lib/recommendations";

const initialForm: SurveyData = {
  age: 0,
  sex: "",
  heightCm: 0,
  weightKg: 0,
  activityLevel: "",
  smoking: false,
  sleepHours: 0,
  primaryConcern: "",
};

export default function SurveyPage() {
  const router = useRouter();
  const [form, setForm] = useState<SurveyData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SurveyData, string>>>({});

  function handleChange(key: keyof SurveyData, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof SurveyData, string>> = {};

    if (!form.age || form.age < 1 || form.age > 120) next.age = "Please enter a valid age (1–120)";
    if (!form.sex) next.sex = "Please select your biological sex";
    if (!form.heightCm || form.heightCm < 50 || form.heightCm > 300) next.heightCm = "Please enter a valid height (50–300 cm)";
    if (!form.weightKg || form.weightKg < 10 || form.weightKg > 500) next.weightKg = "Please enter a valid weight (10–500 kg)";
    if (!form.activityLevel) next.activityLevel = "Please select your activity level";
    if (!form.sleepHours || form.sleepHours < 1 || form.sleepHours > 24) next.sleepHours = "Please enter valid sleep hours (1–24)";
    if (!form.primaryConcern) next.primaryConcern = "Please select your primary health concern";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem("healthSurveyData", JSON.stringify(form));
    router.push("/recommendations");
  }

  const inputClass = "w-full rounded border border-black/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-black dark:border-white/20 dark:focus:border-white";
  const selectClass = inputClass;
  const labelClass = "block text-sm font-medium";
  const errorClass = "text-xs text-red-600 dark:text-red-400";

  return (
    <main className="flex flex-col flex-1 items-center bg-zinc-50 dark:bg-black py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-8"
      >
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Health Survey</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Fill in your details below to receive personalised health recommendations.
        </p>

        <div className="space-y-1">
          <label htmlFor="age" className={labelClass}>Age</label>
          <input
            id="age"
            type="number"
            value={form.age || ""}
            onChange={(e) => handleChange("age", Number(e.target.value))}
            className={inputClass}
          />
          {errors.age && <p className={errorClass}>{errors.age}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="sex" className={labelClass}>Biological sex</label>
          <select
            id="sex"
            value={form.sex}
            onChange={(e) => handleChange("sex", e.target.value)}
            className={selectClass}
          >
            <option value="">Select…</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Prefer not to say</option>
          </select>
          {errors.sex && <p className={errorClass}>{errors.sex}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="heightCm" className={labelClass}>Height (cm)</label>
          <input
            id="heightCm"
            type="number"
            value={form.heightCm || ""}
            onChange={(e) => handleChange("heightCm", Number(e.target.value))}
            className={inputClass}
          />
          {errors.heightCm && <p className={errorClass}>{errors.heightCm}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="weightKg" className={labelClass}>Weight (kg)</label>
          <input
            id="weightKg"
            type="number"
            value={form.weightKg || ""}
            onChange={(e) => handleChange("weightKg", Number(e.target.value))}
            className={inputClass}
          />
          {errors.weightKg && <p className={errorClass}>{errors.weightKg}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="activityLevel" className={labelClass}>Activity level</label>
          <select
            id="activityLevel"
            value={form.activityLevel}
            onChange={(e) => handleChange("activityLevel", e.target.value)}
            className={selectClass}
          >
            <option value="">Select…</option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (1–3 days/week)</option>
            <option value="moderate">Moderate (3–5 days/week)</option>
            <option value="active">Active (6–7 days/week)</option>
          </select>
          {errors.activityLevel && <p className={errorClass}>{errors.activityLevel}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="smoking" className={labelClass}>Do you smoke?</label>
          <select
            id="smoking"
            value={form.smoking ? "yes" : "no"}
            onChange={(e) => handleChange("smoking", e.target.value === "yes")}
            className={selectClass}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="sleepHours" className={labelClass}>Average sleep (hours/night)</label>
          <input
            id="sleepHours"
            type="number"
            value={form.sleepHours || ""}
            onChange={(e) => handleChange("sleepHours", Number(e.target.value))}
            className={inputClass}
          />
          {errors.sleepHours && <p className={errorClass}>{errors.sleepHours}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="primaryConcern" className={labelClass}>Primary health concern</label>
          <select
            id="primaryConcern"
            value={form.primaryConcern}
            onChange={(e) => handleChange("primaryConcern", e.target.value)}
            className={selectClass}
          >
            <option value="">Select…</option>
            <option value="weight">Weight management</option>
            <option value="energy">Energy & fatigue</option>
            <option value="stress">Stress & mental health</option>
            <option value="heart">Heart health</option>
            <option value="general">General wellness</option>
          </select>
          {errors.primaryConcern && <p className={errorClass}>{errors.primaryConcern}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Get My Recommendations
        </button>
      </form>
    </main>
  );
}
