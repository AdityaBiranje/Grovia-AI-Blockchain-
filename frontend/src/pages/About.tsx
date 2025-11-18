import { motion } from "framer-motion";
import { Zap, Database, Shield, Workflow } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { MoleculeBackground } from "@/components/MoleculeBackground";

export default function About() {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Renewable energy projects submit operational data including kWh generated, weather conditions, and location metrics.",
    },
    {
      icon: Zap,
      title: "AI Analysis",
      description: "Machine learning models process the data to predict CO₂ offset and detect anomalies with 95%+ accuracy.",
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Advanced algorithms identify suspicious patterns and validate data integrity before blockchain submission.",
    },
    {
      icon: Workflow,
      title: "Tokenization",
      description: "Verified carbon credits are minted as NFTs on the blockchain, ensuring transparent and immutable records.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MoleculeBackground />
      
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              About Grovia
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining artificial intelligence with blockchain technology to create
              a trustworthy ecosystem for renewable energy carbon credit verification
            </p>
          </motion.div>

          {/* Mission */}
          <section className="mb-20">
            <GlassCard className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Grovia exists to bridge the trust gap in carbon credit markets. By leveraging
                cutting-edge AI and blockchain technology, we ensure that every renewable energy
                project's carbon offset claims are accurate, verifiable, and immutable. Our platform
                empowers stakeholders with confidence in their sustainability investments.
              </p>
            </GlassCard>
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              How It Works
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <GlassCard key={index} delay={index * 0.1}>
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 glow-primary">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-20">
            <GlassCard className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
                Technology Stack
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-primary">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">AI/ML</h3>
                  <p className="text-sm text-muted-foreground">
                    TensorFlow, scikit-learn for predictive modeling
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 glow-secondary">
                    <Shield className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-bold mb-2">Blockchain</h3>
                  <p className="text-sm text-muted-foreground">
                    Ethereum smart contracts, IPFS storage
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 glow-accent">
                    <Database className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">
                    React, Node.js, PostgreSQL
                  </p>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: "How accurate is the AI prediction?",
                  a: "Our machine learning models achieve 95%+ accuracy through continuous training on real-world renewable energy data.",
                },
                {
                  q: "What blockchain is used?",
                  a: "Grovia uses Ethereum for smart contracts and IPFS for decentralized data storage.",
                },
                {
                  q: "How is fraud detected?",
                  a: "Advanced anomaly detection algorithms analyze patterns in submission data to identify suspicious activity before blockchain minting.",
                },
                {
                  q: "Can I audit my carbon credits?",
                  a: "Yes, all verified credits are stored on the blockchain with full transparency and immutable records.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard>
                    <h3 className="font-bold text-lg mb-2 text-primary">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
