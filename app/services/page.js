'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  UserCheck, 
  Car, 
  PhoneCall, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Phone,
  CheckCircle2
} from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';

export default function ServicesPage() {
  const { theme, fares } = useRegion();

  const primaryPhone = companyInfo?.companyNumber || '919626850192';
  const companyName = companyInfo?.companyName || 'Tours & Travels';

  const SERVICES_DATA = [
    {
      title: '24×7 One Way Taxi Service',
      desc: `${companyName} offers round-the-clock one way taxi and intercity cab services for flexible travel across ${fares.stateName} and neighboring South Indian destinations.`,
      icon: Clock,
      color: `${theme.textColor} ${theme.pillBg} border-current/20`,
    },
    {
      title: 'Professional Drivers',
      desc: 'Travel with experienced, verified drivers trained for long-distance highway routes, ensuring safe, punctual, and smooth intercity journeys.',
      icon: UserCheck,
      color: `${theme.textColor} ${theme.pillBg} border-current/20`,
    },
    {
      title: 'Comfortable AC Vehicles',
      desc: 'Choose from sanitized, well-maintained Hatchback, Sedan, SUV, and Tempo Traveller fleets tailored for family, solo, and group highway travel.',
      icon: Car,
      color: `${theme.textColor} ${theme.pillBg} border-current/20`,
    },
    {
      title: 'Transparent Pricing',
      desc: 'Get immediate booking assistance via call or WhatsApp with transparent per-KM billing, fixed driver allowances, and zero hidden charges.',
      icon: PhoneCall,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800 pt-32 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className={`flex items-center justify-center gap-2 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full w-max mx-auto ${theme.pillBg} ${theme.textColor}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Our Core Competencies
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            Why Choose <br />
            <span className={theme.textColor}>{companyName}</span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Providing reliable one way drop taxis, outstation round trips, and airport transfers with verified drivers and premium fleets across {fares.stateName} & South India.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-gray-100/80 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group"
              >
                {/* ICON BOX */}
                <div className={`p-4 rounded-2xl shrink-0 border transition-transform duration-300 group-hover:scale-105 ${service.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* CONTENT AREA */}
                <div className="space-y-2">
                  <h3 className={`text-lg md:text-xl font-semibold text-gray-900 transition-colors ${theme.hoverText}`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    {service.desc}
                  </p>
                  
                  {/* METRIC SUB-LABEL BADGE */}
                  <div className={`pt-2 flex items-center gap-1.5 text-[11px] font-semibold ${theme.textColor}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                    <span>Active Across {fares.stateName} & South India</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INTEGRATED BRAND PROMISE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
              Streamlining Intercity Highway Commutes In {fares.stateName}
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Our travel ecosystem is built specifically around long-distance transit demands across Tamil Nadu, Kerala, and inter-state corridors. By focusing on verified highway drivers and strict sanitization standards, we offer a transparent, stress-free alternative to surge-pricing apps and public transport.
            </p>
            
            {/* Quick list specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${theme.textColor}`} />
                <span>Intercity Point-to-Point Drops</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${theme.textColor}`} />
                <span>Fixed Regional Minimum Tariffs</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative shadow-inner">
            <img 
              src="/taxi-hero.png" 
              alt={`${companyName} Ride Experience in ${fares.stateName}`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION BLOCK */}
        <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-md text-center relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.pillBg} opacity-20 pointer-events-none`} />

          <h3 className="text-2xl md:text-3xl font-semibold relative z-10">
            Need Travel Guidance or Immediate Booking?
          </h3>

          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto mt-3 mb-8 font-medium relative z-10">
            Connect directly with our dispatch team. Get live route estimates, vehicle class choices, and instant confirmations with zero advance deposits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <a
              href={`tel:+${primaryPhone}`}
              className={`flex items-center justify-center gap-2.5 text-white font-semibold py-3.5 px-6 rounded-xl text-xs uppercase transition-all w-full sm:w-auto shadow-md active:scale-98 ${theme.bgColor} hover:opacity-90`}
            >
              <Phone className="w-4 h-4 fill-current" />
              Call Support Desk
            </a>

            <a
              href={`https://wa.me/${primaryPhone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold py-3.5 px-6 rounded-xl text-xs uppercase transition-all w-full sm:w-auto shadow-md active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              WhatsApp Booking Support
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}