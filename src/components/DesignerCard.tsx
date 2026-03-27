"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "@phosphor-icons/react";
import type { Designer } from "@/lib/designers";

interface DesignerCardProps {
  designer: Designer;
  index: number;
}

export default function DesignerCard({ designer, index }: DesignerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300 group"
    >
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <Image
          src={designer.imageUrl}
          alt={designer.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-semibold">{designer.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Star size={14} weight="fill" className="text-brand-gold" />
            <span className="text-white/80 text-sm">{designer.experience}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
          {designer.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {designer.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-brand-cream text-brand-text-secondary text-xs font-medium rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        <Link
          href={`/book/${designer.slug}`}
          className="w-full bg-brand-charcoal hover:bg-brand-brown text-white font-medium py-3 px-6 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Book with {designer.firstName}
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </motion.div>
  );
}
