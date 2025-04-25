
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 10500 },
  { month: "Feb", revenue: 13200 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 12300 },
  { month: "May", revenue: 18200 },
  { month: "Jun", revenue: 22000 },
  { month: "Jul", revenue: 19300 },
  { month: "Aug", revenue: 24500 },
  { month: "Sep", revenue: 28900 },
  { month: "Oct", revenue: 26200 },
  { month: "Nov", revenue: 31000 },
  { month: "Dec", revenue: 34500 },
];

const RevenueChart = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              padding={{ left: 10, right: 10 }} 
            />
            <YAxis 
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} 
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
