
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ChevronDown,
  FileText,
  Plus,
  MoreHorizontal,
  Eye,
  Printer,
  Download,
  ReceiptIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash
} from "lucide-react";
import InvoiceForm from "@/components/invoices/InvoiceForm";

// Mock data - would be fetched from API in real application
const invoicesData = [
  {
    id: "INV-2023-001",
    client: "Acme Corporation",
    project: "Website Redesign",
    amount: "$12,500",
    tax: "$2,250",
    total: "$14,750",
    issueDate: "2023-01-15",
    dueDate: "2023-02-14",
    status: "Paid",
    recurring: false,
  },
  {
    id: "INV-2023-002",
    client: "Globex Inc.",
    project: "ERP Implementation",
    amount: "$24,000",
    tax: "$4,320",
    total: "$28,320",
    issueDate: "2023-02-01",
    dueDate: "2023-03-03",
    status: "Pending",
    recurring: false,
  },
  {
    id: "INV-2023-003",
    client: "Wayne Enterprises",
    project: "Cloud Migration",
    amount: "$18,500",
    tax: "$3,330",
    total: "$21,830",
    issueDate: "2023-02-15",
    dueDate: "2023-03-17",
    status: "Overdue",
    recurring: false,
  },
  {
    id: "INV-2023-004",
    client: "Stark Industries",
    project: "Mobile App Development",
    amount: "$32,000",
    tax: "$5,760",
    total: "$37,760",
    issueDate: "2023-03-01",
    dueDate: "2023-03-31",
    status: "Draft",
    recurring: false,
  },
  {
    id: "INV-2023-005",
    client: "Acme Corporation",
    project: "Maintenance Services",
    amount: "$5,000",
    tax: "$900",
    total: "$5,900",
    issueDate: "2023-03-15",
    dueDate: "2023-04-14",
    status: "Paid",
    recurring: true,
  },
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredInvoices, setFilteredInvoices] = useState(invoicesData);
  const [isCreating, setIsCreating] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    let filtered = invoicesData.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(term) ||
        invoice.client.toLowerCase().includes(term) ||
        invoice.project.toLowerCase().includes(term)
    );
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(invoice => invoice.status.toLowerCase() === statusFilter);
    }
    
    setFilteredInvoices(filtered);
  };

  const filterByStatus = (status: string) => {
    setStatusFilter(status);
    
    if (status === "all") {
      setFilteredInvoices(
        invoicesData.filter(
          (invoice) =>
            invoice.id.toLowerCase().includes(searchTerm) ||
            invoice.client.toLowerCase().includes(searchTerm) ||
            invoice.project.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setFilteredInvoices(
        invoicesData.filter(
          (invoice) =>
            invoice.status.toLowerCase() === status &&
            (invoice.id.toLowerCase().includes(searchTerm) ||
             invoice.client.toLowerCase().includes(searchTerm) ||
             invoice.project.toLowerCase().includes(searchTerm))
        )
      );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "draft":
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <p className="text-muted-foreground">Manage your invoices and payment records.</p>
      </div>

      {!isCreating ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => filterByStatus("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByStatus("paid")}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByStatus("pending")}>
                    <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByStatus("overdue")}>
                    <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                    Overdue
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByStatus("draft")}>
                    <FileText className="mr-2 h-4 w-4 text-gray-500" />
                    Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invoice List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">
                            {invoice.id}
                            {invoice.recurring && (
                              <Badge variant="outline" className="ml-2 bg-blue-50 border-blue-200 text-blue-700">
                                Recurring
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{invoice.client}</TableCell>
                          <TableCell>{invoice.project}</TableCell>
                          <TableCell>{invoice.total}</TableCell>
                          <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getStatusIcon(invoice.status)}
                              <Badge 
                                variant="outline" 
                                className={`ml-2 ${getStatusStyle(invoice.status)}`}
                              >
                                {invoice.status}
                              </Badge>
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
                                  <Eye className="mr-2 h-4 w-4" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Printer className="mr-2 h-4 w-4" /> Print
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" /> Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ReceiptIcon className="mr-2 h-4 w-4" /> Record Payment
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
                      {filteredInvoices.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                            No invoices found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Create New Invoice</h3>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
          <InvoiceForm />
        </>
      )}
    </div>
  );
};

export default Invoices;
