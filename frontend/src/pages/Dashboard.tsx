import { motion } from "framer-motion";
import { User, Wallet, TrendingUp, FileText, Calendar } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { MoleculeBackground } from "@/components/MoleculeBackground";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const projects = [
    {
      id: "PROJ-001",
      name: "Solar Valley Farm",
      location: "California, USA",
      co2: 85.4,
      status: "Approved",
      date: "2025-11-10",
    },
    {
      id: "PROJ-002",
      name: "Wind Ridge Station",
      location: "Texas, USA",
      co2: 124.7,
      status: "Pending",
      date: "2025-11-12",
    },
    {
      id: "PROJ-003",
      name: "Green Energy Hub",
      location: "Oregon, USA",
      co2: 96.2,
      status: "Approved",
      date: "2025-11-15",
    },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              User Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome back, {user?.name || "User"}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <FileText className="w-10 h-10 text-primary" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CO₂ Saved</p>
                  <p className="text-3xl font-bold">1,247</p>
                </div>
                <TrendingUp className="w-10 h-10 text-secondary" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NFTs Minted</p>
                  <p className="text-3xl font-bold">9</p>
                </div>
                <Wallet className="w-10 h-10 text-accent" />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Days</p>
                  <p className="text-3xl font-bold">45</p>
                </div>
                <Calendar className="w-10 h-10 text-primary" />
              </div>
            </GlassCard>
          </div>

          {/* Profile */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <GlassCard className="md:col-span-1">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-primary">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{user?.name || "User Name"}</h3>
                <p className="text-sm text-muted-foreground mb-4">Verified Account</p>
                <Button className="w-full glow-primary bg-primary/20 border border-primary hover:bg-primary/30">
                  <Wallet className="w-4 h-4 mr-2" />
                  0x7a9f...3b2c
                </Button>
              </div>
            </GlassCard>

            <div className="md:col-span-2 space-y-4">
              <GlassCard>
                <h3 className="font-bold text-lg mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{user?.name?.toLowerCase().replace(/\s/g, "")}@grovia.io</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span>November 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verification Status:</span>
                    <span className="text-primary">Verified</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="glow-primary bg-primary/20 border border-primary hover:bg-primary/30">
                    Submit Project
                  </Button>
                  <Button className="glow-secondary bg-secondary/20 border border-secondary hover:bg-secondary/30">
                    View Analytics
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Recent Projects */}
          <GlassCard>
            <h3 className="text-2xl font-bold mb-6">Your Submissions</h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center justify-between hover:glow-primary transition-smooth"
                >
                  <div className="flex-1">
                    <h4 className="font-bold">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                      <p className="font-bold text-primary">{project.co2}t</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className={`font-bold ${
                        project.status === "Approved" ? "text-primary" : "text-accent"
                      }`}>
                        {project.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-bold">{project.date}</p>
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
