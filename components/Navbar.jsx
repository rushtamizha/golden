// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Menu, X, MessageCircle } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { navigationData, companyInfo } from "@/lib/data";
// import { useRegion } from "@/app/context/RegionContext";

// const Navbar = () => {
//   const router = useRouter();
//   const { theme, fares } = useRegion();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           setScrolled(window.scrollY > 20);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full flex flex-col items-center px-4 bg-white capitalize border-b border-gray-100 z-[999] transition-all duration-300 ${
//         scrolled ? "py-2.5 shadow-sm" : "py-4"
//       }`}
//     >
//       {/* HEADER BAR */}
//       <div className="w-full max-w-7xl flex items-center justify-between">
        
//         {/* LOGO SECTION WITH HOVER ANIMATION */}
//         <Link href="/" className="flex items-center gap-3 pr-4 cursor-pointer group">
//           <motion.div 
//             className="relative flex-shrink-0 h-10 w-10 overflow-hidden rounded-full border border-gray-100"
//             whileHover={{ scale: 1.08 }}
//             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//           >
//             <Image
//               src={companyInfo.companyLogo}
//               alt={`${companyInfo.companyName} Logo`}
//               fill
//               className="object-cover"
//               sizes="40px"
//               priority
//             />
//           </motion.div>
//           <div className="flex flex-col justify-center leading-tight">
//             <p className="text-md font-semibold uppercase text-gray-900 tracking-tight">
//               {companyInfo.companyName.split(" ").slice(0, 2).join(" ")}
//               <span className={`ml-1 ${theme.textColor}`}>{companyInfo.companyName.split(" ").slice(2).join(" ")}</span>
//             </p>
//             <p className={`text-[10px] font-semibold tracking-wider uppercase ${theme.textColor}`}>
//               {companyInfo.companySlogan}
//             </p>
//           </div>
//         </Link>

//         {/* DESKTOP NAV WITH SPRING PILL BACKDROP HOVER */}
//         <div 
//           className="items-center hidden px-2 space-x-1 lg:flex relative"
//           onMouseLeave={() => setHoveredIndex(null)}
//         >
//           {navigationData.map((menu, idx) => (
//             <Link
//               key={menu.name}
//               href={menu.link || "#"}
//               className={`relative px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 z-10 flex items-center gap-2 ${theme.hoverText}`}
//               onMouseEnter={() => setHoveredIndex(idx)}
//             >
//               {/* Sliding background indicator - Using theme.pillBg instead of interpolation manipulation */}
//               {hoveredIndex === idx && (
//                 <motion.span
//                   layoutId="nav-hover-pill"
//                   className={`absolute inset-0 rounded-full -z-10 ${theme.pillBg}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                 />
//               )}
              
//               {/* Icon reveals smoothly on hover */}
//               <AnimatePresence>
//                 {hoveredIndex === idx && menu.icon && (
//                   <motion.span
//                     initial={{ width: 0, opacity: 0, scale: 0.8 }}
//                     animate={{ width: "auto", opacity: 0.8, scale: 1 }}
//                     exit={{ width: 0, opacity: 0, scale: 0.8 }}
//                     className={`${theme.textColor} flex items-center justify-center`}
//                   >
//                     {menu.icon}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
              
//               <span>{menu.name}</span>
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT CTA WITH SPRING HOVER */}
//         <div className="items-center hidden lg:flex">
//           <motion.button
//             onClick={() => router.push("/contact")}
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//             className={`flex items-center gap-2 py-2.5 text-xs font-semibold text-black tracking-wide uppercase transition-colors rounded-full hover:text-white bg-[#fbb817] px-6 ${theme.hoverBg}`}
//           >
//             <MessageCircle size={14} /> Book Now
//           </motion.button>
//         </div>

//         {/* MOBILE MENU TOGGLE */}
//         <motion.button
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//           whileTap={{ scale: 0.92 }}
//           className={`flex items-center justify-center w-10 h-10 transition-colors rounded-full lg:hidden bg-gray-50 text-gray-900`}
//           aria-label="Toggle navigation menu"
//         >
//           {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
//         </motion.button>
//       </div>

//       {/* MOBILE MENU DROPDOWN */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 1, y: -20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 1, y: -20 }}
//             transition={{ type: "spring", duration: 0.35 }}
//             className="lg:hidden w-full absolute top-[70px] bg-white shadow-xs border-b border-gray-100 p-5 z-50 origin-top"
//           >
//             <div className="flex flex-col gap-3">
//               {navigationData.map((menu) => (
//                 <div key={menu.name} className="w-full">
//                   <Link 
//                     href={menu.link || "#"} 
//                     onClick={() => setIsMobileOpen(false)}
//                     className={`flex items-center gap-3 py-2.5 px-3 text-sm font-semibold text-gray-700 rounded-xl transition-all duration-200 group ${theme.hoverText} hover:${theme.pillBg}`}
//                   >
//                     <span className="text-gray-400 group-hover:text-inherit transition-colors">
//                       {menu.icon}
//                     </span>
//                     <span>{menu.name}</span>
//                   </Link>
//                 </div>
//               ))}

//               <div className="pt-2 border-t border-gray-50">
//                 <motion.button
//                   onClick={() => {
//                     router.push("/contact");
//                     setIsMobileOpen(false);
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`w-full hover:text-white bg-[#fbb817] ${theme.bgColor} py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors`}
//                 >
//                   <MessageCircle size={16} /> BOOK NOW 
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;



"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Menu, X, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navigationData, companyInfo } from "@/lib/data";
import { useRegion } from "@/app/context/RegionContext";

const Navbar = () => {
  const router = useRouter();
  const { theme, fares, region, setRegion } = useRegion();
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
              {companyInfo.companyName.split(" ").slice(0, 2).join(" ")}
              <span className={`ml-1 ${theme.textColor}`}>{companyInfo.companyName.split(" ").slice(2).join(" ")}</span>
            </p>
            <p className={`text-[10px] font-semibold tracking-wider uppercase ${theme.textColor}`}>
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
              className={`relative px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 z-10 flex items-center gap-2 ${theme.hoverText}`}
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${theme.pillBg}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <AnimatePresence>
                {hoveredIndex === idx && menu.icon && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ width: "auto", opacity: 0.8, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.8 }}
                    className={`${theme.textColor} flex items-center justify-center`}
                  >
                    {menu.icon}
                  </motion.span>
                )}
              </AnimatePresence>
              
              <span>{menu.name}</span>
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE OPTIONS (REGION TOGGLE + CTA BUTTON) */}
        <div className="items-center hidden lg:flex gap-4">
          
          {/* ENTERPRISE REGIONAL TOGGLE SWITCH */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/60 relative">
            <button
              onClick={() => setRegion("kerala")}
              className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 z-10 uppercase tracking-wider flex items-center gap-1.5 ${
                region === "kerala" ? "text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <MapPin size={12} className={region === "kerala" ? "text-white" : "text-gray-400"} />
              KL
            </button>
            <button
              onClick={() => setRegion("tamil nadu")}
              className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors duration-200 z-10 uppercase tracking-wider flex items-center gap-1.5 ${
                region === "tamil nadu" ? "text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <MapPin size={12} className={region === "tamil nadu" ? "text-white" : "text-gray-400"} />
              TN
            </button>
            
            {/* Sliding backdrop active background modifier */}
            <motion.span
              layoutId="active-region-pill"
              className={`absolute top-1 bottom-1 left-1 rounded-full -z-0 bg-gray-900`}
              animate={{
                x: region === "tamil nadu" ? "100%" : "0%",
                width: region === "tamil nadu" ? "calc(50% - 4px)" : "calc(50% - 4px)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                backgroundColor: region === "kerala" ? "#059669" : "#c52038"
              }}
            />
          </div>

          {/* CTA BOOK NOW BUTTON */}
          <motion.button
            onClick={() => router.push("/contact")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`flex items-center gap-2 py-2.5 text-xs font-semibold text-black tracking-wide uppercase transition-colors rounded-full hover:text-white bg-[#fbb817] px-6 ${theme.hoverBg}`}
          >
            <MessageCircle size={14} /> Book Now
          </motion.button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <motion.button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileTap={{ scale: 0.92 }}
          className={`flex items-center justify-center w-10 h-10 transition-colors rounded-full lg:hidden bg-gray-50 text-gray-900`}
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: -20 }}
            transition={{ type: "spring", duration: 0.35 }}
            className={`lg:hidden  absolute left-4 right-4 rounded-2xl ${scrolled ? "top-[70px]" : "top-[80px]"} transition-all bg-white shadow-xs border-b border-gray-100 p-5 z-50 origin-top`}
          >
            <div className="flex flex-col gap-3">
              
              {/* MOBILE REGION CONTAINER PANEL */}
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operating Zone</span>
                <div className="flex bg-white p-0.5 rounded-full border border-gray-200 relative w-32 justify-between">
                  <button
                    onClick={() => setRegion("kerala")}
                    className={`flex-1 py-1.5 text-[10px] font-black rounded-full z-10 text-center transition-colors duration-200 ${
                      region === "kerala" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    KERALA
                  </button>
                  <button
                    onClick={() => setRegion("tamil nadu")}
                    className={`flex-1 py-1.5 text-[10px] font-black rounded-full z-10 text-center transition-colors duration-200 ${
                      region === "tamil nadu" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    TN
                  </button>
                  <motion.span
                    layoutId="active-region-pill-mobile"
                    className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full -z-0 w-[calc(50%-2px)]"
                    animate={{ x: region === "tamil nadu" ? "100%" : "0%" }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    style={{
                      backgroundColor: region === "kerala" ? "#059669" : "#c52038"
                    }}
                  />
                </div>
              </div>

              {navigationData.map((menu) => (
                <div key={menu.name} className="w-full">
                  <Link 
                    href={menu.link || "#"} 
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 py-2.5 px-3 text-sm font-semibold text-gray-700 rounded-xl transition-all duration-200 group ${theme.hoverText} hover:${theme.pillBg}`}
                  >
                    <span className="text-gray-400 group-hover:text-inherit transition-colors">
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
                  className={`w-full hover:text-white bg-[#fbb817] ${theme.hoverBg} py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors`}
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