
import { AreaChart, BadgeDollarSign, BarChart3, ClipboardListIcon, FileText, Settings, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TopClientsChart from "@/components/dashboard/TopClientsChart";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your business metrics and performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invoices"
          value="243"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
          description="32 pending approval"
        />
        <StatCard
          title="Total Payments"
          value="$285,324"
          icon={<BadgeDollarSign className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
          description="14 pending payments"
        />
        <StatCard
          title="Active Clients"
          value="45"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
          description="3 new this month"
        />
        <StatCard
          title="Documents"
          value="128"
          icon={<ClipboardListIcon className="h-4 w-4" />}
          trend={{ value: 3, isPositive: false }}
          description="12 awaiting approval"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <TopClientsChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Recent Activities</h3>
                <p className="text-sm text-muted-foreground">Your latest system activities</p>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Invoice #INV-2023-042 created</p>
                  <p className="text-xs text-muted-foreground">Acme Corporation - $12,500</p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <BadgeDollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-muted-foreground">Globex Inc. - $24,000</p>
                </div>
                <div className="text-xs text-muted-foreground">5h ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New client added</p>
                  <p className="text-xs text-muted-foreground">Wayne Enterprises</p>
                </div>
                <div className="text-xs text-muted-foreground">1d ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Performance Metrics</h3>
                <p className="text-sm text-muted-foreground">Monthly key performance indicators</p>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Revenue Growth</p>
                  <p className="text-sm font-bold text-green-500">+18%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[70%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">New Clients</p>
                  <p className="text-sm font-bold text-green-500">+12%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[65%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Payment Rate</p>
                  <p className="text-sm font-bold text-yellow-500">+2%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[85%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Document Processing</p>
                  <p className="text-sm font-bold text-red-500">-5%</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[45%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
