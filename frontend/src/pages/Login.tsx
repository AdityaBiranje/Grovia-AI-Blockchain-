import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Shield, Lock, Mail } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { MoleculeBackground } from "@/components/MoleculeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      login(userEmail, "user");
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail && adminPassword) {
      login(adminEmail, "admin");
      toast.success("Admin access granted");
      navigate("/admin");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <MoleculeBackground />
      
      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Grovia
          </h1>
          <p className="text-xl text-muted-foreground">
            Intelligence That Sustains Trust
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Login */}
          <GlassCard delay={0.2}>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
            
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div>
                <Label htmlFor="user-email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="user@grovia.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="pl-10 glass border-primary/30 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="user-password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="••••••••"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="pl-10 glass border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full glow-primary bg-primary/20 border border-primary hover:bg-primary/30 text-primary font-semibold"
              >
                Sign In as User
              </Button>
            </form>
          </GlassCard>

          {/* Admin Login */}
          <GlassCard delay={0.4}>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center glow-secondary">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-email" className="text-foreground">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@grovia.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="pl-10 glass border-secondary/30 focus:border-secondary"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="admin-password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="pl-10 glass border-secondary/30 focus:border-secondary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full glow-secondary bg-secondary/20 border border-secondary hover:bg-secondary/30 text-secondary font-semibold"
              >
                Sign In as Admin
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
