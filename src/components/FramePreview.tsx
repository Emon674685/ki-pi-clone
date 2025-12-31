import { useRef, useEffect } from "react";
import { TemplateId, DEFAULT_WISHING_TEXT } from "@/types/frame";
import kpiLogo from "@/assets/kpi-logo.jpg";

interface FramePreviewProps {
  uploadedImage: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  template: TemplateId;
  name: string;
  designation: string;
  wishingText: string;
}

const FramePreview = ({ 
  uploadedImage, 
  canvasRef, 
  template,
  name,
  designation,
  wishingText 
}: FramePreviewProps) => {
  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Preload logo
    const logo = new Image();
    logo.src = kpiLogo;
    logo.onload = () => {
      logoRef.current = logo;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    const finalWishingText = wishingText.trim() || DEFAULT_WISHING_TEXT;

    if (template === "kpi-gold") {
      drawKPIGoldTemplate(ctx, canvas, uploadedImage, name, designation, finalWishingText, logoRef.current);
    } else if (template === "pixelora-green") {
      drawPixeloraGreenTemplate(ctx, canvas, uploadedImage, name, designation, finalWishingText, logoRef.current);
    } else if (template === "cosmic-purple") {
      drawCosmicPurpleTemplate(ctx, canvas, uploadedImage, name, designation, finalWishingText, logoRef.current);
    }
  }, [uploadedImage, canvasRef, template, name, designation, wishingText]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative border-gold-gradient rounded-xl overflow-hidden glow-gold">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto"
          style={{ maxWidth: "400px" }}
        />
      </div>
      
      <div className="absolute -top-4 -left-4 text-gold text-2xl star-twinkle" style={{ animationDelay: "0s" }}>✦</div>
      <div className="absolute -top-2 -right-6 text-gold text-xl star-twinkle" style={{ animationDelay: "0.5s" }}>✦</div>
      <div className="absolute -bottom-4 -left-6 text-gold text-lg star-twinkle" style={{ animationDelay: "1s" }}>✦</div>
      <div className="absolute -bottom-2 -right-4 text-gold text-2xl star-twinkle" style={{ animationDelay: "0.3s" }}>✦</div>
    </div>
  );
};

function drawKPIGoldTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  uploadedImage: string | null,
  name: string,
  designation: string,
  wishingText: string,
  logo: HTMLImageElement | null
) {
  // Dark navy background
  const gradient = ctx.createLinearGradient(0, 0, 600, 600);
  gradient.addColorStop(0, "#1a2642");
  gradient.addColorStop(1, "#0f1729");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 600);

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

  // Draw "HAPPY" text
  ctx.fillStyle = "#f5b818";
  ctx.font = "bold 42px 'Playfair Display', serif";
  ctx.textAlign = "center";
  ctx.fillText("HAPPY", 300, 80);

  // Draw "NEW YEAR" text
  ctx.font = "bold 56px 'Playfair Display', serif";
  ctx.fillText("NEW YEAR", 300, 140);

  // Draw photo
  drawCircularPhoto(ctx, uploadedImage, 300, 280, 120, "#f5b818", 5);

  // Draw "2026"
  ctx.fillStyle = "#f5b818";
  ctx.font = "bold 48px 'Playfair Display', serif";
  ctx.textAlign = "center";
  ctx.fillText("2026", 300, 440);

  // Draw name and designation
  if (name || designation) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Poppins, sans-serif";
    ctx.fillText(name || "", 300, 475);
    if (designation) {
      ctx.fillStyle = "#c8b896";
      ctx.font = "14px Poppins, sans-serif";
      ctx.fillText(designation, 300, 495);
    }
  }

  // Quote
  ctx.fillStyle = "#f5b818";
  ctx.font = "bold 20px serif";
  ctx.fillText('"', 140, 520);
  ctx.fillText('"', 460, 565);

  ctx.fillStyle = "#c8b896";
  ctx.font = "11px Poppins, sans-serif";
  wrapText(ctx, wishingText, 300, 530, 280, 14);

  // Institute name
  ctx.fillStyle = "#f5b818";
  ctx.font = "600 13px Poppins, sans-serif";
  ctx.fillText("Kishoreganj Polytechnic Institute", 300, 590);
}

function drawPixeloraGreenTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  uploadedImage: string | null,
  name: string,
  designation: string,
  wishingText: string,
  logo: HTMLImageElement | null
) {
  // Cream/off-white background
  ctx.fillStyle = "#f5f5f0";
  ctx.fillRect(0, 0, 600, 600);

  // Green geometric shapes
  ctx.fillStyle = "#00c853";
  
  // Top right corner triangle
  ctx.beginPath();
  ctx.moveTo(500, 0);
  ctx.lineTo(600, 0);
  ctx.lineTo(600, 100);
  ctx.closePath();
  ctx.fill();

  // Top right bar
  ctx.fillStyle = "#00c853";
  ctx.fillRect(530, 30, 8, 80);

  // Bottom left polygons
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(80, 520);
  ctx.lineTo(100, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();

  // Bottom right polygon
  ctx.beginPath();
  ctx.moveTo(480, 600);
  ctx.lineTo(520, 540);
  ctx.lineTo(600, 560);
  ctx.lineTo(600, 600);
  ctx.closePath();
  ctx.fill();

  // Dark header text "Limitless, Together"
  ctx.fillStyle = "#333333";
  ctx.font = "italic 16px 'Playfair Display', serif";
  ctx.textAlign = "left";
  ctx.fillText("Limitless, Together", 40, 50);

  // HAPPY NEW YEAR text
  ctx.fillStyle = "#00c853";
  ctx.font = "bold 48px 'Playfair Display', serif";
  ctx.textAlign = "left";
  ctx.fillText("HAPPY", 40, 150);
  ctx.font = "bold 56px 'Playfair Display', serif";
  ctx.fillText("NEW YEAR", 40, 210);
  
  // 2026 with dark color
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "bold 72px 'Playfair Display', serif";
  ctx.fillText("2026", 40, 290);

  // Photo circle on the right
  drawCircularPhoto(ctx, uploadedImage, 450, 250, 100, "#00c853", 6);

  // Small sparkles
  ctx.fillStyle = "#00c853";
  ctx.font = "14px sans-serif";
  ctx.fillText("✦", 300, 180);
  ctx.fillText("✦", 320, 260);

  // Quote section (bottom half)
  ctx.fillStyle = "#f0f0e8";
  ctx.fillRect(0, 400, 600, 200);

  // Green quote marks
  ctx.fillStyle = "#00c853";
  ctx.font = "bold 48px serif";
  ctx.textAlign = "left";
  ctx.fillText("❝", 40, 470);
  ctx.textAlign = "right";
  ctx.fillText("❞", 560, 560);

  // Quote text
  ctx.fillStyle = "#333333";
  ctx.font = "15px Poppins, sans-serif";
  ctx.textAlign = "center";
  wrapText(ctx, wishingText, 300, 470, 400, 22);

  // Name and designation
  if (name || designation) {
    ctx.fillStyle = "#00c853";
    ctx.font = "bold 16px Poppins, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(name || "", 100, 560);
    if (designation) {
      ctx.fillStyle = "#666666";
      ctx.font = "13px Poppins, sans-serif";
      ctx.fillText(designation, 100, 578);
    }
  }

  // Logo area (KPI)
  if (logo) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(540, 50, 25, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logo, 515, 25, 50, 50);
    ctx.restore();
  }

  // Institute name
  ctx.fillStyle = "#333333";
  ctx.font = "12px Poppins, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("▸ Kishoreganj Polytechnic Institute", 40, 590);
}

function drawCosmicPurpleTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  uploadedImage: string | null,
  name: string,
  designation: string,
  wishingText: string,
  logo: HTMLImageElement | null
) {
  // Purple gradient background
  const gradient = ctx.createLinearGradient(0, 0, 600, 600);
  gradient.addColorStop(0, "#1a0a2e");
  gradient.addColorStop(0.5, "#2d1b4e");
  gradient.addColorStop(1, "#0f051d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 600);

  // Add some stars/dots for cosmic effect
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 600;
    const y = Math.random() * 600;
    const r = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Glowing orbs
  const orb1 = ctx.createRadialGradient(100, 100, 0, 100, 100, 150);
  orb1.addColorStop(0, "rgba(138, 43, 226, 0.3)");
  orb1.addColorStop(1, "transparent");
  ctx.fillStyle = orb1;
  ctx.fillRect(0, 0, 250, 250);

  const orb2 = ctx.createRadialGradient(500, 500, 0, 500, 500, 200);
  orb2.addColorStop(0, "rgba(255, 0, 128, 0.2)");
  orb2.addColorStop(1, "transparent");
  ctx.fillStyle = orb2;
  ctx.fillRect(300, 300, 300, 300);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 38px 'Playfair Display', serif";
  ctx.textAlign = "center";
  ctx.fillText("HAPPY", 300, 70);
  
  // Gradient NEW YEAR text effect
  const textGrad = ctx.createLinearGradient(100, 100, 500, 140);
  textGrad.addColorStop(0, "#ff6ec7");
  textGrad.addColorStop(0.5, "#9b59b6");
  textGrad.addColorStop(1, "#3498db");
  ctx.fillStyle = textGrad;
  ctx.font = "bold 58px 'Playfair Display', serif";
  ctx.fillText("NEW YEAR", 300, 130);

  // 2026
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 50px 'Playfair Display', serif";
  ctx.fillText("2026", 300, 200);

  // Photo with glowing border
  drawCircularPhoto(ctx, uploadedImage, 300, 320, 110, "#9b59b6", 5);
  
  // Outer glow ring
  ctx.strokeStyle = "rgba(155, 89, 182, 0.3)";
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.arc(300, 320, 130, 0, Math.PI * 2);
  ctx.stroke();

  // Name and designation
  if (name || designation) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Poppins, sans-serif";
    ctx.fillText(name || "", 300, 470);
    if (designation) {
      ctx.fillStyle = "#c9a0dc";
      ctx.font = "14px Poppins, sans-serif";
      ctx.fillText(designation, 300, 492);
    }
  }

  // Sparkle decorations
  ctx.fillStyle = "#ff6ec7";
  ctx.font = "20px sans-serif";
  ctx.fillText("✦", 180, 280);
  ctx.fillText("✦", 420, 360);
  ctx.fillStyle = "#3498db";
  ctx.fillText("✦", 200, 380);
  ctx.fillText("✦", 400, 260);

  // Quote
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.font = "12px Poppins, sans-serif";
  ctx.textAlign = "center";
  wrapText(ctx, wishingText, 300, 520, 400, 16);

  // Institute name
  ctx.fillStyle = "#c9a0dc";
  ctx.font = "600 12px Poppins, sans-serif";
  ctx.fillText("Kishoreganj Polytechnic Institute", 300, 585);

  // Logo
  if (logo) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(300, 595, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.restore();
  }
}

function drawCircularPhoto(
  ctx: CanvasRenderingContext2D,
  imageSrc: string | null,
  x: number,
  y: number,
  radius: number,
  borderColor: string,
  borderWidth: number
) {
  if (imageSrc) {
    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();
      
      const aspectRatio = img.width / img.height;
      let drawWidth = radius * 2;
      let drawHeight = radius * 2;
      
      if (aspectRatio > 1) {
        drawWidth = radius * 2 * aspectRatio;
      } else {
        drawHeight = (radius * 2) / aspectRatio;
      }
      
      ctx.drawImage(img, x - drawWidth / 2, y - drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      // Border
      ctx.beginPath();
      ctx.arc(x, y, radius + borderWidth / 2, 0, Math.PI * 2);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
    };
    img.src = imageSrc;
  } else {
    // Placeholder
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(128, 128, 128, 0.3)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius + borderWidth / 2, 0, Math.PI * 2);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();

    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    ctx.font = "16px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Your Photo", x, y + 5);
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

export default FramePreview;
