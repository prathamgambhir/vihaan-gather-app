"use client"

import { motion } from "motion/react";
import Image from "next/image";
import art8 from "@/public/deadpool-pfp.png";
import art9 from "@/public/deadpool-pfp.png";

const StorySection = () => {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground"
          >
            YOUR STORY <span className="text-accent">TELLING</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-display italic text-foreground mt-4 leading-tight"
          >
            Every piece of art
            <br />
            tells a story
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border"
          >
            <div className="p-6">
              <span className="text-xs font-body text-muted-foreground">● Play Video</span>
            </div>
            <Image src={art8} alt="Story" className="w-full h-[260px] object-cover" loading="lazy" />
            <div className="p-6">
              <h3 className="text-xl font-display text-foreground mb-2">Connect, Create, Commerce</h3>
              <p className="text-sm font-body text-muted-foreground mb-4">
                Offering members a chance to own a piece of that narrative....
              </p>
              <button className="border border-border text-foreground px-6 py-2.5 rounded-full font-body text-sm hover:bg-secondary transition-colors">
                How it works?
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border"
          >
            <Image src={art9} alt="Commerce" className="w-full h-[300px] object-cover" loading="lazy" />
            <div className="p-6">
              <h3 className="text-xl font-display text-foreground mb-2">Where Art Breathes Commerce</h3>
              <p className="text-sm font-body text-muted-foreground mb-4">
                Artistic spirit with commercial viability, providing a platform where creativity...
              </p>
              <button className="border border-border text-foreground px-6 py-2.5 rounded-full font-body text-sm hover:bg-secondary transition-colors">
                Read more
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
