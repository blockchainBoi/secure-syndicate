import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Building2, Shield } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$2.4M",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Active Properties",
      value: "8",
      change: "+2 this month",
      changeType: "positive" as const,
      icon: Building2,
    },
    {
      title: "Average Return",
      value: "14.2%",
      change: "+1.8% YoY",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Privacy Score",
      value: "100%",
      change: "Fully Encrypted",
      changeType: "neutral" as const,
      icon: Shield,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className={`text-xs mt-1 ${
              stat.changeType === "positive" 
                ? "text-success" 
                : "text-muted-foreground"
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}