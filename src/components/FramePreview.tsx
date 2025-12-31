import { useRef, useEffect } from "react";

interface FramePreviewProps {
  uploadedImage: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const FramePreview = ({ uploadedImage, canvasRef }: FramePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      canvas.width = 600;
      canvas.height = 600;

      // Dark navy background
      const gradient = ctx.createLinearGradient(0, 0, 600, 600);
      gradient.addColorStop(0, "#1a2642");
      gradient.addColorStop(1, "#0f1729");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 600, 600);

      // Draw photo if uploaded
      if (uploadedImage) {
        const img = new Image();
        img.onload = () => {
          // Draw circular clipped photo
          ctx.save();
          ctx.beginPath();
          ctx.arc(300, 280, 130, 0, Math.PI * 2);
          ctx.clip();
          
          // Calculate aspect ratio to cover
          const aspectRatio = img.width / img.height;
          let drawWidth = 260;
          let drawHeight = 260;
          
          if (aspectRatio > 1) {
            drawWidth = 260 * aspectRatio;
          } else {
            drawHeight = 260 / aspectRatio;
          }
          
          ctx.drawImage(
            img,
            300 - drawWidth / 2,
            280 - drawHeight / 2,
            drawWidth,
            drawHeight
          );
          ctx.restore();

          // Draw gold circle border around photo
          ctx.beginPath();
          ctx.arc(300, 280, 135, 0, Math.PI * 2);
          ctx.strokeStyle = "#f5b818";
          ctx.lineWidth = 5;
          ctx.stroke();
        };
        img.src = uploadedImage;
      } else {
        // Placeholder circle
        ctx.beginPath();
        ctx.arc(300, 280, 130, 0, Math.PI * 2);
        ctx.fillStyle = "#2a3654";
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.arc(300, 280, 135, 0, Math.PI * 2);
        ctx.strokeStyle = "#f5b818";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Placeholder text
        ctx.fillStyle = "#8899aa";
        ctx.font = "18px Poppins, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Your Photo", 300, 285);
      }

      // Draw decorative stars
      const drawStar = (x: number, y: number, size: number) => {
        ctx.fillStyle = "#f5b818";
        ctx.font = `${size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("✦", x, y);
      };

      drawStar(120, 150, 28);
      drawStar(480, 150, 28);
      drawStar(100, 400, 22);
      drawStar(500, 400, 22);
      drawStar(150, 500, 18);
      drawStar(450, 500, 18);

      // Draw "HAPPY" text
      ctx.fillStyle = "#f5b818";
      ctx.font = "bold 42px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText("HAPPY", 300, 80);

      // Draw "NEW YEAR" text
      ctx.font = "bold 56px 'Playfair Display', serif";
      ctx.fillText("NEW YEAR", 300, 140);

      // Draw "2026" with large styling
      ctx.font = "bold 48px 'Playfair Display', serif";
      ctx.fillText("2026", 300, 460);

      // Draw quote
      ctx.fillStyle = "#e8d5a3";
      ctx.font = "italic 13px 'Playfair Display', serif";
      ctx.textAlign = "center";
      
      // Quote marks
      ctx.fillStyle = "#f5b818";
      ctx.font = "bold 24px serif";
      ctx.fillText('"', 140, 510);
      ctx.fillText('"', 460, 550);

      // Quote text - split into lines
      ctx.fillStyle = "#c8b896";
      ctx.font = "12px Poppins, sans-serif";
      const quoteLines = [
        "Wishing you a New Year filled with success,",
        "prosperity, and new opportunities. May 2026",
        "be a year of great achievements for all of us.",
        "Happy New Year!"
      ];
      quoteLines.forEach((line, index) => {
        ctx.fillText(line, 300, 515 + index * 16);
      });

      // Institute name at bottom
      ctx.fillStyle = "#f5b818";
      ctx.font = "600 14px Poppins, sans-serif";
      ctx.fillText("Kishoreganj Polytechnic Institute", 300, 590);
    }
  }, [uploadedImage, canvasRef]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center">
      <div className="relative border-gold-gradient rounded-xl overflow-hidden glow-gold">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto"
          style={{ maxWidth: "400px" }}
        />
      </div>
      
      {/* Decorative floating stars around frame */}
      <div className="absolute -top-4 -left-4 text-gold text-2xl star-twinkle" style={{ animationDelay: "0s" }}>✦</div>
      <div className="absolute -top-2 -right-6 text-gold text-xl star-twinkle" style={{ animationDelay: "0.5s" }}>✦</div>
      <div className="absolute -bottom-4 -left-6 text-gold text-lg star-twinkle" style={{ animationDelay: "1s" }}>✦</div>
      <div className="absolute -bottom-2 -right-4 text-gold text-2xl star-twinkle" style={{ animationDelay: "0.3s" }}>✦</div>
    </div>
  );
};

export default FramePreview;
