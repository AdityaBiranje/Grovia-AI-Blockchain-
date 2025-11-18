import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Coins, Zap, Leaf, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { MoleculeBackground } from "@/components/MoleculeBackground";
import { EnergyOrb } from "@/components/EnergyOrb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    projectId: "",
    name: "",
    location: "",
    kwhGenerated: "",
    weatherScore: "",
    gridEmissionFactor: "",
    ownerWallet: "",
    ipfsHash: "",
  });

  const [result, setResult] = useState<{
    co2Tons: number;
    fraudScore: number;
    mintStatus: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate AI processing
    setTimeout(() => {
      setResult({
        co2Tons: Math.random() * 100 + 50,
        fraudScore: Math.random() * 20,
        mintStatus: "success",
      });
      toast.success("Project verified successfully!");
      
      // Scroll to results
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  const features = [
    {
      icon: Brain,
      title: "AI CO₂ Estimation",
      description: "Advanced machine learning models predict carbon offset with 95%+ accuracy",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Real-time anomaly detection identifies suspicious patterns and data manipulation",
      color: "secondary",
    },
    {
      icon: Coins,
      title: "Blockchain Tokenization",
      description: "Secure minting of verified carbon credits as NFTs on decentralized ledger",
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MoleculeBackground />
      
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Intelligence</span>
                <br />
                <span className="text-foreground">That Sustains</span>
                <br />
                <span className="gradient-text">Trust</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Verifying renewable energy projects with AI-powered carbon estimation
                and blockchain-secured transparency
              </p>
              
              <Button
                onClick={() => document.getElementById("verification")?.scrollIntoView({ behavior: "smooth" })}
                className="glow-primary bg-primary/20 border-2 border-primary hover:bg-primary/30 text-primary font-bold text-lg px-8 py-6"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Verification
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <EnergyOrb />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            What Grovia Does
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={index} delay={index * 0.2}>
                <div className={`w-16 h-16 rounded-xl bg-${feature.color}/20 flex items-center justify-center mb-6 glow-${feature.color}`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Verification Form */}
        <section id="verification" className="container mx-auto px-4 py-20">
          <GlassCard className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
              Submit Your Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projectId">Project ID</Label>
                  <Input
                    id="projectId"
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="glass border-primary/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass border-primary/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="glass border-primary/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="kwhGenerated">kWh Generated</Label>
                  <Input
                    id="kwhGenerated"
                    type="number"
                    value={formData.kwhGenerated}
                    onChange={(e) => setFormData({ ...formData, kwhGenerated: e.target.value })}
                    className="glass border-primary/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="weatherScore">Weather Score</Label>
                  <Input
                    id="weatherScore"
                    type="number"
                    step="0.01"
                    value={formData.weatherScore}
                    onChange={(e) => setFormData({ ...formData, weatherScore: e.target.value })}
                    className="glass border-primary/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gridEmissionFactor">Grid Emission Factor</Label>
                  <Input
                    id="gridEmissionFactor"
                    type="number"
                    step="0.001"
                    value={formData.gridEmissionFactor}
                    onChange={(e) => setFormData({ ...formData, gridEmissionFactor: e.target.value })}
                    className="glass border-primary/30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ownerWallet">Owner Wallet Address</Label>
                  <Input
                    id="ownerWallet"
                    value={formData.ownerWallet}
                    onChange={(e) => setFormData({ ...formData, ownerWallet: e.target.value })}
                    className="glass border-primary/30"
                    placeholder="0x..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ipfsHash">IPFS Hash</Label>
                  <Input
                    id="ipfsHash"
                    value={formData.ipfsHash}
                    onChange={(e) => setFormData({ ...formData, ipfsHash: e.target.value })}
                    className="glass border-primary/30"
                    placeholder="Qm..."
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full glow-primary bg-primary/20 border-2 border-primary hover:bg-primary/30 text-primary font-bold text-lg py-6"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Verify & Submit
              </Button>
            </form>
          </GlassCard>
        </section>

        {/* Results Section */}
        {result && (
          <section id="results" className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
                Verification Results
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <GlassCard>
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Predicted CO₂</h3>
                    <p className="text-4xl font-bold gradient-text">
                      {result.co2Tons.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground mt-2">tons saved</p>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Fraud Score</h3>
                    <p className="text-4xl font-bold text-secondary">
                      {result.fraudScore.toFixed(1)}%
                    </p>
                    <p className="text-muted-foreground mt-2">low risk</p>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="text-center">
                    <Coins className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Mint Status</h3>
                    <p className="text-4xl font-bold text-accent uppercase">
                      {result.mintStatus}
                    </p>
                    <p className="text-muted-foreground mt-2">NFT created</p>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </section>
        )}

        {/* Previous Projects */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">
            Recent Verifications
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard>
                  <h4 className="font-bold mb-2">Solar Farm #{i}</h4>
                  <p className="text-sm text-muted-foreground mb-2">California, USA</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-primary">Verified</span>
                    <span className="text-xs text-muted-foreground">
                      {(Math.random() * 100).toFixed(1)}t CO₂
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
