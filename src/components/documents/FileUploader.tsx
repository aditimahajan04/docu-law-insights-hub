
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { documentApi } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

interface FileUploaderProps {
  onUploadSuccess: () => void;
}

export function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size should not exceed 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.token) return;

    setIsUploading(true);
    
    const response = await documentApi.upload(selectedFile, user.token);
    
    setIsUploading(false);
    
    if (response.success) {
      toast({
        title: "Upload successful",
        description: `${selectedFile.name} has been uploaded and is being processed.`,
      });
      setSelectedFile(null);
      onUploadSuccess();
    } else {
      toast({
        title: "Upload failed",
        description: response.error || "An error occurred during upload",
        variant: "destructive",
      });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card 
      className={`p-6 border-2 border-dashed transition-all ${isDragging ? 'drag-active' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center py-8">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf"
        />
        {selectedFile ? (
          <div className="space-y-4 w-full max-w-md">
            <div className="flex items-center p-3 bg-secondary rounded-md">
              <File className="h-8 w-8 text-navy mr-3" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedFile(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-navy mb-4" />
            <h3 className="text-xl font-serif font-medium mb-2">Upload Legal Document</h3>
            <p className="text-muted-foreground mb-6 text-center">
              Drag and drop your PDF document here, or click to browse
            </p>
            <Button onClick={handleBrowseClick}>Browse Files</Button>
          </>
        )}
      </div>
    </Card>
  );
}
