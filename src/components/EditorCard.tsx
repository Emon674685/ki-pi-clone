import { ReactNode } from "react";

interface EditorCardProps {
  title: string;
  step: number;
  children: ReactNode;
}

const EditorCard = ({ title, step, children }: EditorCardProps) => {
  return (
    <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gold font-display text-lg">Step {step}:</span>
        <h2 className="text-xl font-semibold text-foreground font-display">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default EditorCard;
