
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Acme Corp", revenue: 45000 },
  { name: "Globex", revenue: 37800 },
  { name: "Stark Ind", revenue: 32400 },
  { name: "Wayne Ent", revenue: 30100 },
  { name: "Oscorp", revenue: 28500 },
];

const TopClientsChart = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Clients</CardTitle>
        <CardDescription>Clients by revenue contribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 40 }}>
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              tickLine={false}
              axisLine={false}
              height={60}
            />
            <YAxis 
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              }}
            />
            <Bar 
              dataKey="revenue" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopClientsChart;
