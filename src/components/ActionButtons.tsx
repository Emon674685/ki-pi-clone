import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onReset: () => void;
  hasImage: boolean;
}

const ActionButtons = ({ canvasRef, onReset, hasImage }: ActionButtonsProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "new-year-2026-kpi-frame.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    toast({
      title: "Frame Downloaded!",
      description: "Your New Year frame has been saved",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      <Button
        onClick={handleDownload}
        disabled={!hasImage}
        className="flex-1 bg-gold hover:bg-gold-dark text-primary-foreground font-semibold py-5 sm:py-6 text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed pulse-glow"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Download Frame
      </Button>
      
      <Button
        onClick={onReset}
        variant="outline"
        className="flex-1 border-border hover:border-gold hover:bg-secondary text-foreground py-5 sm:py-6 text-sm sm:text-base transition-all duration-300"
      >
        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Start Over
      </Button>
    </div>
  );
};

export default ActionButtons;
