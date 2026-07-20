"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRegion } from "@/app/context/RegionContext";

const RegionModal = () => {
  const { region, setRegion } = useRegion();

  // If region is already selected, don't display the modal block
  if (region) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl text-center border border-gray-100"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <MapPin size={32} />
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
            WELCOME TO TAXI SERVICES
          </h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Please select your location to help us provide localized structural dynamic pricing fares, tailored packages, and custom fleets available in your zone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* KERALA BUTTON */}
            <button
              onClick={() => setRegion("kerala")}
              className="group relative overflow-hidden bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-500 rounded-2xl p-5 text-left transition-all duration-300 shadow-sm"
            >
              <span className="block font-black text-lg text-gray-900 group-hover:text-emerald-700">
                Kerala
              </span>
              <span className="block text-xs text-gray-400 mt-1">
                God's Own Country Rates
              </span>
            </button>

            {/* TAMIL NADU BUTTON */}
            <button
              onClick={() => setRegion("tamil nadu")}
              className="group relative overflow-hidden bg-white hover:bg-amber-50 border-2 border-gray-200 hover:border-amber-500 rounded-2xl p-5 text-left transition-all duration-300 shadow-sm"
            >
              <span className="block font-black text-lg text-gray-900 group-hover:text-amber-700">
                Tamil Nadu
              </span>
              <span className="block text-xs text-gray-400 mt-1">
                Vanakkam! Local City Pricing
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegionModal;