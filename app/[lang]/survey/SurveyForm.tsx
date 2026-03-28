"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { SurveyData } from "@/lib/recommendations";
import Button from "@/components/Button";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const inputClass = "w-full rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-brand";
const selectClass = inputClass;
const labelClass = "block text-sm font-medium text-foreground";
const errorClass = "text-xs text-red-600";

const initialForm: SurveyData = {
  age: 52,
  sex: "male",
  heightCm: 170,
  weightKg: 95,
  activityLevel: "sedentary",
  smoking: true,
  sleepHours: 5,
  primaryConcern: "heart",
};

interface SurveyFormProps {
  dict: Dictionary["survey"];
  lang: string;
}

export default function SurveyForm({ dict, lang }: SurveyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SurveyData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SurveyData, string>>>({});

  function handleChange(key: keyof SurveyData, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof SurveyData, string>> = {};

    if (!form.age || form.age < 1 || form.age > 120) next.age = dict.errors.age;
    if (!form.sex) next.sex = dict.errors.sex;
    if (!form.heightCm || form.heightCm < 50 || form.heightCm > 300) next.heightCm = dict.errors.heightCm;
    if (!form.weightKg || form.weightKg < 10 || form.weightKg > 500) next.weightKg = dict.errors.weightKg;
    if (!form.activityLevel) next.activityLevel = dict.errors.activityLevel;
    if (!form.sleepHours || form.sleepHours < 1 || form.sleepHours > 24) next.sleepHours = dict.errors.sleepHours;
    if (!form.primaryConcern) next.primaryConcern = dict.errors.primaryConcern;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem("healthSurveyData", JSON.stringify(form));
    router.push(`/${lang}/profile`);
  }

  return (
    <main className="flex flex-col flex-1 items-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 rounded-xl border border-border bg-surface p-8"
      >
        <h1 className="text-2xl font-semibold text-foreground">{dict.title}</h1>
        <p className="text-sm text-muted">{dict.subtitle}</p>

        <div className="space-y-1">
          <label htmlFor="age" className={labelClass}>{dict.age}</label>
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
          <label htmlFor="sex" className={labelClass}>{dict.sex}</label>
          <select
            id="sex"
            value={form.sex}
            onChange={(e) => handleChange("sex", e.target.value)}
            className={selectClass}
          >
            <option value="">{dict.sexOptions.placeholder}</option>
            <option value="male">{dict.sexOptions.male}</option>
            <option value="female">{dict.sexOptions.female}</option>
            <option value="other">{dict.sexOptions.other}</option>
          </select>
          {errors.sex && <p className={errorClass}>{errors.sex}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="heightCm" className={labelClass}>{dict.heightCm}</label>
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
          <label htmlFor="weightKg" className={labelClass}>{dict.weightKg}</label>
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
          <label htmlFor="activityLevel" className={labelClass}>{dict.activityLevel}</label>
          <select
            id="activityLevel"
            value={form.activityLevel}
            onChange={(e) => handleChange("activityLevel", e.target.value)}
            className={selectClass}
          >
            <option value="">{dict.activityOptions.placeholder}</option>
            <option value="sedentary">{dict.activityOptions.sedentary}</option>
            <option value="light">{dict.activityOptions.light}</option>
            <option value="moderate">{dict.activityOptions.moderate}</option>
            <option value="active">{dict.activityOptions.active}</option>
          </select>
          {errors.activityLevel && <p className={errorClass}>{errors.activityLevel}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="smoking" className={labelClass}>{dict.smoking}</label>
          <select
            id="smoking"
            value={form.smoking ? "yes" : "no"}
            onChange={(e) => handleChange("smoking", e.target.value === "yes")}
            className={selectClass}
          >
            <option value="no">{dict.smokingOptions.no}</option>
            <option value="yes">{dict.smokingOptions.yes}</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="sleepHours" className={labelClass}>{dict.sleepHours}</label>
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
          <label htmlFor="primaryConcern" className={labelClass}>{dict.primaryConcern}</label>
          <select
            id="primaryConcern"
            value={form.primaryConcern}
            onChange={(e) => handleChange("primaryConcern", e.target.value)}
            className={selectClass}
          >
            <option value="">{dict.concernOptions.placeholder}</option>
            <option value="weight">{dict.concernOptions.weight}</option>
            <option value="energy">{dict.concernOptions.energy}</option>
            <option value="stress">{dict.concernOptions.stress}</option>
            <option value="heart">{dict.concernOptions.heart}</option>
            <option value="general">{dict.concernOptions.general}</option>
          </select>
          {errors.primaryConcern && <p className={errorClass}>{errors.primaryConcern}</p>}
        </div>

        <Button type="submit">{dict.submit}</Button>
      </form>
    </main>
  );
}
