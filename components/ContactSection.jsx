'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, MapPin, ShieldCheck, HelpCircle } from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';

export default function ContactSection() {
  const { theme, fares } = useRegion();

  const primaryPhone = companyInfo?.companyNumber || '919626850192';
  const emailAddress = companyInfo?.companyGmail || 'wepzitedev@gmail.com';

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-16 text-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* GRID LAYOUT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* LEFT SIDE CONTENT PANEL */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`flex items-center gap-2 font-semibold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full w-max ${theme.pillBg} ${theme.textColor}`}>
              <HelpCircle className="w-3.5 h-3.5" />
              Contact {companyInfo?.companyName || 'Tours & Travels'}
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
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
                  className="p-5 border border-blue-200 rounded-2xl flex items-start gap-4 bg-blue-50 transition-all group shadow-xs hover:border-blue-500"
                >
                  <div className={`p-3 rounded-xl transition-colors bg-blue-500 text-white`}>
                    <Phone className="w-5 h-5 " />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Call Support</h4>
                    <p className={`text-base font-semibold text-blue-500 mt-0.5 transition-colors `}>
                      +{primaryPhone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp Card */}
                <a 
                  href={`https://wa.me/${primaryPhone}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-5 border   rounded-2xl flex items-start gap-4 border-emerald-500 hover:border-emerald-700 bg-green-50 transition-all group shadow-xs"
                >
                  <div className="p-3 bg-emerald-700 rounded-xl   text-white transition-colors">
                    <MessageSquare className="w-5 h-5 " />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">WhatsApp Booking</h4>
                    <p className="text-base font-semibold text-emerald-700 mt-0.5 group-hover:text-emerald-600 transition-colors">
                      Instant Response
                    </p>
                  </div>
                </a>

                {/* Email Support Card */}
                <a 
                  href={`mailto:${emailAddress}`} 
                  className="p-5 border border-amber-600 bg-amber-50 rounded-2xl flex items-start gap-4  transition-all group shadow-xs sm:col-span-2 hover:border-amber-700"
                >
                  <div className="p-3 bg-amber-600 rounded-xl   text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Email Support</h4>
                    <p className="text-sm md:text-base font-semibold text-amber-600 mt-0.5 truncate">
                      {emailAddress}
                    </p>
                  </div>
                </a>

                {/* Service Area Card */}
                <div className="p-5 border border-amber-600 bg-amber-50 rounded-2xl flex items-start gap-4 sm:col-span-2 shadow-xs hover:border-amber-700">
                  <div className={`p-3 rounded-xl  bg-amber-600 text-white`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Service Area</h4>
                    <p className="text-sm md:text-base font-semibold text-amber-600 mt-0.5">
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
              className="bg-white border border-gray-100 w-full max-w-[520px] rounded-3xl p-6 md:p-8 flex flex-col shadow-sm relative overflow-hidden"
            >
              {/* Dynamic Glow Effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${theme.pillBg} rounded-full blur-3xl opacity-60 pointer-events-none -z-10`} />
              
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
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
                  className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl text-sm uppercase shadow-md transition text-center"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Get Fare on WhatsApp
                </a>

                <a
                  href={`tel:+${primaryPhone}`}
                  className={`flex items-center justify-center gap-3 text-white font-semibold py-4 px-6 rounded-2xl text-sm uppercase shadow-md transition text-center bg-blue-600 hover:opacity-90`}
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Call Now
                </a>
              </div>

              {/* FOOT NOTE TRUST BADGES */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] font-semibold text-gray-400 uppercase text-center flex-wrap">
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