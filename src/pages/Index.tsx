import { useState, useRef } from "react";
import Header from "@/components/Header";
import FramePreview from "@/components/FramePreview";
import PhotoUploader from "@/components/PhotoUploader";
import ActionButtons from "@/components/ActionButtons";
import EditorCard from "@/components/EditorCard";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleReset = () => {
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gold-gradient mb-2">
              New Year Frame Editor
            </h1>
            <p className="text-muted-foreground">Create your personalized New Year 2026 greeting</p>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Frame Preview */}
            <div className="flex justify-center lg:sticky lg:top-8">
              <FramePreview uploadedImage={uploadedImage} canvasRef={canvasRef} />
            </div>

            {/* Editor Panel */}
            <div className="space-y-6">
              <EditorCard title="Upload Photo" step={1}>
                <PhotoUploader 
                  onImageUpload={setUploadedImage} 
                  uploadedImage={uploadedImage} 
                />
              </EditorCard>

              <EditorCard title="Download Your Frame" step={2}>
                <p className="text-muted-foreground text-sm mb-4">
                  {uploadedImage 
                    ? "Your frame is ready! Download it to share with friends and family."
                    : "Upload a photo first to create your personalized frame."}
                </p>
                <ActionButtons 
                  canvasRef={canvasRef} 
                  onReset={handleReset} 
                  hasImage={!!uploadedImage} 
                />
              </EditorCard>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border">
        <p className="text-muted-foreground text-sm">
          © 2026 Kishoreganj Polytechnic Institute. Made with{" "}
          <span className="text-gold">♥</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
