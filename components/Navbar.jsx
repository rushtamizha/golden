"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navigationData, companyInfo } from "@/lib/data";

const Navbar = () => {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex flex-col items-center px-4 bg-white capitalize border-b border-gray-100 z-[999] transition-all duration-300 ${
        scrolled ? "py-2.5 shadow-sm" : "py-4"
      }`}
    >
      {/* HEADER BAR */}
      <div className="w-full max-w-7xl flex items-center justify-between">
        
        {/* LOGO SECTION WITH HOVER ANIMATION */}
        <Link href="/" className="flex items-center gap-3 pr-4 cursor-pointer group">
          <motion.div 
            className="relative flex-shrink-0 h-10 w-10 overflow-hidden rounded-full border border-gray-100"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Image
              src={companyInfo.companyLogo}
              alt={`${companyInfo.companyName} Logo`}
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </motion.div>
          <div className="flex flex-col justify-center leading-tight">
            <p className="text-md font-semibold uppercase text-gray-900 tracking-tight">
              {companyInfo.companyName}
              <span className="ml-0.5 text-[#c52038]">Taxi</span>
            </p>
            <p className="text-[10px] font-semibold text-[#c52038] tracking-wider uppercase">
              {companyInfo.companySlogan}
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV WITH SPRING PILL BACKDROP HOVER */}
        <div 
          className="items-center hidden px-2 space-x-1 lg:flex relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navigationData.map((menu, idx) => (
            <Link
              key={menu.name}
              href={menu.link || "#"}
              className="relative px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 z-10 flex items-center gap-2 hover:text-[#c52038]"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              {/* Sliding background indicator */}
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-[#c52038]/5 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Icon reveals smoothly on hover */}
              <AnimatePresence>
                {hoveredIndex === idx && menu.icon && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ width: "auto", opacity: 0.8, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.8 }}
                    className="text-[#c52038] flex items-center justify-center"
                  >
                    {menu.icon}
                  </motion.span>
                )}
              </AnimatePresence>
              
              <span>{menu.name}</span>
            </Link>
          ))}
        </div>

        {/* RIGHT CTA WITH SPRING HOVER */}
        <div className="items-center hidden lg:flex">
          <motion.button
            onClick={() => router.push("/contact")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex items-center gap-2 py-2.5 text-xs font-semibold text-black tracking-wide uppercase transition-colors rounded-full  hover:text-white bg-[#fbb817] px-6 hover:bg-[#c52038]"
          >
            <MessageCircle size={14} /> Book Now
          </motion.button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <motion.button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileTap={{ scale: 0.92 }}
          className="flex items-center justify-center w-10 h-10 transition-colors rounded-full lg:hidden bg-[#c52038]/5 text-[#c52038] hover:bg-[#c52038]/10"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="lg:hidden w-full absolute top-[70px]  bg-white  shadow-xs  border-b border-gray-100 p-5 z-50 origin-top"
          >
            <div className="flex flex-col gap-3">
              {navigationData.map((menu) => (
                <div key={menu.name} className="w-full">
                  <Link 
                    href={menu.link || "#"} 
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-3 text-sm font-semibold text-gray-700 hover:text-[#c52038] hover:bg-[#c52038]/5 rounded-xl transition-all duration-200 group"
                  >
                    <span className="text-gray-400 group-hover:text-[#c52038] transition-colors">
                      {menu.icon}
                    </span>
                    <span>{menu.name}</span>
                  </Link>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-50">
                <motion.button
                  onClick={() => {
                    router.push("/contact");
                    setIsMobileOpen(false);
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full hover:text-white bg-[#fbb817]  hover:bg-[#c52038] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle size={16} /> BOOK NOW 
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;