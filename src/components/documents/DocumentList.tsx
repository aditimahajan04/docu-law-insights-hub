
import { useEffect, useState } from "react";
import { Document, DocumentStatus } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { documentApi } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { File, Search, Clock } from "lucide-react";

const statusColors = {
  [DocumentStatus.UPLOADED]: "bg-gray-400",
  [DocumentStatus.PARSED]: "bg-yellow-400",
  [DocumentStatus.SIMPLIFIED]: "bg-blue-400",
  [DocumentStatus.REVIEWED]: "bg-green-500",
};

const statusMessages = {
  [DocumentStatus.UPLOADED]: "Uploaded",
  [DocumentStatus.PARSED]: "Parsed",
  [DocumentStatus.SIMPLIFIED]: "Simplified",
  [DocumentStatus.REVIEWED]: "Reviewed"
};

interface DocumentListProps {
  refreshTrigger: number;
}

export function DocumentList({ refreshTrigger }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user?.token) return;

      setLoading(true);
      const response = await documentApi.getAll(user.token);
      setLoading(false);

      if (response.success && response.data) {
        setDocuments(response.data);
      } else {
        toast({
          title: "Failed to load documents",
          description: response.error || "Could not retrieve your documents",
          variant: "destructive",
        });
      }
    };

    fetchDocuments();
  }, [user, refreshTrigger, toast]);

  const handleViewDocument = (id: string) => {
    navigate(`/documents/${id}`);
  };

  if (loading) {
    return (
      <div className="my-8 text-center">
        <Clock className="animate-pulse mx-auto h-10 w-10 text-navy mb-2" />
        <p className="text-muted-foreground">Loading your documents...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-muted/50 rounded-lg">
        <File className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-serif font-medium mb-2">No documents found</h3>
        <p className="text-muted-foreground mb-4">
          Upload your first legal document to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {documents.map((document) => (
        <Card key={document.id} className="document-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="font-serif text-lg line-clamp-1">{document.title}</CardTitle>
              <Badge className={statusColors[document.status]}>
                {statusMessages[document.status]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-1">
              {document.originalFilename}
            </p>
            <p className="text-xs text-muted-foreground">
              Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleViewDocument(document.id)}
            >
              <Search className="mr-2 h-4 w-4" />
              View Document
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
