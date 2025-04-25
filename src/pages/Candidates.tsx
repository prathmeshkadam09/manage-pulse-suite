
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import CandidateTable from "@/components/candidates/CandidateTable";

const Candidates = () => {
  const [viewingDocuments, setViewingDocuments] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const handleAddCandidate = () => {
    // Here you would implement the logic to open a form to add a new candidate
    console.log("Add candidate button clicked");
  };

  const handleViewDocuments = (id: string) => {
    setSelectedCandidateId(id);
    setViewingDocuments(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidate Management</h2>
          <p className="text-muted-foreground">Manage candidate information, documents, and assignments.</p>
        </div>
        <Button onClick={handleAddCandidate}>
          <Plus className="mr-2 h-4 w-4" /> Add Candidate
        </Button>
      </div>

      {!viewingDocuments ? (
        <CandidateTable onViewDocuments={handleViewDocuments} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setViewingDocuments(false)}>Back to Candidates</Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold mb-4">Documents for Candidate ID: {selectedCandidateId}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* This is a placeholder for candidate documents */}
              {[1, 2, 3, 4, 5].map((doc) => (
                <div
                  key={doc}
                  className="flex flex-col rounded-lg border p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="font-medium">Document {doc}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">Added on {new Date().toLocaleDateString()}</div>
                  <div className="text-xs text-muted-foreground">PDF Document • 1.2 MB</div>
                </div>
              ))}
            </div>
            
            {/* No documents message - can be displayed when there are no documents */}
            {false && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">No Documents Found</h4>
                <p className="text-muted-foreground mb-4">This candidate doesn't have any documents uploaded yet.</p>
                <Button>Upload First Document</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
