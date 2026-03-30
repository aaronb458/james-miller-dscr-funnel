"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { designers } from "@/lib/designers";
import BookingModal from "@/components/BookingModal";

export default function DesignerTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeDesigner = designers[activeIndex];

  return (
    <>
      {/* Tab Navigation - circular photos */}
      <div className="flex justify-center gap-4 mb-6">
        {designers.map((designer, index) => (
          <button
            key={designer.slug}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-200 ${
              index === activeIndex ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`relative w-16 h-16 rounded-full overflow-hidden ring-2 transition-all duration-200 ${
                index === activeIndex
                  ? "ring-brand-gold ring-offset-2"
                  : "ring-transparent"
              }`}
            >
              <Image
                src={designer.imageUrl}
                alt={designer.firstName}
                fill
                className="object-cover object-top"
                sizes="64px"
              />
            </div>
            <span
              className={`text-xs font-medium transition-colors ${
                index === activeIndex
                  ? "text-brand-text-primary"
                  : "text-brand-text-muted"
              }`}
            >
              {designer.firstName}
            </span>
          </button>
        ))}
      </div>

      {/* Active Designer Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDesigner.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]"
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={activeDesigner.imageUrl}
              alt={activeDesigner.name}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-semibold">
                {activeDesigner.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={14} weight="fill" className="text-brand-gold" />
                <span className="text-white/80 text-sm">
                  {activeDesigner.experience}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
              {activeDesigner.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {activeDesigner.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-brand-cream text-brand-text-secondary text-xs font-medium rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-brand-charcoal hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              Book with {activeDesigner.firstName}
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <BookingModal
        designer={activeDesigner}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
