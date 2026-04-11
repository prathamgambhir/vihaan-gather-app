"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "../theme/toggle-theme";
import Link from "next/link";

const navLinks = [
  { name: "Colleges", href: "#" },
  { name: "Mentor", href: "#" },
  { name: "AI", href: "#" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 max-w-[1500px] mx-auto">
        
        {/* Logo - Large & Bold for B&W Theme */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center"
        >
          <Link href="/" className="text-3xl font-display font-bold tracking-tighter text-black dark:text-white transition-colors">
            Gather
          </Link>
        </motion.div>

        {/* Navigation Links - Centered & Larger Font */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link
                href={link.href}
                className="text-lg font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors duration-200 relative group"
              >
                {link.name}
                {/* Minimalist underline for B&W aesthetic */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Actions - Theme Toggle then Login */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="scale-110">
            <ThemeToggle />
          </div>
          
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-base font-bold transition-all border border-black dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-200"
          >
            Login
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;