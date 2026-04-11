"use client"

import { motion } from "motion/react";
import { Eye } from "lucide-react";
import Image from "next/image";
import art3 from "@/public/deadpool-pfp.png";
import art4 from "@/public/deadpool-pfp.png";
import art5 from "@/public/deadpool-pfp.png";
import art6 from "@/public/deadpool-pfp.png";
import art1 from "@/public/deadpool-pfp.png";
import art2 from "@/public/deadpool-pfp.png";

const icons = [Eye];
const galleryImages = [art3, art4, art5, art6, art1, art2];
const labels = ["Art Studio", "Creative Lab", "Design Hub", "Event Space", "Gallery", "Workshop"];

const VisionSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-6"
          >
            <Eye size={18} className="text-foreground" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-foreground leading-tight mb-4"
          >
            Our vision
            <br />
            for any art technology.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-sm font-body text-muted-foreground max-w-sm mb-6 leading-relaxed"
          >
            Every piece of art tells a story. Gather allows societies to showcase their personal journeys through their work.
          </motion.p>
          <button className="border border-border text-foreground px-6 py-2.5 rounded-full font-body text-sm hover:bg-card transition-colors mb-12">
            Read more
          </button>

          <div className="grid grid-cols-4 gap-6 max-w-[280px]">
            {icons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
              >
                <Icon size={18} className="text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border"
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex gap-6">
              <span className="text-sm font-body font-medium text-foreground">Business</span>
              <span className="text-sm font-body text-muted-foreground">Personal</span>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-body font-medium">
              ● Create
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 p-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square">
                <Image src={img} alt={labels[i]} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
