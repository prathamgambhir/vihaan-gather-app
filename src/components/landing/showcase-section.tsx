"use client"

import { motion } from "motion/react";
import event1 from "@/public/event1.jpeg";
import event2 from "@/public/event2.jpeg";
import event3 from "@/public/event3.jpeg";
import event4 from "@/public/event4.jpeg";
import Image from "next/image";

const images = [
  { img: event1, rotate: -8, z: 1 },
  { img: event2, rotate: -3, z: 2 },
  { img: event3, rotate: 4, z: 3 },
  { img: event4, rotate: 10, z: 2 },
];

const ShowcaseSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground mb-4 block"
          >
            Discover
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-display leading-[1.1] text-foreground mb-6"
          >
            Find Your People. Build Your Story
            <br />
            <span className="text-highlight">&amp; acquire arts to</span>
            <br />
            our marketplace.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm mb-8"
          >
            Dynamic community where societies and members seamlessly merge. Gather brings together creators and enthusiasts to share creativity.
          </motion.p>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-primary-foreground px-7 py-3 rounded-full font-body text-sm font-medium hover:opacity-90 transition-opacity">
              Join for $9.99/m
            </button>
            <button className="border border-border text-foreground px-7 py-3 rounded-full font-body text-sm font-medium hover:bg-secondary transition-colors">
              Read more
            </button>
          </div>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          {images.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, type: "spring" }}
              className="absolute w-[160px] md:w-[200px] rounded-2xl overflow-hidden shadow-xl"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 2) * 15}%`,
                zIndex: item.z,
              }}
            >
              <Image src={item.img} alt="Showcase" className="w-full h-[220px] md:h-[280px] object-cover" loading="lazy" />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute top-[20%] right-[5%] bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-body font-medium shadow-md"
          >
            @howard
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
