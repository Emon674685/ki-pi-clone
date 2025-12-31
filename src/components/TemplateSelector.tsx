import { TemplateId, TEMPLATES } from "@/types/frame";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const thumbnailColors = {
  gold: "from-amber-500 to-yellow-600",
  green: "from-emerald-500 to-green-600",
  purple: "from-purple-600 to-pink-500",
};

const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              "relative p-3 rounded-xl border-2 transition-all duration-300",
              "hover:scale-105 hover:shadow-lg",
              selected === template.id
                ? "border-gold bg-gold/10 shadow-md"
                : "border-border hover:border-gold/50"
            )}
          >
            <div
              className={cn(
                "w-full aspect-square rounded-lg mb-2 bg-gradient-to-br",
                thumbnailColors[template.thumbnail as keyof typeof thumbnailColors]
              )}
            />
            <p className="text-xs font-medium text-foreground truncate">{template.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{template.description}</p>
            
            {selected === template.id && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
