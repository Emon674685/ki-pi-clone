import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  uploadedImage: string | null;
}

const PhotoUploader = ({ onImageUpload, uploadedImage }: PhotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG or JPG)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
      toast({
        title: "Photo uploaded!",
        description: "Your photo has been added to the frame",
      });
    };
    reader.readAsDataURL(file);
  }, [onImageUpload, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div className="w-full">

      <label
        htmlFor="photo-upload"
        className={`
          relative flex flex-col items-center justify-center w-full h-48 
          border-2 border-dashed rounded-xl cursor-pointer
          transition-all duration-300 ease-out
          ${isDragging 
            ? "border-gold bg-gold/10 scale-[1.02]" 
            : "border-border hover:border-gold/50 hover:bg-secondary/30"
          }
          ${uploadedImage ? "border-gold bg-gold/5" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          id="photo-upload"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={handleInputChange}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploadedImage ? (
            <>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold mb-3">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-gold font-medium">Photo uploaded!</p>
              <p className="text-xs text-muted-foreground mt-1">Click to change</p>
            </>
          ) : (
            <>
              <div className={`
                p-4 rounded-full mb-3 transition-colors
                ${isDragging ? "bg-gold/20" : "bg-secondary"}
              `}>
                <Upload className={`w-8 h-8 ${isDragging ? "text-gold" : "text-muted-foreground"}`} />
              </div>
              <p className="mb-2 text-sm text-foreground">
                <span className="font-semibold text-gold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG (max 10MB)</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default PhotoUploader;
