import { ReactNode } from "react";

interface EditorCardProps {
  title: string;
  step: number;
  children: ReactNode;
}

const EditorCard = ({ title, step, children }: EditorCardProps) => {
  return (
    <div className="w-full bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <span className="text-gold font-display text-sm sm:text-base">Step {step}:</span>
        <h2 className="text-base sm:text-lg font-semibold text-foreground font-display">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default EditorCard;
