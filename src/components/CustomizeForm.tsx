import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DEFAULT_WISHING_TEXT } from "@/types/frame";

interface CustomizeFormProps {
  name: string;
  designation: string;
  wishingText: string;
  onNameChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
  onWishingTextChange: (value: string) => void;
}

const CustomizeForm = ({
  name,
  designation,
  wishingText,
  onNameChange,
  onDesignationChange,
  onWishingTextChange,
}: CustomizeFormProps) => {
  return (
    <div className="w-full">
      <div className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="name" className="text-xs sm:text-sm text-muted-foreground">
              Your Name (optional)
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="bg-secondary border-border focus:border-gold text-sm"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="designation" className="text-xs sm:text-sm text-muted-foreground">
              Designation (optional)
            </Label>
            <Input
              id="designation"
              placeholder="e.g. Student, Teacher"
              value={designation}
              onChange={(e) => onDesignationChange(e.target.value)}
              className="bg-secondary border-border focus:border-gold text-sm"
            />
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="wishing" className="text-xs sm:text-sm text-muted-foreground">
            Custom Wishing Text (optional)
          </Label>
          <Textarea
            id="wishing"
            placeholder={DEFAULT_WISHING_TEXT}
            value={wishingText}
            onChange={(e) => onWishingTextChange(e.target.value)}
            className="bg-secondary border-border focus:border-gold min-h-[70px] sm:min-h-[80px] resize-none text-xs sm:text-sm"
            rows={3}
          />
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Leave empty to use the default wishing text
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomizeForm;
