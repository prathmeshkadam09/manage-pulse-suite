
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  FileText,
  Trash,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

// Mock data - would be fetched from API in real application
const paymentsData = [
  {
    id: "PMT-2023-001",
    invoiceId: "INV-2023-001",
    client: "Acme Corporation",
    amount: "$14,750",
    date: "2023-02-10",
    method: "Bank Transfer",
    status: "Completed",
    notes: "Payment received for website redesign project",
  },
  {
    id: "PMT-2023-002",
    invoiceId: "INV-2023-005",
    client: "Acme Corporation",
    amount: "$5,900",
    date: "2023-04-12",
    method: "Credit Card",
    status: "Completed",
    notes: "Monthly maintenance payment",
  },
  {
    id: "PMT-2023-003",
    invoiceId: "INV-2023-003",
    client: "Wayne Enterprises",
    amount: "$21,830",
    date: "2023-03-20",
    method: "Check",
    status: "Pending",
    notes: "Check in mail - waiting for clearance",
  },
];

const bdmPaymentsData = [
  {
    id: "BDM-2023-001",
    bdmName: "Sarah Johnson",
    client: "Acme Corporation",
    amount: "$737.50",
    date: "2023-02-15",
    commissionRate: "5%",
    invoiceId: "INV-2023-001",
    isPaid: true,
  },
  {
    id: "BDM-2023-002",
    bdmName: "Sarah Johnson",
    client: "Acme Corporation",
    amount: "$295",
    date: "2023-04-15",
    commissionRate: "5%",
    invoiceId: "INV-2023-005",
    isPaid: true,
  },
  {
    id: "BDM-2023-003",
    bdmName: "Michael Brown",
    client: "Globex Inc.",
    amount: "$1,275",
    date: "2023-03-05",
    commissionRate: "4.5%",
    invoiceId: "INV-2023-002",
    isPaid: false,
  },
  {
    id: "BDM-2023-004",
    bdmName: "Emily Davis",
    client: "Wayne Enterprises",
    amount: "$1,200",
    date: "2023-03-20",
    commissionRate: "5.5%",
    invoiceId: "INV-2023-003",
    isPaid: false,
  },
];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState(paymentsData);
  const [filteredBdmPayments, setFilteredBdmPayments] = useState(bdmPaymentsData);
  const [statusFilter, setStatusFilter] = useState("all");
  const [bdmStatusFilter, setBdmStatusFilter] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter for regular payments
    let filtered = paymentsData.filter(
      (payment) =>
        payment.id.toLowerCase().includes(term) ||
        payment.invoiceId.toLowerCase().includes(term) ||
        payment.client.toLowerCase().includes(term) ||
        payment.method.toLowerCase().includes(term)
    );
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(payment => payment.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredPayments(filtered);
    
    // Filter for BDM payments
    let filteredBdm = bdmPaymentsData.filter(
      (payment) =>
        payment.id.toLowerCase().includes(term) ||
        payment.bdmName.toLowerCase().includes(term) ||
        payment.client.toLowerCase().includes(term) ||
        payment.invoiceId.toLowerCase().includes(term)
    );
    
    if (bdmStatusFilter !== "all") {
      const isPaid = bdmStatusFilter === "paid";
      filteredBdm = filteredBdm.filter(payment => payment.isPaid === isPaid);
    }
    
    setFilteredBdmPayments(filteredBdm);
  };

  const filterPaymentsByStatus = (status: string) => {
    setStatusFilter(status);
    
    if (status === "all") {
      const filtered = paymentsData.filter(
        (payment) =>
          payment.id.toLowerCase().includes(searchTerm) ||
          payment.invoiceId.toLowerCase().includes(searchTerm) ||
          payment.client.toLowerCase().includes(searchTerm) ||
          payment.method.toLowerCase().includes(searchTerm)
      );
      setFilteredPayments(filtered);
    } else {
      const filtered = paymentsData.filter(
        (payment) =>
          payment.status.toLowerCase() === status.toLowerCase() &&
          (payment.id.toLowerCase().includes(searchTerm) ||
           payment.invoiceId.toLowerCase().includes(searchTerm) ||
           payment.client.toLowerCase().includes(searchTerm) ||
           payment.method.toLowerCase().includes(searchTerm))
      );
      setFilteredPayments(filtered);
    }
  };

  const filterBdmPaymentsByStatus = (status: string) => {
    setBdmStatusFilter(status);
    
    if (status === "all") {
      const filtered = bdmPaymentsData.filter(
        (payment) =>
          payment.id.toLowerCase().includes(searchTerm) ||
          payment.bdmName.toLowerCase().includes(searchTerm) ||
          payment.client.toLowerCase().includes(searchTerm) ||
          payment.invoiceId.toLowerCase().includes(searchTerm)
      );
      setFilteredBdmPayments(filtered);
    } else {
      const isPaid = status === "paid";
      const filtered = bdmPaymentsData.filter(
        (payment) =>
          payment.isPaid === isPaid &&
          (payment.id.toLowerCase().includes(searchTerm) ||
           payment.bdmName.toLowerCase().includes(searchTerm) ||
           payment.client.toLowerCase().includes(searchTerm) ||
           payment.invoiceId.toLowerCase().includes(searchTerm))
      );
      setFilteredBdmPayments(filtered);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">Track payment status and manage transactions.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <Tabs defaultValue="client-payments">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="client-payments" className="flex-1 sm:flex-initial">Client Payments</TabsTrigger>
          <TabsTrigger value="bdm-payments" className="flex-1 sm:flex-initial">BDM Commissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="client-payments" className="space-y-4">
          <div className="flex justify-end">
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
                <DropdownMenuItem onClick={() => filterPaymentsByStatus("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterPaymentsByStatus("completed")}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterPaymentsByStatus("pending")}>
                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Client Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.invoiceId}</TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{format(new Date(payment.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={payment.status === "Completed" 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"}
                            >
                              {payment.status}
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
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" /> View Invoice
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
                      {filteredPayments.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                            No payments found
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
        
        <TabsContent value="bdm-payments" className="space-y-4">
          <div className="flex justify-end">
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
                <DropdownMenuItem onClick={() => filterBdmPaymentsByStatus("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterBdmPaymentsByStatus("paid")}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterBdmPaymentsByStatus("unpaid")}>
                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                  Unpaid
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>BDM Commission Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>BDM Name</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Commission Rate</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBdmPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.bdmName}</TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.commissionRate}</TableCell>
                          <TableCell>{payment.invoiceId}</TableCell>
                          <TableCell>{format(new Date(payment.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={payment.isPaid 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"}
                            >
                              {payment.isPaid ? "Paid" : "Unpaid"}
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
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                {!payment.isPaid && (
                                  <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" /> Mark as Paid
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredBdmPayments.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                            No BDM payments found
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
    </div>
  );
};

export default Payments;
