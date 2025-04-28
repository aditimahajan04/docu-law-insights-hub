
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DocumentDetail, FlawType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { documentApi } from "@/services/api";
import { ArrowLeft, FileText, AlertTriangle, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const flawTypeColors = {
  [FlawType.MISSING_CLAUSE]: "bg-red-100 text-red-800",
  [FlawType.AMBIGUITY]: "bg-amber-100 text-amber-800",
  [FlawType.NUMBERING_ERROR]: "bg-blue-100 text-blue-800",
  [FlawType.CONTRADICTORY]: "bg-purple-100 text-purple-800",
};

export function DocumentViewer() {
  const [document, setDocument] = useState<DocumentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id || !user?.token) return;

      setLoading(true);
      const response = await documentApi.getById(id, user.token);
      setLoading(false);

      if (response.success && response.data) {
        setDocument(response.data);
      } else {
        toast({
          title: "Failed to load document",
          description: response.error || "Could not retrieve the document",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    };

    fetchDocument();
  }, [id, user, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center p-8">
        <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-serif font-medium mb-2">Document not found</h3>
        <p className="text-muted-foreground mb-4">
          The document you're looking for could not be found
        </p>
        <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-serif font-medium">{document.title}</h1>
        <p className="text-muted-foreground">
          Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
        </p>
      </div>
      
      <Tabs defaultValue="original" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="original">Original Text</TabsTrigger>
          <TabsTrigger value="simplified">Simplified Text</TabsTrigger>
          <TabsTrigger value="flaws">
            Detected Flaws <Badge className="ml-2 bg-red-500">{document.flaws.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="original">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Original Document Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-6 rounded-md whitespace-pre-wrap font-mono text-sm">
                {document.originalText}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simplified">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Simplified Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-6 rounded-md whitespace-pre-wrap">
                {document.simplifiedText}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flaws">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Detected Document Flaws</CardTitle>
            </CardHeader>
            <CardContent>
              {document.flaws.length === 0 ? (
                <div className="text-center p-6">
                  <div className="bg-green-100 text-green-800 p-4 rounded-md flex items-center justify-center">
                    <p>No flaws detected in this document.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {document.flaws.map((flaw) => (
                    <div 
                      key={flaw.id}
                      className="p-4 border rounded-md"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <h3 className="font-medium">
                          <span className={`px-2 py-1 rounded-md text-xs ${flawTypeColors[flaw.type]}`}>
                            {flaw.type.replace(/_/g, " ")}
                          </span>
                        </h3>
                      </div>
                      <p className="text-sm mb-2">{flaw.description}</p>
                      <div className="bg-muted p-2 rounded-md text-sm">
                        <p className="font-medium text-xs text-muted-foreground mb-1">Suggestion:</p>
                        <p>{flaw.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="case-studies">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Relevant Case Studies</CardTitle>
            </CardHeader>
            <CardContent>
              {document.caseStudies.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No relevant case studies found for this document.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {document.caseStudies.map((caseStudy) => (
                    <div key={caseStudy.id} className="border p-4 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium font-serif text-lg">{caseStudy.title}</h3>
                          <p className="text-sm text-muted-foreground">{caseStudy.citation}</p>
                        </div>
                        <Badge className="bg-accent">
                          Relevance: {Math.round(caseStudy.relevanceScore * 100)}%
                        </Badge>
                      </div>
                      <Separator className="my-3" />
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Book className="h-4 w-4 mr-2" />
                          Summary
                        </h4>
                        <p className="text-sm">{caseStudy.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
