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

export function getRecommendations(data: SurveyData): Recommendation[] {
  const results: Recommendation[] = [];
  const bmiValue = bmi(data.heightCm, data.weightKg);

  if (data.smoking) {
    results.push({
      title: "Quit Smoking",
      body: "Smoking significantly increases the risk of heart disease, stroke, and cancer. Consider speaking with your doctor about cessation programs or nicotine replacement therapy.",
      priority: "high",
    });
  }

  if (bmiValue > 30) {
    results.push({
      title: "Weight Management",
      body: `Your BMI is ${bmiValue.toFixed(1)}, which falls in the obese range. A combination of balanced nutrition and regular physical activity can help you reach a healthier weight. Consult a dietitian for a personalized plan.`,
      priority: "high",
    });
  } else if (bmiValue > 25) {
    results.push({
      title: "Healthy Weight Goal",
      body: `Your BMI is ${bmiValue.toFixed(1)}, slightly above the healthy range. Small changes — like reducing processed foods and adding 20–30 minutes of daily walking — can make a meaningful difference.`,
      priority: "medium",
    });
  }

  if (data.activityLevel === "sedentary") {
    results.push({
      title: "Increase Physical Activity",
      body: "A sedentary lifestyle raises the risk of cardiovascular disease and metabolic disorders. Aim for at least 150 minutes of moderate activity per week — start with short daily walks and build gradually.",
      priority: "medium",
    });
  }

  if (data.sleepHours < 7) {
    results.push({
      title: "Improve Sleep Hygiene",
      body: "Adults need 7–9 hours of sleep per night. Poor sleep is linked to weakened immunity, weight gain, and mood disorders. Try a consistent sleep schedule and limit screens before bed.",
      priority: "medium",
    });
  }

  if (data.primaryConcern === "stress") {
    results.push({
      title: "Stress Management",
      body: "Chronic stress affects both mental and physical health. Techniques such as mindfulness, deep breathing, regular exercise, and adequate rest can significantly reduce stress levels.",
      priority: "medium",
    });
  }

  if (data.primaryConcern === "heart") {
    results.push({
      title: "Cardiovascular Health",
      body: "For heart health, focus on a diet low in saturated fats and sodium, regular aerobic exercise, avoiding smoking, and monitoring blood pressure and cholesterol with your doctor.",
      priority: data.smoking || bmiValue > 30 ? "high" : "medium",
    });
  }

  if (data.age >= 50) {
    results.push({
      title: "Regular Health Screenings",
      body: "After age 50, routine screenings (blood pressure, cholesterol, colorectal cancer, bone density) become especially important. Schedule an annual check-up with your doctor.",
      priority: "medium",
    });
  }

  results.push({
    title: "General Wellness",
    body: "Stay hydrated (8 glasses of water daily), eat a balanced diet rich in fruits and vegetables, maintain social connections, and schedule regular medical check-ups.",
    priority: "low",
  });

  results.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return results;
}
