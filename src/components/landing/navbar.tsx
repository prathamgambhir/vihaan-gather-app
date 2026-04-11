"use client"

import { motion } from "motion/react";
import { User, Settings } from "lucide-react";

const navLinks = ["Colleges", "Mentor", "AI"];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto"
    >
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent">
          <path d="M6 22L14 6L22 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 16H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-lg font-bold font-body tracking-tight text-foreground">Gather</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <User size={18} className="text-foreground" />
        </button>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <Settings size={18} className="text-foreground" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
