
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Briefcase,
  UserRound,
  File,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ to, icon: Icon, label }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground/80"
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-sidebar transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16",
        "border-sidebar-border"
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-bold text-primary-foreground">RB</span>
          </div>
          {isOpen && <span className="font-semibold text-sidebar-foreground">Redberyl</span>}
        </div>
        <div className="flex-1"></div>
        {isOpen && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground/80">
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {isOpen ? (
            <>
              <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" />
              <SidebarLink to="/clients" icon={Briefcase} label="Clients & Projects" />
              <SidebarLink to="/candidates" icon={UserRound} label="Candidates" />
              <SidebarLink to="/invoices" icon={FileText} label="Invoices" />
              <SidebarLink to="/payments" icon={CreditCard} label="Payments" />
              <SidebarLink to="/crm" icon={Users} label="CRM" />
              <SidebarLink to="/documents" icon={File} label="Documents" />
            </>
          ) : (
            <>
              <NavLink to="/" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <LayoutDashboard className="h-5 w-5" />
              </NavLink>
              <NavLink to="/clients" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <Briefcase className="h-5 w-5" />
              </NavLink>
              <NavLink to="/candidates" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <UserRound className="h-5 w-5" />
              </NavLink>
              <NavLink to="/invoices" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <FileText className="h-5 w-5" />
              </NavLink>
              <NavLink to="/payments" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <CreditCard className="h-5 w-5" />
              </NavLink>
              <NavLink to="/crm" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <Users className="h-5 w-5" />
              </NavLink>
              <NavLink to="/documents" className={({isActive}) => cn(
                "flex justify-center rounded-md p-2 text-sidebar-foreground/80",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}>
                <File className="h-5 w-5" />
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
