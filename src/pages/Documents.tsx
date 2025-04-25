import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Download,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  File,
  FileText,
  FileClock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DocumentUploader from "@/components/documents/DocumentUploader";

// Mock data - would be fetched from API in real application
const templatesData = [
  {
    id: "1",
    name: "Invoice Template",
    type: "PDF",
    createdAt: "2023-02-15",
    currentVersion: "2.1",
    lastUpdated: "2023-04-01",
    variables: ["client_name", "invoice_number", "amount", "date", "due_date"],
  },
  {
    id: "2",
    name: "Client Agreement",
    type: "DOCX",
    createdAt: "2023-01-10",
    currentVersion: "1.3",
    lastUpdated: "2023-03-20",
    variables: ["client_name", "project_name", "start_date", "fee_structure"],
  },
  {
    id: "3",
    name: "Project Proposal",
    type: "PDF",
    createdAt: "2023-03-05",
    currentVersion: "1.0",
    lastUpdated: "2023-03-05",
    variables: ["client_name", "project_scope", "timeline", "budget", "deliverables"],
  },
  {
    id: "4",
    name: "Employment Contract",
    type: "DOCX",
    createdAt: "2022-11-20",
    currentVersion: "3.2",
    lastUpdated: "2023-04-10",
    variables: ["employee_name", "position", "salary", "start_date", "benefits"],
  },
  {
    id: "5",
    name: "Non-Disclosure Agreement",
    type: "PDF",
    createdAt: "2022-10-05",
    currentVersion: "1.1",
    lastUpdated: "2023-02-28",
    variables: ["party_name", "effective_date", "confidential_information", "term"],
  },
];

const generatedDocsData = [
  {
    id: "1",
    name: "Invoice_Acme_Corp_2023-04-01.pdf",
    template: "Invoice Template",
    client: "Acme Corporation",
    generatedDate: "2023-04-01",
    createdBy: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Agreement_Globex_2023-03-20.pdf",
    template: "Client Agreement",
    client: "Globex Inc.",
    generatedDate: "2023-03-20",
    createdBy: "Michael Brown",
  },
  {
    id: "3",
    name: "Proposal_Wayne_Enterprises_2023-03-25.pdf",
    template: "Project Proposal",
    client: "Wayne Enterprises",
    generatedDate: "2023-03-25",
    createdBy: "Emily Davis",
  },
  {
    id: "4",
    name: "Contract_John_Smith_2023-04-10.pdf",
    template: "Employment Contract",
    client: "Internal",
    generatedDate: "2023-04-10",
    createdBy: "Sarah Johnson",
  },
  {
    id: "5",
    name: "NDA_Stark_Industries_2023-03-15.pdf",
    template: "Non-Disclosure Agreement",
    client: "Stark Industries",
    generatedDate: "2023-03-15",
    createdBy: "David Wilson",
  },
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState(templatesData);
  const [filteredDocs, setFilteredDocs] = useState(generatedDocsData);
  const [isUploading, setIsUploading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter templates
    const templates = templatesData.filter(
      (template) =>
        template.name.toLowerCase().includes(term) ||
        template.type.toLowerCase().includes(term)
    );
    setFilteredTemplates(templates);
    
    // Filter generated documents
    const docs = generatedDocsData.filter(
      (doc) =>
        doc.name.toLowerCase().includes(term) ||
        doc.template.toLowerCase().includes(term) ||
        doc.client.toLowerCase().includes(term) ||
        doc.createdBy.toLowerCase().includes(term)
    );
    setFilteredDocs(docs);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Document Management</h2>
        <p className="text-muted-foreground">Manage document templates and generated documents.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsUploading(!isUploading)}>
            {isUploading ? "Cancel Upload" : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Upload Template
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Generate Document
          </Button>
        </div>
      </div>

      {isUploading ? (
        <DocumentUploader />
      ) : (
        <Tabs defaultValue="templates">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="templates" className="flex-1 sm:flex-initial">Templates</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1 sm:flex-initial">Generated Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Current Version</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Variables</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTemplates.map((template) => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {template.type === 'PDF' ? (
                                  <File className="h-4 w-4 mr-2 text-red-600" />
                                ) : (
                                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                                )}
                                {template.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={template.type === 'PDF' ? "bg-red-50 text-red-800 border-red-200" : "bg-blue-50 text-blue-800 border-blue-200"}>
                                {template.type}
                              </Badge>
                            </TableCell>
                            <TableCell>v{template.currentVersion}</TableCell>
                            <TableCell>{new Date(template.lastUpdated).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1 max-w-[300px]">
                                {template.variables.slice(0, 3).map((variable, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {variable}
                                  </Badge>
                                ))}
                                {template.variables.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{template.variables.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" /> Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit Variables
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileClock className="mr-2 h-4 w-4" /> Version History
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredTemplates.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              No templates found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generated Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Template</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Generated Date</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocs.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <File className="h-4 w-4 mr-2 text-red-600" />
                                <span className="truncate max-w-[250px]">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{doc.template}</TableCell>
                            <TableCell>{doc.client}</TableCell>
                            <TableCell>{new Date(doc.generatedDate).toLocaleDateString()}</TableCell>
                            <TableCell>{doc.createdBy}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" /> Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Regenerate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredDocs.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              No documents found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Documents;
