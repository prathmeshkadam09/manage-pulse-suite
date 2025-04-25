
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
  Plus,
  PhoneCall,
  Mail,
  Calendar,
  Users,
  Building,
  User,
  MoreHorizontal,
  Edit,
  Trash,
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
import KanbanBoard from "@/components/crm/KanbanBoard";

// Mock data - would be fetched from API in real application
const leadsData = [
  {
    id: "1",
    name: "John Smith",
    company: "Tech Solutions Inc.",
    email: "john.smith@techsolutions.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    source: "Website",
    dateAdded: "2023-04-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Digital Innovations",
    email: "sarah.j@digitalinnovations.co",
    phone: "+1 (555) 987-6543",
    status: "Contacted",
    source: "Referral",
    dateAdded: "2023-04-05",
  },
  {
    id: "3",
    name: "Robert Wilson",
    company: "GrowthCorp",
    email: "rwilson@growthcorp.com",
    phone: "+1 (555) 456-7890",
    status: "Qualified",
    source: "Trade Show",
    dateAdded: "2023-04-10",
  },
  {
    id: "4",
    name: "Maria Garcia",
    company: "InnoTech Solutions",
    email: "mgarcia@innotech.com",
    phone: "+1 (555) 789-0123",
    status: "New",
    source: "LinkedIn",
    dateAdded: "2023-04-12",
  },
  {
    id: "5",
    name: "James Johnson",
    company: "Future Systems",
    email: "jjohnson@futuresystems.com",
    phone: "+1 (555) 234-5678",
    status: "Not Interested",
    source: "Email Campaign",
    dateAdded: "2023-04-15",
  },
];

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState(leadsData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = leadsData.filter(
      (lead) =>
        lead.name.toLowerCase().includes(term) ||
        lead.company.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.status.toLowerCase().includes(term) ||
        lead.source.toLowerCase().includes(term)
    );
    
    setFilteredLeads(filtered);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "contacted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "qualified":
        return "bg-green-100 text-green-800 border-green-200";
      case "not interested":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
        <p className="text-muted-foreground">Manage your leads, deals, and customer relationships.</p>
      </div>

      <Tabs defaultValue="deals">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="leads" className="flex-1 sm:flex-initial">Leads</TabsTrigger>
          <TabsTrigger value="deals" className="flex-1 sm:flex-initial">Deals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              {lead.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                              {lead.company}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-xs">{lead.email}</span>
                              </div>
                              <div className="flex items-center">
                                <PhoneCall className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-xs">{lead.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeClass(lead.status)}>
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{lead.source}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              {new Date(lead.dateAdded).toLocaleDateString()}
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
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="mr-2 h-4 w-4" /> Convert to Deal
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
                      {filteredLeads.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No leads found
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
        
        <TabsContent value="deals">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Deals Pipeline</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Deal
              </Button>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 pb-6 overflow-x-auto">
              <KanbanBoard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRM;
