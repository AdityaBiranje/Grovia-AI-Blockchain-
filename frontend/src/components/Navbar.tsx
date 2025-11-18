import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary glow-primary" />
            <span className="text-xl font-bold gradient-text">Grovia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="relative transition-smooth text-muted-foreground hover:text-foreground"
                activeClassName="text-primary"
              >
                {item.name}
              </NavLink>
            ))}
            <Button className="glow-primary bg-primary/20 border border-primary hover:bg-primary/30">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setIsOpen(false)}
                className="block py-2 transition-smooth text-muted-foreground hover:text-foreground"
                activeClassName="text-primary"
              >
                {item.name}
              </NavLink>
            ))}
            <Button className="w-full glow-primary bg-primary/20 border border-primary hover:bg-primary/30">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
