'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  ChevronRight, 
  ShieldCheck,
  Clock,
  Terminal
} from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';

const TOP_ROUTES = [
  { name: 'Kerala Taxi', link: '#' },
  { name: 'Tamil Nadu Taxi', link: '#' },
];

const SERVICES = [
  { name: 'One Way Taxi', link: '#' },
  { name: 'Round Trip Taxi', link: '#' },
  { name: 'Airport Transfers', link: '#' },
  { name: 'Outstation Rides', link: '#' },
  { name: 'Local Sightseeing', link: '#' },
];

export default function Footer() {
  const { theme, fares } = useRegion();
  const currentYear = new Date().getFullYear();

  const primaryPhone = companyInfo?.companyNumber || '919626850192';

  return (
    <footer className="w-full bg-[#0b1329] text-gray-400 pt-16 pb-24 md:pb-12 border-t border-gray-800/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* UPPER MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800/60">
          
          {/* COLUMN 1: BRAND LOGO & METRICS */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="flex items-center gap-3 pr-4 cursor-pointer group w-max"
            >
              <div className="relative flex-shrink-0 transition-transform duration-300 h-12 w-12 group-hover:scale-105">
                <Image
                  src={companyInfo.companyLogo}
                  alt={`${companyInfo?.companyName || 'Company'} Logo`}
                  fill
                  sizes="48px"
                  className="object-cover border-2 rounded-full border-gray-700"
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <p className="text-base font-black uppercase text-white tracking-tight">
                  {companyInfo?.companyName?.split(" ")[0] || "Ganapathy"}{" "}
                  <span className={theme.textColor}>
                    {companyInfo?.companyName?.split(" ").slice(1).join(" ") || "Travels"}
                  </span>
                </p>
                <p className="text-[11px] font-semibold text-white tracking-wider uppercase">
                  {companyInfo.companySlogan}
                </p>
              </div>
            </Link>
            
            <p className="text-white text-sm leading-relaxed max-w-sm">
              South India's trusted intercity drop taxi service offering budget-friendly, professional one-way and round-trip experiences across {fares.stateName} and neighboring regions.
            </p>

            <div className="flex flex-col gap-2.5 pt-2 text-sm text-gray-300 font-medium">
              <div className="flex items-center gap-2.5">
                <Clock className={`w-4 h-4 shrink-0 ${theme.textColor}`} />
                <span>24/7 Booking Support Available</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className={`w-4 h-4 shrink-0 ${theme.textColor}`} />
                <span>Verified Clean Vehicles & Drivers</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: SERVICES LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`text-white text-xs font-black uppercase tracking-widest border-l-2 pl-2.5 ${theme.borderColor}`}>
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 ${theme.textColor}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: POPULAR ROUTES */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-white text-xs font-black uppercase tracking-widest border-l-2 pl-2.5 ${theme.borderColor}`}>
              Popular Routes
            </h4>
            <ul className="space-y-2.5 text-sm">
              {TOP_ROUTES.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 ${theme.textColor}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: DIRECT CONTACT INFO */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-white text-xs font-black uppercase tracking-widest border-l-2 pl-2.5 ${theme.borderColor}`}>
              Need Assistance?
            </h4>
            
            <div className="space-y-3.5 pt-1">
              <a 
                href={`tel:+${primaryPhone}`} 
                className="flex items-center gap-3 p-3 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors group shadow-inner"
              >
                <Phone className={`w-4 h-4 fill-current group-hover:scale-105 transition-transform ${theme.textColor}`} />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase font-semibold text-gray-500 tracking-wider">Call Support</span>
                  <span className="block text-sm font-black text-white tracking-wide">+{primaryPhone}</span>
                </div>
              </a>

              <a 
                href={`https://wa.me/${primaryPhone}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 p-3 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-[#25d366] transition-colors group shadow-inner"
              >
                <MessageSquare className="w-4 h-4 text-[#25d366] fill-current group-hover:scale-105 transition-transform" />
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase font-semibold text-gray-500 tracking-wider">WhatsApp Reservation</span>
                  <span className="block text-sm font-semibold text-white tracking-wide">Instant Response</span>
                </div>
              </a>

              <div className="flex items-start gap-3 px-1 pt-1 text-xs text-white leading-relaxed">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${theme.textColor}`} />
                <span>Headquartered in {fares.stateName}, serving all primary sectors across South India.</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA / LEGAL SUMMARY BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>&copy; {currentYear} <span className="text-gray-200 font-semibold">{companyInfo?.companyName || 'Tours & Travels'}</span>. All rights reserved.</span>
            <div className="hidden sm:inline text-white">|</div>
            <div className="flex items-center gap-4">
              {/* <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link> */}
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* DEVELOPED BY BRAND BADGE */}
          <div className="flex items-center gap-2 bg-gray-900/60 border border-gray-800/80 px-4 py-2 rounded-xl text-gray-400 font-medium">
            <Terminal className={`w-3.5 h-3.5 ${theme.textColor}`} />
            <span>Developed by</span>
            <a 
              href="https://wepzite.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-white font-black tracking-wide transition-colors uppercase flex items-center gap-0.5 border-b border-dashed border-gray-600 ${theme.hoverText}`}
            >
              wepzite.in
            </a>
          </div>
        </div>

      </div>

      {/* MOBILE STICKY FLOATING QUICK DOCK BAR */}
      

    </footer>
  );
}