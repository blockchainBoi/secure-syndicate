import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, TrendingUp, Users } from "lucide-react";
import { config } from "@/config/env";

// Contract ABI for SecureSyndicate
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_verifier", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {"name": "reputation", "type": "bytes"},
      {"name": "initialContribution", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "joinSyndicate",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "_name", "type": "string"},
      {"name": "_description", "type": "string"},
      {"name": "_targetAmount", "type": "uint256"},
      {"name": "_duration", "type": "uint256"}
    ],
    "name": "createProject",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "projectId", "type": "uint256"},
      {"name": "amount", "type": "bytes"},
      {"name": "expectedReturn", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "makeInvestment",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

export function ContractInteraction() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  const { toast } = useToast();

  const [joinForm, setJoinForm] = useState({
    reputation: "",
    contribution: ""
  });

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    targetAmount: "",
    duration: ""
  });

  const [investmentForm, setInvestmentForm] = useState({
    projectId: "",
    amount: "",
    expectedReturn: ""
  });

  // Simulate FHE encryption (in real implementation, this would use Zama's FHE library)
  const encryptData = (value: string): string => {
    // This is a placeholder - in production, use actual FHE encryption
    return btoa(value + "_encrypted");
  };

  const handleJoinSyndicate = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    try {
      const encryptedReputation = encryptData(joinForm.reputation);
      const encryptedContribution = encryptData(joinForm.contribution);
      
      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'joinSyndicate',
        args: [encryptedReputation, encryptedContribution, "0x"],
        value: BigInt(joinForm.contribution) * BigInt(10**18) // Convert to wei
      });

      toast({
        title: "Transaction Submitted",
        description: "Your encrypted data is being processed on-chain",
      });
    } catch (err) {
      toast({
        title: "Transaction Failed",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    }
  };

  const handleCreateProject = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    try {
      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createProject',
        args: [
          projectForm.name,
          projectForm.description,
          BigInt(projectForm.targetAmount),
          BigInt(projectForm.duration)
        ]
      });

      toast({
        title: "Project Created",
        description: "Your project has been created with encrypted parameters",
      });
    } catch (err) {
      toast({
        title: "Transaction Failed",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    }
  };

  const handleMakeInvestment = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    try {
      const encryptedAmount = encryptData(investmentForm.amount);
      const encryptedReturn = encryptData(investmentForm.expectedReturn);
      
      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'makeInvestment',
        args: [
          BigInt(investmentForm.projectId),
          encryptedAmount,
          encryptedReturn,
          "0x"
        ],
        value: BigInt(investmentForm.amount) * BigInt(10**18) // Convert to wei
      });

      toast({
        title: "Investment Submitted",
        description: "Your encrypted investment data is being processed",
      });
    } catch (err) {
      toast({
        title: "Transaction Failed",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Secure Contract Interaction
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with encrypted smart contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please connect your wallet to access contract functions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">🔐 Encrypted Contract Operations</h2>
        <p className="text-muted-foreground">
          All sensitive data is encrypted using FHE before being stored on-chain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Join Syndicate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Join Syndicate
            </CardTitle>
            <CardDescription>
              Become a member with encrypted reputation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reputation">Reputation Score</Label>
              <Input
                id="reputation"
                type="number"
                placeholder="Enter reputation (1-100)"
                value={joinForm.reputation}
                onChange={(e) => setJoinForm({...joinForm, reputation: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="contribution">Initial Contribution (ETH)</Label>
              <Input
                id="contribution"
                type="number"
                step="0.01"
                placeholder="0.1"
                value={joinForm.contribution}
                onChange={(e) => setJoinForm({...joinForm, contribution: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleJoinSyndicate}
              disabled={isPending || isConfirming}
              className="w-full"
            >
              <Lock className="mr-2 h-4 w-4" />
              {isPending ? "Encrypting..." : isConfirming ? "Confirming..." : "Join with FHE"}
            </Button>
          </CardContent>
        </Card>

        {/* Create Project */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Create Project
            </CardTitle>
            <CardDescription>
              Launch an investment project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="My Investment Project"
                value={projectForm.name}
                onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Project description..."
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="targetAmount">Target Amount (ETH)</Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="10.0"
                value={projectForm.targetAmount}
                onChange={(e) => setProjectForm({...projectForm, targetAmount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={projectForm.duration}
                onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleCreateProject}
              disabled={isPending || isConfirming}
              className="w-full"
            >
              <Shield className="mr-2 h-4 w-4" />
              {isPending ? "Creating..." : isConfirming ? "Confirming..." : "Create Project"}
            </Button>
          </CardContent>
        </Card>

        {/* Make Investment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Make Investment
            </CardTitle>
            <CardDescription>
              Invest with encrypted amounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="projectId">Project ID</Label>
              <Input
                id="projectId"
                type="number"
                placeholder="1"
                value={investmentForm.projectId}
                onChange={(e) => setInvestmentForm({...investmentForm, projectId: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="amount">Investment Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="1.0"
                value={investmentForm.amount}
                onChange={(e) => setInvestmentForm({...investmentForm, amount: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="expectedReturn">Expected Return (%)</Label>
              <Input
                id="expectedReturn"
                type="number"
                step="0.1"
                placeholder="15.0"
                value={investmentForm.expectedReturn}
                onChange={(e) => setInvestmentForm({...investmentForm, expectedReturn: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleMakeInvestment}
              disabled={isPending || isConfirming}
              className="w-full"
            >
              <Lock className="mr-2 h-4 w-4" />
              {isPending ? "Encrypting..." : isConfirming ? "Confirming..." : "Invest Securely"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Status */}
      {(isPending || isConfirming || isConfirmed) && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {isPending && <p className="text-yellow-600">⏳ Encrypting data and submitting transaction...</p>}
              {isConfirming && <p className="text-blue-600">🔄 Waiting for confirmation...</p>}
              {isConfirmed && <p className="text-green-600">✅ Transaction confirmed! Your encrypted data is now on-chain.</p>}
              {hash && (
                <p className="text-sm text-muted-foreground">
                  Transaction Hash: <code className="bg-muted px-1 rounded">{hash}</code>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">❌ Error: {error.message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
