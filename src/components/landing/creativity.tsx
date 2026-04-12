"use client"

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mentor1 from "@/public/mentor1.jpeg";
import mentor2 from "@/public/mentor2.jpeg";
import mentor3 from "@/public/mentor3.jpeg";
import mentor4 from "@/public/mentor4.jpeg";
import Image from "next/image";

const items = [
  { img: mentor1, label: "Tech Mentorship" },
  { img: mentor2, label: "Career Guidance" },
  { img: mentor3, label: "Design Sessions" },
  { img: mentor4, label: "Mock Interviews" },
];

const CreativitySection = () => {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground"
            >
              GET MORE <span className="text-accent">CLOSER</span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display text-foreground leading-tight mt-4 mb-4"
            >
              Marketplace
              <br />
              for Creativity
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm font-body text-muted-foreground max-w-xs leading-relaxed mb-8"
            >
              In the realm of Gather, creativity knows no bounds, eternal marketplace celebrates the timeless nature of art.
            </motion.p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronLeft size={16} className="text-foreground" />
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronRight size={16} className="text-foreground" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-[200px] md:w-[240px]"
              >
                <div className="rounded-2xl overflow-hidden mb-3 aspect-square">
                  <Image src={item.img} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm font-body text-foreground font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-end mt-4"
        >
          <button className="bg-accent text-foreground px-6 py-2.5 rounded-full font-body text-sm font-medium hover:opacity-90 transition-opacity">
            View All
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativitySection;
