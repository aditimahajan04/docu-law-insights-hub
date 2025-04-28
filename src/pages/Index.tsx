
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Check, Book, Search } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                AI-Powered Legal Document Management
              </h1>
              <p className="text-xl text-gray-300">
                Modernize your legal document workflow with AI analysis, flaw detection, and case law retrieval.
              </p>
              <div className="space-x-4 pt-4">
                {user ? (
                  <Button size="lg" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button size="lg" onClick={() => navigate("/login")}>
                      Sign In
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
                      Create Account
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-3">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm font-medium">ContractAI_Analysis.pdf</div>
                </div>
                <div className="bg-white/10 p-3 rounded mb-3 text-sm">
                  <p className="text-xs text-gray-300 mb-1">ORIGINAL:</p>
                  <p className="text-white">The party of the first part hereby acknowledges and agrees that any breach of Section 8(b)(iii) shall constitute a material breach...</p>
                </div>
                <div className="bg-accent/20 p-3 rounded text-sm">
                  <p className="text-xs text-accent-foreground mb-1">SIMPLIFIED:</p>
                  <p className="text-white">If you violate the confidentiality requirements in Section 8, this would be considered a serious contract violation...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-serif font-medium text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Document Simplification</h3>
              <p className="text-muted-foreground">
                Transform complex legal language into plain English with our advanced AI processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Flaw Detection</h3>
              <p className="text-muted-foreground">
                Automatically identify missing clauses, ambiguities, and structural issues in legal documents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Case Law Integration</h3>
              <p className="text-muted-foreground">
                Retrieve relevant case studies and legal precedents using advanced semantic search.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-serif font-medium text-center mb-12">How It Works</h2>
          
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-muted/30 rounded-lg p-6 border border-border">
                  <div className="flex items-center">
                    <Search className="w-5 h-5 mr-2 text-navy" />
                    <h4 className="text-lg font-medium">Document Upload & Processing</h4>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center mr-3 text-xs">
                        1
                      </div>
                      <p>Upload your legal document in PDF format</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center mr-3 text-xs">
                        2
                      </div>
                      <p>Our system extracts and processes the text</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center mr-3 text-xs">
                        3
                      </div>
                      <p>AI analyzes the document for structure, language, and legal context</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-serif font-medium">Upload & Analyze</h3>
                <p>
                  Simply drag and drop your legal documents into our platform. Our system will automatically extract the text using advanced OCR technology and prepare it for AI analysis, making document intake effortless.
                </p>
                <p>
                  Whether you're dealing with contracts, lease agreements, or employment documents, our system will process them quickly and accurately.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-muted/30 rounded-lg p-6 border border-border">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-navy" />
                    <h4 className="text-lg font-medium">AI-Powered Insights</h4>
                  </div>
                  <div className="mt-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-3 text-xs mt-1">
                          !
                        </div>
                        <div>
                          <p className="font-medium">Missing Force Majeure Clause</p>
                          <p className="text-sm text-muted-foreground">Consider adding a clause to address unforeseeable circumstances.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-3 text-xs mt-1">
                          !
                        </div>
                        <div>
                          <p className="font-medium">Ambiguous Payment Terms</p>
                          <p className="text-sm text-muted-foreground">The payment schedule in section 4.2 is unclear and may cause disputes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-serif font-medium">Review & Improve</h3>
                <p>
                  Our AI system provides comprehensive analysis of your documents, highlighting potential issues, ambiguities, and missing clauses that could lead to legal problems.
                </p>
                <p>
                  For each detected flaw, you'll receive clear explanations and suggestions for improvement, along with relevant case law to help you understand the legal implications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-medium mb-4">Ready to modernize your legal document workflow?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join LegalEase today and experience the power of AI-driven legal document management.
          </p>
          {user ? (
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          ) : (
            <Button size="lg" onClick={() => navigate("/register")}>
              Get Started Now
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-md bg-navy flex items-center justify-center mr-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="font-serif text-xl font-medium">LegalEase</div>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LegalEase. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
