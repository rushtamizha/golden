'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, MapPin, ShieldCheck, HelpCircle } from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';

export default function ContactSection() {
  const { theme, fares } = useRegion();

  const primaryPhone = companyInfo?.companyNumber || '918825555154';
  const emailAddress = companyInfo?.companyGmail || 'a.karthikmmv@gmail.com';

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-16 text-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* GRID LAYOUT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* LEFT SIDE CONTENT PANEL */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full w-max ${theme.pillBg} ${theme.textColor}`}>
              <HelpCircle className="w-3.5 h-3.5" />
              Contact {companyInfo?.companyName || 'Tours & Travels'}
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Book Your One Way Taxi In <br />
              <span className={theme.textColor}>{fares.stateName} With Instant Support</span>
            </h2>
            
            <p className="text-gray-600 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              Get instant taxi booking support for one way and intercity travel across {fares.stateName} and South India. 
              Contact us for fare details, route enquiries, and quick booking assistance.
            </p>

            <div className="pt-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Get in Touch
              </div>
              
              {/* CONTACT UTILITY CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Call Card */}
                <a 
                  href={`tel:+${primaryPhone}`} 
                  className="p-5 border border-gray-100 rounded-2xl flex items-start gap-4 bg-white transition-all group shadow-xs hover:border-gray-200"
                >
                  <div className={`p-3 rounded-xl transition-colors ${theme.pillBg} ${theme.textColor}`}>
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Call Support</h4>
                    <p className={`text-base font-extrabold text-gray-900 mt-0.5 transition-colors ${theme.hoverText}`}>
                      +{primaryPhone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp Card */}
                <a 
                  href={`https://wa.me/${primaryPhone}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-5 border border-gray-100 hover:bg-emerald-50/50 rounded-2xl flex items-start gap-4 hover:border-emerald-500 bg-white transition-all group shadow-xs"
                >
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">WhatsApp Booking</h4>
                    <p className="text-base font-extrabold text-gray-900 mt-0.5 group-hover:text-emerald-600 transition-colors">
                      Instant Response
                    </p>
                  </div>
                </a>

                {/* Email Support Card */}
                <a 
                  href={`mailto:${emailAddress}`} 
                  className="p-5 border border-gray-100 hover:bg-gray-50 rounded-2xl flex items-start gap-4 bg-white transition-all group shadow-xs sm:col-span-2"
                >
                  <div className="p-3 bg-gray-100 rounded-xl text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Email Support</h4>
                    <p className="text-sm md:text-base font-extrabold text-gray-900 mt-0.5 truncate">
                      {emailAddress}
                    </p>
                  </div>
                </a>

                {/* Service Area Card */}
                <div className="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl flex items-start gap-4 sm:col-span-2 shadow-xs">
                  <div className={`p-3 rounded-xl ${theme.pillBg} ${theme.textColor}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Service Area</h4>
                    <p className="text-sm md:text-base font-extrabold text-gray-900 mt-0.5">
                      {fares.stateName} & South India
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE CTA ACTION BLOCK (NO FORM) */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 w-full max-w-[520px] rounded-3xl p-6 md:p-8 flex flex-col shadow-lg relative overflow-hidden"
            >
              {/* Dynamic Glow Effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${theme.pillBg} rounded-full blur-3xl opacity-60 pointer-events-none -z-10`} />
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book Taxi Instantly
                </h3>
                <p className="text-gray-500 text-xs md:text-sm font-medium mt-1.5 leading-relaxed">
                  Contact us now for one way taxi booking, fare details, and quick confirmation. Our team is available to assist you anytime.
                </p>
              </div>

              {/* DIRECT CTA BUTTONS */}
              <div className="space-y-3.5 w-full">
                <a
                  href={`https://wa.me/${primaryPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-2xl text-sm uppercase shadow-md transition text-center"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Get Fare on WhatsApp
                </a>

                <a
                  href={`tel:+${primaryPhone}`}
                  className={`flex items-center justify-center gap-3 text-white font-extrabold py-4 px-6 rounded-2xl text-sm uppercase shadow-md transition text-center ${theme.bgColor} hover:opacity-90`}
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Call Now
                </a>
              </div>

              {/* FOOT NOTE TRUST BADGES */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] font-bold text-gray-400 uppercase text-center flex-wrap">
                <span>Instant response</span>
                <span className="text-gray-200">•</span>
                <span>Transparent pricing</span>
                <span className="text-gray-200">•</span>
                <span className={`flex items-center gap-1 ${theme.textColor}`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified drivers
                </span>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}