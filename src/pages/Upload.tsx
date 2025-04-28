
import { FileUploader } from "@/components/documents/FileUploader";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Upload() {
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-medium">Upload Document</h1>
          <p className="text-muted-foreground">Add a new legal document for analysis</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <FileUploader onUploadSuccess={handleUploadSuccess} />
        
        <div className="mt-8 bg-muted/30 p-6 rounded-lg">
          <h3 className="font-serif font-medium text-lg mb-2">Document Requirements</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>File must be in PDF format</li>
            <li>Maximum file size: 10MB</li>
            <li>Text must be selectable (not scanned images)</li>
            <li>For best results, use properly formatted legal documents</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
