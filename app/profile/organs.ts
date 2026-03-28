export type TagType = 'urgent' | 'attention' | 'stable' | 'monitor' | 'consult' | 'lifestyle';

export interface Tag {
  type: TagType;
  label: string;
}

export interface Organ {
  id: string;
  title: string;
  icon: string;
  description: string;
  status: 'ok' | 'warning' | 'critical';
  tags: Tag[];
  items: string[];
}

export const organs: Organ[] = [
  // { id: "stomach", title: "Stomach", icon: "/icons/stomach.png", description: "Your stomach health indicators are within normal range, digestion is proceeding efficiently, and acid levels are well-balanced with no signs of inflammation or irritation detected.", status: "warning", tags: [], items: [] },
  { id: "knee", title: "Knee", icon: "/icons/knee.png", description: "Joint mobility and cartilage condition appear stable, synovial fluid levels are adequate, and no signs of wear or early degenerative changes have been observed in recent assessments.", status: "warning", tags: [{ type: "attention", label: "Attention" }, { type: "monitor", label: "Monitor" }], items: ["Moderate cartilage thinning detected in the right knee", "Synovial fluid levels slightly below optimal range", "Recommend low-impact exercise to preserve joint mobility", "Follow-up imaging advised in 3 months"] },
  { id: "brain", title: "Brain", icon: "/icons/brain.png", description: "Cognitive function markers show no signs of concern, neural activity patterns are within expected ranges, and memory consolidation along with focus metrics remain consistently healthy.", status: "critical", tags: [{ type: "urgent", label: "Urgent" }, { type: "consult", label: "Consult Doctor" }], items: ["Elevated stress markers affecting prefrontal cortex activity", "Sleep quality directly impacting memory consolidation", "Recommend immediate neurologist consultation", "Reduce screen time and prioritize deep sleep"] },
  { id: "bladder", title: "Bladder", icon: "/icons/bladder.png", description: "Urinary tract function is operating as expected, bladder capacity and muscle tone are normal, and there are no indicators of infection or structural irregularities present.", status: "ok", tags: [{ type: "stable", label: "Stable" }, { type: "lifestyle", label: "Lifestyle" }], items: ["Bladder capacity within normal range", "No signs of infection or inflammation", "Maintain adequate daily fluid intake (2–2.5L)", "Pelvic floor exercises recommended for long-term health"] },
  { id: "liver", title: "Liver", icon: "/icons/liver.png", description: "Liver enzyme levels are within the healthy reference range, detoxification processes are functioning optimally, and bile production supports healthy fat metabolism without any anomalies.", status: "critical", tags: [{ type: "urgent", label: "Urgent" }, { type: "attention", label: "Attention" }, { type: "consult", label: "Consult Doctor" }], items: ["ALT and AST enzyme levels significantly elevated", "Reduced detoxification efficiency detected", "Alcohol consumption must be stopped immediately", "Blood panel retest required within 2 weeks"] },
  // { id: "kidneys", title: "Kidneys", icon: "/icons/kidneys.png", description: "Kidney filtration rate is at a healthy level, electrolyte balance is well-maintained, and waste removal efficiency is performing as expected with no signs of reduced function.", status: "warning", tags: [], items: [] },
  { id: "heart", title: "Heart", icon: "/icons/heart.png", description: "Cardiovascular indicators suggest good overall heart health, resting heart rate and rhythm are stable, and blood pressure readings remain consistently within the optimal range.", status: "ok", tags: [{ type: "stable", label: "Stable" }, { type: "lifestyle", label: "Lifestyle" }], items: ["Resting heart rate: 68 bpm — optimal", "Blood pressure: 118/76 mmHg — within healthy range", "Cardio training 3×/week recommended for maintenance", "Continue current diet and stress management routine"] },
  { id: "intestines", title: "Intestines", icon: "/icons/intestines.png", description: "Digestive system activity appears balanced and regular, microbiome diversity is at a healthy level, and nutrient absorption efficiency shows no signs of inflammation or obstruction.", status: "critical", tags: [{ type: "urgent", label: "Urgent" }, { type: "monitor", label: "Monitor" }], items: ["Significant reduction in microbiome diversity detected", "Inflammatory markers elevated in the lower intestine", "Increase dietary fiber and probiotic intake immediately", "Colonoscopy screening recommended within 1 month"] },
  { id: "lungs", title: "Lungs", icon: "/icons/lungs.png", description: "Respiratory capacity and oxygen exchange are functioning well, lung volume measurements are within normal parameters, and airway resistance shows no signs of chronic or acute issues.", status: "warning", tags: [{ type: "attention", label: "Attention" }, { type: "lifestyle", label: "Lifestyle" }], items: ["Lung capacity slightly reduced compared to last assessment", "Mild airway sensitivity observed during high-intensity exercise", "Avoid polluted environments and second-hand smoke", "Breathing exercises (pranayama) may improve capacity"] },
  { id: "hemoglobin", title: "Hemoglobin", icon: "/icons/hemoglobin.png", description: "Blood hemoglobin levels are within the recommended range, red blood cell count is adequate for efficient oxygen transport, and iron saturation remains stable with no signs of anemia.", status: "warning", tags: [{ type: "attention", label: "Attention" }, { type: "monitor", label: "Monitor" }, { type: "lifestyle", label: "Lifestyle" }], items: ["Hemoglobin at lower boundary of the normal range", "Iron saturation trending downward over past 2 months", "Increase iron-rich foods: red meat, legumes, leafy greens", "Consider iron supplementation after next blood test"] },
];
