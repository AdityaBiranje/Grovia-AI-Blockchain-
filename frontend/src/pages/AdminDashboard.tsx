import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, AlertTriangle, Search, Filter } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { MoleculeBackground } from "@/components/MoleculeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const submissions = [
    {
      id: "PROJ-001",
      name: "Solar Valley Farm",
      location: "California, USA",
      co2: 85.4,
      fraudScore: 12.3,
      status: "Pending",
      date: "2025-11-15",
      wallet: "0x7a9f...3b2c",
    },
    {
      id: "PROJ-002",
      name: "Wind Ridge Station",
      location: "Texas, USA",
      co2: 124.7,
      fraudScore: 8.1,
      status: "Pending",
      date: "2025-11-15",
      wallet: "0x4f2a...8d1e",
    },
    {
      id: "PROJ-003",
      name: "Green Energy Hub",
      location: "Oregon, USA",
      co2: 96.2,
      fraudScore: 45.8,
      status: "Flagged",
      date: "2025-11-14",
      wallet: "0x9c1b...6a4f",
    },
  ];

  const handleApprove = (projectId: string) => {
    toast.success(`Project ${projectId} approved`);
  };

  const handleReject = (projectId: string) => {
    toast.error(`Project ${projectId} rejected`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MoleculeBackground />
      
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center glow-secondary">
                <Shield className="w-7 h-7 text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Review and manage project submissions
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-accent">24</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-accent" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approved</p>
                  <p className="text-3xl font-bold text-primary">158</p>
                </div>
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-destructive">12</p>
                </div>
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">High Risk</p>
                  <p className="text-3xl font-bold text-secondary">7</p>
                </div>
                <Shield className="w-10 h-10 text-secondary" />
              </div>
            </GlassCard>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass border-primary/30"
                />
              </div>
            </div>
            <Button className="glow-primary bg-primary/20 border border-primary hover:bg-primary/30">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Submissions Table */}
          <GlassCard>
            <h3 className="text-2xl font-bold mb-6">Project Submissions</h3>
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass rounded-xl p-6 ${
                    submission.fraudScore > 30 ? "border-2 border-destructive" : ""
                  }`}
                >
                  <div className="grid md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Project ID</p>
                      <p className="font-bold">{submission.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-bold">{submission.name}</p>
                      <p className="text-xs text-muted-foreground">{submission.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">CO₂ Estimate</p>
                      <p className="font-bold text-primary">{submission.co2}t</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fraud Score</p>
                      <p className={`font-bold ${
                        submission.fraudScore > 30 ? "text-destructive" :
                        submission.fraudScore > 20 ? "text-accent" : "text-primary"
                      }`}>
                        {submission.fraudScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <p className={`font-bold ${
                        submission.status === "Flagged" ? "text-destructive" : "text-accent"
                      }`}>
                        {submission.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                    <div>
                      <p className="text-xs text-muted-foreground">Wallet: {submission.wallet}</p>
                      <p className="text-xs text-muted-foreground">Submitted: {submission.date}</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleReject(submission.id)}
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/20"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleApprove(submission.id)}
                        className="glow-primary bg-primary/20 border border-primary hover:bg-primary/30 text-primary"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
