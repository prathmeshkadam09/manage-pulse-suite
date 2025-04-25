
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, Edit, MoreHorizontal, Trash, FileText, Search, Filter } from "lucide-react";
import { toast } from "sonner";

// Sample data - in a real application, this would be fetched from an API
const candidatesData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    project: "Mobile App Development",
    client: "Acme Corp",
    spoc: "Sarah Johnson",
    status: "Active",
    salaryDetails: {
      amount: "$85,000",
      bankName: "First National Bank",
      accountNo: "****5678",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    project: "Website Redesign",
    client: "Globex Inc.",
    spoc: "Michael Brown",
    status: "Inactive",
    salaryDetails: {
      amount: "$92,000",
      bankName: "City Bank",
      accountNo: "****1234",
    },
  },
  {
    id: "3",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+1 (555) 456-7890",
    project: "ERP Implementation",
    client: "Wayne Enterprises",
    spoc: "Emily Davis",
    status: "Active",
    salaryDetails: {
      amount: "$78,000",
      bankName: "United Banking",
      accountNo: "****7890",
    },
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 789-0123",
    project: "Cloud Migration",
    client: "Stark Industries",
    spoc: "David Wilson",
    status: "Pending",
    salaryDetails: {
      amount: "$95,000",
      bankName: "Global Finance",
      accountNo: "****4321",
    },
  },
  {
    id: "5",
    name: "James Johnson",
    email: "james.johnson@example.com",
    phone: "+1 (555) 234-5678",
    project: "Security Audit",
    client: "Oscorp Industries",
    spoc: "Jennifer Taylor",
    status: "Active",
    salaryDetails: {
      amount: "$88,000",
      bankName: "Metro Credit Union",
      accountNo: "****6789",
    },
  },
];

interface CandidateTableProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDocuments?: (id: string) => void;
}

const CandidateTable = ({ onEdit, onDelete, onViewDocuments }: CandidateTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState(candidatesData);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = candidatesData.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(term) ||
        candidate.email.toLowerCase().includes(term) ||
        candidate.client.toLowerCase().includes(term) ||
        candidate.project.toLowerCase().includes(term)
    );
    
    if (statusFilter) {
      setFilteredCandidates(filtered.filter(c => c.status === statusFilter));
    } else {
      setFilteredCandidates(filtered);
    }
  };

  const filterByStatus = (status: string | null) => {
    setStatusFilter(status);
    
    if (!status) {
      const filtered = candidatesData.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm) ||
          candidate.email.toLowerCase().includes(searchTerm) ||
          candidate.client.toLowerCase().includes(searchTerm) ||
          candidate.project.toLowerCase().includes(searchTerm)
      );
      setFilteredCandidates(filtered);
    } else {
      const filtered = candidatesData.filter(
        (candidate) =>
          candidate.status === status &&
          (candidate.name.toLowerCase().includes(searchTerm) ||
            candidate.email.toLowerCase().includes(searchTerm) ||
            candidate.client.toLowerCase().includes(searchTerm) ||
            candidate.project.toLowerCase().includes(searchTerm))
      );
      setFilteredCandidates(filtered);
    }
  };

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    } else {
      toast.info(`Edit candidate with ID: ${id}`);
    }
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    } else {
      toast.info(`Delete candidate with ID: ${id}`);
    }
  };

  const handleViewDocuments = (id: string) => {
    if (onViewDocuments) {
      onViewDocuments(id);
    } else {
      toast.info(`View documents for candidate with ID: ${id}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidates</CardTitle>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => filterByStatus(null)}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterByStatus('Active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterByStatus('Inactive')}>
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterByStatus('Pending')}>
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>SPOC</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">{candidate.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{candidate.email}</span>
                        <span className="text-xs text-muted-foreground">{candidate.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.project}</TableCell>
                    <TableCell>{candidate.client}</TableCell>
                    <TableCell>{candidate.spoc}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{candidate.salaryDetails.amount}</span>
                        <span className="text-xs text-muted-foreground">{candidate.salaryDetails.bankName} ({candidate.salaryDetails.accountNo})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(candidate.status)}`} variant="outline">
                        {candidate.status}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => handleEdit(candidate.id)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDocuments(candidate.id)}>
                            <FileText className="mr-2 h-4 w-4" /> View Documents
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(candidate.id)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCandidates.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No candidates found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateTable;
