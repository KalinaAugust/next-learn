import type { Dictionary } from "@/app/[lang]/dictionaries";

export type SurveyData = {
  age: number;
  sex: "" | "male" | "female" | "other";
  heightCm: number;
  weightKg: number;
  activityLevel: "" | "sedentary" | "light" | "moderate" | "active";
  smoking: boolean;
  sleepHours: number;
  primaryConcern: "" | "weight" | "energy" | "stress" | "heart" | "general";
};

export type Recommendation = {
  title: string;
  body: string;
  priority: "high" | "medium" | "low";
};

function bmi(heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  return weightKg / (h * h);
}

export function getRecommendations(
  data: SurveyData,
  dict: Dictionary["recommendations"]
): Recommendation[] {
  const results: Recommendation[] = [];
  const bmiValue = bmi(data.heightCm, data.weightKg);

  if (data.smoking) {
    results.push({
      title: dict.quitSmoking.title,
      body: dict.quitSmoking.body,
      priority: "high",
    });
  }

  if (bmiValue > 30) {
    results.push({
      title: dict.weightObese.title,
      body: dict.weightObese.body.replace("{{bmi}}", bmiValue.toFixed(1)),
      priority: "high",
    });
  } else if (bmiValue > 25) {
    results.push({
      title: dict.weightOverweight.title,
      body: dict.weightOverweight.body.replace("{{bmi}}", bmiValue.toFixed(1)),
      priority: "medium",
    });
  }

  if (data.activityLevel === "sedentary") {
    results.push({
      title: dict.increaseActivity.title,
      body: dict.increaseActivity.body,
      priority: "medium",
    });
  }

  if (data.sleepHours < 7) {
    results.push({
      title: dict.sleepHygiene.title,
      body: dict.sleepHygiene.body,
      priority: "medium",
    });
  }

  if (data.primaryConcern === "stress") {
    results.push({
      title: dict.stressManagement.title,
      body: dict.stressManagement.body,
      priority: "medium",
    });
  }

  if (data.primaryConcern === "heart") {
    results.push({
      title: dict.cardiovascularHealth.title,
      body: dict.cardiovascularHealth.body,
      priority: data.smoking || bmiValue > 30 ? "high" : "medium",
    });
  }

  if (data.age >= 50) {
    results.push({
      title: dict.healthScreenings.title,
      body: dict.healthScreenings.body,
      priority: "medium",
    });
  }

  results.push({
    title: dict.generalWellness.title,
    body: dict.generalWellness.body,
    priority: "low",
  });

  results.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return results;
}
