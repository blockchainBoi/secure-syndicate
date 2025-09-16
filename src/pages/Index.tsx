import { WalletConnect } from "@/components/WalletConnect";
import { ContractInteraction } from "@/components/ContractInteraction";
import { DashboardStats } from "@/components/DashboardStats";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Eye, TrendingUp, Lock, Users } from "lucide-react";
import heroImage from "@/assets/real-estate-hero.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  const properties = [
    {
      id: "1",
      name: "Manhattan Heights",
      location: "New York, NY",
      type: "Luxury Residential",
      totalValue: "$1.2M",
      totalInvestors: 24,
      returnRate: "16.2%",
      status: "active" as const,
      image: property1,
    },
    {
      id: "2",
      name: "Central Business Plaza",
      location: "Chicago, IL",
      type: "Commercial Office",
      totalValue: "$850K",
      totalInvestors: 18,
      returnRate: "12.8%",
      status: "funded" as const,
      image: property2,
    },
    {
      id: "3",
      name: "Riverside Towers",
      location: "Miami, FL",
      type: "Mixed Use",
      totalValue: "$950K",
      totalInvestors: 31,
      returnRate: "14.5%",
      status: "active" as const,
      image: property3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Secure Syndicate</h1>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Real Estate Investment" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="mb-6">
              <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
                🔒 Privacy-First Investment Platform
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Invest Together,{" "}
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Stay Private
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join exclusive real estate syndicates where your contributions remain encrypted 
              while participating in high-yield property investments with complete privacy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8"
                onClick={() => alert('Starting investment process...')}
              >
                Start Investing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-accent/20 text-accent hover:bg-accent/10 px-8"
                onClick={() => alert('Demo coming soon!')}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">End-to-End Encryption</p>
                  <p className="text-sm text-muted-foreground">Your data stays private</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">14.2% Avg Returns</p>
                  <p className="text-sm text-muted-foreground">Institutional quality</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Complete Transparency</p>
                  <p className="text-sm text-muted-foreground">Aggregate data only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Encrypted Contracts
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Properties
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-8">
            <DashboardStats />
          </TabsContent>
          
          <TabsContent value="contracts" className="mt-8">
            <ContractInteraction />
          </TabsContent>
          
          <TabsContent value="properties" className="mt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Active Syndicated Properties
              </h2>
              <p className="text-muted-foreground">
                High-quality real estate investments with encrypted ownership data
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
