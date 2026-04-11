"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import demoimg from "@/public/deadpool-pfp.png";

const cards = [
  { img: demoimg, rotate: -18, x: -250, y: 30 },
  { img: demoimg, rotate: -12, x: -160, y: 10 },
  { img: demoimg, rotate: -6, x: -70, y: -5 },
  { img: demoimg, rotate: 0, x: 20, y: -10 },
  { img: demoimg, rotate: 6, x: 110, y: -5 },
  { img: demoimg, rotate: 12, x: 200, y: 10 },
  { img: demoimg, rotate: 18, x: 290, y: 30 },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        {/* Optimized Header Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-[4.2rem] font-display leading-[1.1] tracking-tighter text-black dark:text-white mb-6"
        >
          A platform to showcase your talent <br className="hidden md:block" />
          <span className="text-neutral-400 dark:text-neutral-600">&</span> connect with people.
        </motion.h1>

        {/* Card Stack with Left-to-Right Entrance */}
        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -100, rotate: -20 }} // Starts from left
              animate={{ opacity: 1, x: card.x, rotate: card.rotate }} // Slides to final X
              transition={{ 
                duration: 0.9, 
                delay: 0.2 + i * 0.1, // Staggered delay for "wave" effect
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="absolute w-[130px] md:w-[170px] lg:w-[190px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl bg-neutral-100 dark:bg-neutral-900"
              style={{ top: `${card.y + 40}px` }}
            >
              <Image
                src={card.img}
                alt="Community art"
                className="w-full h-[170px] md:h-[230px] object-cover transition-all duration-500"
                loading="eager"
              />
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-neutral-500 dark:text-neutral-400 font-body text-lg max-w-xl mx-auto mb-10"
        >
          Societies can display their events, and members can discover and book seamlessly.
        </motion.p>

        {/* Buttons - High Contrast Monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto bg-black text-white dark:bg-white dark:text-black px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform duration-300 shadow-lg">
            Get Started
          </button>
          <button className="group text-black dark:text-white font-bold text-base flex items-center gap-2">
            Read more 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;