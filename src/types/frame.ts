export type TemplateId = "kpi-gold" | "pixelora-green" | "cosmic-purple";

export interface FrameTemplate {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
}

export interface FrameData {
  uploadedImage: string | null;
  name: string;
  designation: string;
  wishingText: string;
  template: TemplateId;
}

export const DEFAULT_WISHING_TEXT = "Wishing you a New Year filled with success, prosperity, and new opportunities. May 2026 be a year of great achievements for all of us. Happy New Year!";

export const TEMPLATES: FrameTemplate[] = [
  {
    id: "kpi-gold",
    name: "KPI Gold",
    description: "Classic gold on navy",
    thumbnail: "gold",
  },
  {
    id: "pixelora-green",
    name: "Modern Green",
    description: "Fresh green geometric",
    thumbnail: "green",
  },
  {
    id: "cosmic-purple",
    name: "Cosmic Purple",
    description: "Galaxy gradient style",
    thumbnail: "purple",
  },
];
