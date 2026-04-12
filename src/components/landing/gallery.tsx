"use client"

import { motion } from "motion/react";
import mentor1 from "@/public/mentor1.jpeg";
import mentor2 from "@/public/mentor2.jpeg";
import mentor3 from "@/public/mentor3.jpeg";
import mentor4 from "@/public/mentor4.jpeg";
import mentor5 from "@/public/mentor5.jpeg";
import mentor6 from "@/public/mentor6.jpeg";
import Image from "next/image";

const topRow = [mentor1, mentor2, mentor3, mentor4, mentor5, mentor6, mentor1, mentor2, mentor3];
const bottomRow = [mentor4, mentor5, mentor6, mentor1, mentor2, mentor3, mentor4, mentor5, mentor6];

const GallerySection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display text-foreground leading-tight"
        >
          Find your future
          <br />
          among those who have built it
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground font-body text-sm mt-4 max-w-md mx-auto"
        >
          Dive into a dynamic community where societies and members seamlessly merge.
        </motion.p>
      </div>

      <div className="space-y-4">
        {[topRow, bottomRow].map((row, rowIdx) => (
          <motion.div
            key={rowIdx}
            initial={{ x: rowIdx === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: rowIdx * 0.2 }}
            className="flex gap-4 justify-center"
          >
            {row.map((img, i) => (
              <div key={i} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={img} alt="Community" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
