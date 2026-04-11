"use client"

import { motion } from "motion/react";
import demoimg from "@/public/deadpool-pfp.png";
import Image from "next/image";

const cards = [
  { img: demoimg, rotate: -18, x: -200, y: 30 },
  { img: demoimg, rotate: -12, x: -120, y: 10 },
  { img: demoimg, rotate: -6, x: -50, y: -5 },
  { img: demoimg, rotate: 0, x: 20, y: -10 },
  { img: demoimg, rotate: 6, x: 90, y: -5 },
  { img: demoimg, rotate: 12, x: 160, y: 10 },
  { img: demoimg, rotate: 18, x: 230, y: 30 },
];

const badges = [
  { name: "@coplin", x: "25%", y: "32%", color: "bg-accent text-foreground" },
  { name: "@andrea", x: "72%", y: "28%", color: "bg-muted text-foreground" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl lg:text-[5.5rem] font-display leading-[1.05] tracking-tight text-foreground mb-8 md:text-5xl"
        >
          A platform to showcase your talent <br />&<br />connect with people.
        </motion.h1>

        <div className="relative h-[340px] md:h-[420px] flex items-center justify-center mb-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: card.rotate }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.08, type: "spring", stiffness: 80 }}
              className="absolute w-[140px] md:w-[180px] lg:w-[200px] rounded-2xl overflow-hidden shadow-lg"
              style={{ transform: `translateX(${card.x}px)`, top: `${card.y + 40}px` }}
            >
              <Image
                src={card.img}
                alt="Community art"
                className="w-full h-[180px] md:h-[240px] object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}

          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              className={`absolute ${badge.color} px-4 py-1.5 rounded-full text-sm font-body font-medium shadow-md`}
              style={{ left: badge.x, top: badge.y }}
            >
              {badge.name}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-muted-foreground font-body text-base max-w-lg mx-auto mb-8"
        >
          Societies can display their events, and members can discover and book seamlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-4"
        >
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body text-sm font-medium hover:opacity-90 transition-opacity">
            GetStarted
          </button>
          <button className="text-foreground font-body text-sm font-medium hover:text-muted-foreground transition-colors">
            Read more
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
