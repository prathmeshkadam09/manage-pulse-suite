
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash,
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientFormDialog from "@/components/clients/ClientFormDialog";
import { toast } from "sonner";

// Mock data
const clientsData = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    contactPerson: "John Smith",
    billingAddress: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    shippingAddress: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    bdm: {
      id: "1",
      name: "Sarah Johnson",
      commission: "5%"
    },
    projects: 3,
    totalBilled: "$56,750"
  },
  {
    id: "2",
    name: "Globex Inc.",
    email: "info@globexinc.com",
    phone: "+1 (555) 987-6543",
    contactPerson: "Jane Doe",
    billingAddress: "456 Corporate Pkwy, New York, NY 10001",
    shippingAddress: "789 Shipping Lane, Jersey City, NJ 07302",
    bdm: {
      id: "2",
      name: "Michael Brown",
      commission: "4.5%"
    },
    projects: 2,
    totalBilled: "$43,200"
  },
  {
    id: "3",
    name: "Wayne Enterprises",
    email: "business@wayneenterprises.com",
    phone: "+1 (555) 456-7890",
    contactPerson: "Bruce Wayne",
    billingAddress: "1 Wayne Tower, Gotham City, NJ 08701",
    shippingAddress: "1 Wayne Tower, Gotham City, NJ 08701",
    bdm: {
      id: "3",
      name: "Emily Davis",
      commission: "5.5%"
    },
    projects: 5,
    totalBilled: "$98,000"
  },
  {
    id: "4",
    name: "Stark Industries",
    email: "contracts@starkindustries.com",
    phone: "+1 (555) 789-0123",
    contactPerson: "Pepper Potts",
    billingAddress: "200 Park Avenue, New York, NY 10017",
    shippingAddress: "890 5th Avenue, New York, NY 10019",
    bdm: {
      id: "1",
      name: "Sarah Johnson",
      commission: "6%"
    },
    projects: 4,
    totalBilled: "$115,500"
  },
  {
    id: "5",
    name: "Oscorp Industries",
    email: "info@oscorp.com",
    phone: "+1 (555) 234-5678",
    contactPerson: "Norman Osborn",
    billingAddress: "5 Madison Avenue, New York, NY 10010",
    shippingAddress: "5 Madison Avenue, New York, NY 10010",
    bdm: {
      id: "2",
      name: "Michael Brown",
      commission: "4%"
    },
    projects: 1,
    totalBilled: "$28,750"
  }
];

const projectsData = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corporation",
    startDate: "2023-01-15",
    endDate: "2023-04-30",
    status: "Completed",
    value: "$24,500"
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "Acme Corporation",
    startDate: "2023-05-10",
    endDate: "2023-09-15",
    status: "In Progress",
    value: "$32,250"
  },
  {
    id: "3",
    name: "ERP Implementation",
    client: "Globex Inc.",
    startDate: "2023-02-01",
    endDate: "2023-07-31",
    status: "In Progress",
    value: "$43,200"
  },
  {
    id: "4",
    name: "Cloud Migration",
    client: "Wayne Enterprises",
    startDate: "2023-03-15",
    endDate: "2023-06-30",
    status: "Completed",
    value: "$38,000"
  },
  {
    id: "5",
    name: "Security Audit",
    client: "Wayne Enterprises",
    startDate: "2023-07-01",
    endDate: "2023-08-15",
    status: "Completed",
    value: "$15,000"
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredClients, setFilteredClients] = useState(clientsData);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const clients = clientsData.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.contactPerson.toLowerCase().includes(term)
    );
    setFilteredClients(clients);
    
    const projects = selectedClient
      ? projectsData.filter(project => project.client === selectedClient)
      : projectsData.filter(
          (project) =>
            project.name.toLowerCase().includes(term) ||
            project.client.toLowerCase().includes(term)
        );
    setFilteredProjects(projects);
  };

  const handleClientClick = (clientName: string) => {
    if (selectedClient === clientName) {
      setSelectedClient(null);
      setFilteredProjects(projectsData);
    } else {
      setSelectedClient(clientName);
      const projects = projectsData.filter(project => project.client === clientName);
      setFilteredProjects(projects);
    }
  };

  const handleAddClient = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteClient = (id: string) => {
    toast.success(`Client with ID: ${id} deleted successfully`);
  };

  const handleViewProjects = (clientName: string) => {
    handleClientClick(clientName);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Clients & Projects</h2>
        <p className="text-muted-foreground">Manage your clients and their associated projects.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients or projects..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button onClick={handleAddClient}>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      <Tabs defaultValue="clients">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>BDM</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead>Total Billed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id} className={client.name === selectedClient ? "bg-muted/50" : ""}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{client.contactPerson}</span>
                              <span className="text-xs text-muted-foreground">{client.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{client.bdm.name}</span>
                              <span className="text-xs text-muted-foreground">Commission: {client.bdm.commission}</span>
                            </div>
                          </TableCell>
                          <TableCell>{client.projects}</TableCell>
                          <TableCell>{client.totalBilled}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleViewProjects(client.name)}>
                                  <FileText className="mr-2 h-4 w-4" /> View Projects
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteClient(client.id)}
                                  className="text-red-600"
                                >
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredClients.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No clients found
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
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Projects
                {selectedClient && (
                  <span className="ml-2 text-muted-foreground text-sm font-normal">
                    for {selectedClient}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>{project.client}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">Start: {new Date(project.startDate).toLocaleDateString()}</span>
                              <span className="text-xs text-muted-foreground">
                                End: {new Date(project.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              project.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : project.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {project.status}
                            </div>
                          </TableCell>
                          <TableCell>{project.value}</TableCell>
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
                                  <FileText className="mr-2 h-4 w-4" /> View Invoices
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
                      {filteredProjects.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No projects found
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

      <ClientFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default Clients;
