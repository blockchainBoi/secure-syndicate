import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Users, Shield } from "lucide-react";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  type: string;
  totalValue: string;
  totalInvestors: number;
  returnRate: string;
  status: "active" | "funded" | "pending";
  image: string;
}

export function PropertyCard({ 
  name, 
  location, 
  type, 
  totalValue, 
  totalInvestors, 
  returnRate, 
  status,
  image 
}: PropertyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "funded": return "bg-primary/10 text-primary border-primary/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30 bg-gradient-to-br from-card to-card/80">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-4 left-4 bg-background/10 backdrop-blur-sm rounded-full p-2">
          <Building2 className="h-4 w-4 text-accent" />
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
              {name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{location}</p>
            <p className="text-xs text-muted-foreground mt-1">{type}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              Total Value
            </div>
            <p className="font-semibold text-foreground">{totalValue}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Expected Return
            </div>
            <p className="font-semibold text-success">{returnRate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {totalInvestors} Investors
          </div>
          <div className="text-xs text-muted-foreground">
            🔒 Private Contributions
          </div>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
          size="sm"
          onClick={() => alert(`Viewing details for ${name}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}