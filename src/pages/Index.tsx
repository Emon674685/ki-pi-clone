import { useState, useRef } from "react";
import Header from "@/components/Header";
import FramePreview from "@/components/FramePreview";
import PhotoUploader from "@/components/PhotoUploader";
import TemplateSelector from "@/components/TemplateSelector";
import CustomizeForm from "@/components/CustomizeForm";
import ActionButtons from "@/components/ActionButtons";
import EditorCard from "@/components/EditorCard";
import { TemplateId } from "@/types/frame";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("kpi-gold");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [wishingText, setWishingText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleReset = () => {
    setUploadedImage(null);
    setName("");
    setDesignation("");
    setWishingText("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gold-gradient mb-1 sm:mb-2">
              New Year Frame Editor
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Create your personalized New Year 2026 greeting</p>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-start">
            {/* Frame Preview */}
            <div className="flex justify-center lg:sticky lg:top-8 order-2 lg:order-1">
              <FramePreview 
                uploadedImage={uploadedImage} 
                canvasRef={canvasRef}
                template={selectedTemplate}
                name={name}
                designation={designation}
                wishingText={wishingText}
              />
            </div>

            {/* Editor Panel */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-2">
              <EditorCard title="Choose Template" step={1}>
                <TemplateSelector
                  selected={selectedTemplate}
                  onSelect={setSelectedTemplate}
                />
              </EditorCard>

              <EditorCard title="Upload Photo" step={2}>
                <PhotoUploader 
                  onImageUpload={setUploadedImage} 
                  uploadedImage={uploadedImage} 
                />
              </EditorCard>

              <EditorCard title="Personalize" step={3}>
                <CustomizeForm
                  name={name}
                  designation={designation}
                  wishingText={wishingText}
                  onNameChange={setName}
                  onDesignationChange={setDesignation}
                  onWishingTextChange={setWishingText}
                />
              </EditorCard>

              <EditorCard title="Download Your Frame" step={4}>
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
      <footer className="py-4 text-center border-t border-border">
        <p className="text-muted-foreground text-sm mb-1">
          © 2026 Kishoreganj Polytechnic Institute
        </p>
        <p className="text-muted-foreground/60 text-[10px]">
          Powered by Emon Ahammed
        </p>
      </footer>
    </div>
  );
};

export default Index;
