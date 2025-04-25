
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import { 
  LayoutDashboard, 
  Briefcase,
  UserRound,
  FileText,
  CreditCard,
  Users,
  File
} from "lucide-react";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Briefcase, label: "Clients & Projects", path: "/clients" },
    { icon: UserRound, label: "Candidates", path: "/candidates" },
    { icon: FileText, label: "Invoices", path: "/invoices" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Users, label: "CRM", path: "/crm" },
    { icon: File, label: "Documents", path: "/documents" },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar side="left" variant="sidebar">
          <SidebarHeader>
            <div className="flex h-16 items-center gap-2 px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-bold text-primary-foreground">RB</span>
              </div>
              <span className="text-lg font-semibold">Redberyl</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex flex-col gap-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
