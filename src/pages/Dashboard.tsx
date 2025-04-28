
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentList } from "@/components/documents/DocumentList";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  const refreshDocuments = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-medium">Your Documents</h1>
          <p className="text-muted-foreground">Manage and analyze your legal documents</p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="mr-2 h-4 w-4" />
          Upload New
        </Button>
      </div>

      <DocumentList refreshTrigger={refreshTrigger} />
    </div>
  );
}
