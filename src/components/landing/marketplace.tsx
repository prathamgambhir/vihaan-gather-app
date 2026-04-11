"use client"

import { motion } from "motion/react";
import demoimg from "@/public/deadpool-pfp.png";
import Image from "next/image";

const cards = [
  { img: demoimg, rotate: -15 },
  { img: demoimg, rotate: -8 },
  { img: demoimg, rotate: 0 },
  { img: demoimg, rotate: 8 },
  { img: demoimg, rotate: 15 },
];

const MarketplaceSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-8 text-center">
        <div className="relative h-[280px] flex items-center justify-center mb-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, type: "spring", stiffness: 80 }}
              className="absolute w-[120px] md:w-[160px] rounded-2xl overflow-hidden shadow-lg"
              style={{ left: `${18 + i * 14}%`, top: `${i % 2 === 0 ? 10 : 30}%` }}
            >
              <Image src={card.img} alt="Art" className="w-full h-[160px] md:h-[200px] object-cover" loading="lazy" />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute left-[28%] top-[15%] bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-body font-medium"
          >
            @alician
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="absolute right-[10%] top-[20%] bg-accent text-foreground px-4 py-1.5 rounded-full text-sm font-body font-medium"
          >
            @andrea
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-display text-muted-foreground max-w-3xl mx-auto leading-snug"
        >
          Whether you're a society looking to grow
          <br />
          / or member seeking <span className="text-highlight">unique</span> events 🎭 connects
          <br />
          you to a world of creativity 💡 community.
        </motion.p>
      </div>
    </section>
  );
};

export default MarketplaceSection;
