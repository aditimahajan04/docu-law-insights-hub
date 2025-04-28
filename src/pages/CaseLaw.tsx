
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Search } from "lucide-react";

// Mock case studies
const mockCaseLaw = [
  {
    id: "case1",
    title: "Smith v. Acme Tech Industries",
    citation: "123 F.3d 456 (9th Cir. 2022)",
    summary: "The court held that undefined terms like 'Cause' in employment agreements render termination clauses potentially unenforceable. Employers must clearly define grounds for termination.",
    category: "Employment Law"
  },
  {
    id: "case2",
    title: "Johnson v. Enterprise Solutions",
    citation: "567 Cal.App.4th 890 (2021)",
    summary: "An employment agreement without confidentiality provisions failed to protect the employer when an employee shared proprietary information after departure.",
    category: "Employment Law"
  },
  {
    id: "case3",
    title: "TechCorp v. InnoSystems",
    citation: "987 F.Supp.2d 123 (S.D.N.Y. 2021)",
    summary: "The court ruled that an NDA lacking a 'Return of Materials' clause made it difficult to enforce the return of confidential documents after the business relationship ended.",
    category: "Intellectual Property"
  },
  {
    id: "case4",
    title: "DataSafe Inc. v. SecurityNow LLC",
    citation: "456 A.3d 789 (Del. Ch. 2022)",
    summary: "The court held that contradictory duration provisions in an NDA created ambiguity that was construed against the drafter, resulting in the shorter protection period being enforced.",
    category: "Contract Law"
  },
  {
    id: "case5",
    title: "Metro Retail v. Citywide Properties",
    citation: "234 N.Y.S.3d 567 (N.Y. Sup. Ct. 2021)",
    summary: "The court found that missing sections in a commercial lease created ambiguity about tenant obligations, leading to unenforceable provisions for additional services and charges.",
    category: "Real Estate Law"
  }
];

export default function CaseLaw() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCases, setFilteredCases] = useState(mockCaseLaw);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredCases(mockCaseLaw);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = mockCaseLaw.filter(
      (caseItem) =>
        caseItem.title.toLowerCase().includes(query) ||
        caseItem.citation.toLowerCase().includes(query) ||
        caseItem.summary.toLowerCase().includes(query) ||
        caseItem.category.toLowerCase().includes(query)
    );

    setFilteredCases(results);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-3xl font-serif font-medium">Case Law Library</h1>
        <p className="text-muted-foreground">Search legal precedents and case studies</p>
      </div>

      <div className="flex gap-4 max-w-2xl">
        <Input
          placeholder="Search by case name, citation, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="space-y-4 mt-6">
        {filteredCases.length === 0 ? (
          <div className="text-center p-8 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">No cases found matching your search criteria.</p>
          </div>
        ) : (
          filteredCases.map((caseItem) => (
            <Card key={caseItem.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-serif flex items-center">
                      <Book className="h-5 w-5 mr-2 text-navy" />
                      {caseItem.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{caseItem.citation}</p>
                  </div>
                  <span className="px-2 py-1 bg-secondary text-xs rounded-full">
                    {caseItem.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{caseItem.summary}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
