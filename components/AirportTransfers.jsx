'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Users, 
  Briefcase, 
  Receipt, 
  Phone, 
  MessageSquare, 
  PlaneTakeoff,
  ShieldCheck,
  Repeat,
  Info,
  Road
} from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';
import { SiToll } from 'react-icons/si';

// Fleet Data populated dynamically with state fares fallback
const TRANSFER_VEHICLES = [
  {
    id: 'sedan',
    name: 'Swift Dzire / Sedan',
    tag: 'MOST BOOKED',
    tagColor: 'bg-amber-500 text-white',
    capacity: '4+1',
    oneWay: '2,599',
    round: '14/KM',
    local:"2,499",
    toll: 'Optional',
    luggage: 'Standard',
    img: '/CardCars/swift-dzire-one-way-taxi-pondicherry-to-chennai.webp',
    alt: 'Maruti Swift Dzire sedan taxi for Pondicherry to Chennai airport drop transfers'
  },
  {
    id: 'etios',
    name: 'Toyota Etios / Sedan ',
    tag: null,
    capacity: '4+1',
    oneWay: '2,599',
    round: '14/KM',
      local:"2,499",
    toll: 'Optional',
    luggage: 'Standard',
    img: '/CardCars/toyota-etios-airport-taxi-pondicherry-to-chennai.webp',
    alt: 'Toyota Etios airport taxi from Pondicherry to Chennai airport drop service'
  },
  {
    id: 'ciaz',
    name: 'Maruti Ciaz ',
    tag: null,
    capacity: '4+1',
    oneWay: '2,799',
    round: '15/KM',
      local:false,
    toll: 'Optional',
    luggage: 'Standard',
    img: '/CardCars/maruti-ciaz-premium-one-way-taxi-chennai-to-pondicherry.webp',
    alt: 'Premium Maruti Ciaz airport taxi service from travel between Chennai and Pondicherry'
  },
  {
    id: 'ertiga',
    name: 'Maruti Ertiga ',
    tag: 'FAMILY PICK',
    tagColor: 'bg-blue-700 text-white',
    capacity: '6+1',
    oneWay: '3,599',
    round: '19/KM',
      local:"3,699",
    toll: 'Optional',
    luggage: 'Standard',
    img: '/CardCars/maruti-ertiga-6-plus-1-family-taxi-pondicherry-to-chennai.webp',
    alt: 'Maruti Ertiga 6+1 family airport taxi booking from Pondicherry to Chennai'
  },{
    id: 'carens',
    name: 'Kia Carens ',
    tag: 'FAMILY PICK',
    tagColor: 'bg-blue-700 text-white',
    capacity: '6+1',
    oneWay: '3,599',
    round: '19/KM',
      local:"3,699",
    toll: 'Optional',
    luggage: 'Standard',
    img: '/CardCars/kia-carens.webp',
    alt: 'Maruti Ertiga 6+1 family airport taxi booking from Pondicherry to Chennai'
  },
  {
    id: 'innova',
    name: 'Toyota Innova ',
    tag: null,
    capacity: '7+1',
   oneWay: '3,899',
    round: '19/KM',
      local:"4,099",
    toll: 'Optional',
    luggage: 'Large',
    img: '/CardCars/toyota-innova-7-seater-taxi-pondicherry-to-chennai.webp',
    alt: 'Toyota Innova 7 seater outstation airport taxi from Chennai to Pondicherry'
  },
  {
    id: 'crysta',
    name: 'Toyota Innova Crysta ',
    tag: 'PREMIUM',
    tagColor: 'bg-blue-700 text-white',
    capacity: '7+1',
    oneWay: '4,599',
    round: '21/KM',
      local:"4,499",
    toll: 'Optional',
    luggage: 'Large',
    img: '/CardCars/toyota-innova-crysta-airport-taxi-pondicherry-to-chennai.webp',
    alt: 'Toyota Innova Crysta premium airport taxi for luxury family travel from Pondicherry to Chennai'
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller ',
    tag: 'GROUP',
    tagColor: 'bg-blue-600 text-white',
    capacity: '12+1',
     oneWay: "7,599",
    round: false,
      local:"5,599",
    toll: 'Optional',
    luggage: 'XL Space',
    img: '/CardCars/tempo-traveller-12-seater-pondicherry-to-chennai-taxi.webp',
    alt: '12 Seater Tempo Traveller group commercial van booking for Chennai and Pondicherry airport routes'
  },
];


export default function AirportTransfers() {
  const { theme, fares } = useRegion();

  return (
    <section id="fleets" className="w-full bg-white py-12 px-4 md:px-8 lg:px-16 text-gray-800 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER BLOCK WITH DYNAMIC STATE BRANDING */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className={`flex items-center gap-2 font-semibold text-xs uppercase px-3 py-1.5 rounded-full w-max tracking-wider ${theme.pillBg} ${theme.textColor}`}>
              <PlaneTakeoff className="w-3.5 h-3.5" />
              Active Region Fleet Matrix
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              {fares.stateName} Premium <span className={theme.textColor}>Fleet Tariffs</span>
            </h2>
            <p className="text-gray-500 text-xs md:text-sm font-medium max-w-xl">
              Transparent per-KM metrics, clear driver allowances, and no hidden charges across {fares.stateName}.
            </p>
          </div>
        </div>

        {/* VEHICLE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRANSFER_VEHICLES.map((item) => {
            // Retrieve regional pricing from fares context if available
            const vehicleFareData = fares?.vehicles?.[item.id] || fares?.vehicles?.sedan || {};
            const oneWayRate = vehicleFareData.oneWay?.perKm || 16;
            const roundTripRate = vehicleFareData.roundTrip?.perKm || 14;
            const driverBata = vehicleFareData.oneWay?.bata || 200;

            return (
              <div key={item.id} className="h-full flex">
                <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col w-full overflow-hidden relative group">
                  
                  {/* Badge Tag */}
                  {item.tag && (
                    <span className={`absolute top-4 left-4 z-10 text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-lg uppercase shadow-xs ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  )}

                  {/* Vehicle Image Container */}
                  <div className="w-full h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden border-b border-gray-100">
                    <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
                      <Image 
                        src={item.img} 
                        alt={item.alt} 
                        fill
                        className="object-cover "
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Name & Capacity Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-semibold text-gray-900 tracking-tight line-clamp-1">
                          {item.name}
                        </h3>
                        <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-md shrink-0">
                          <Users className="w-3.5 h-3.5 text-gray-500" />
                          {item.capacity}
                        </span>
                      </div>

                      {/* Verification Badge */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 mb-4">
                        <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                        <span>Verified Highway Fleet</span>
                      </div>

                      <hr className="border-gray-100 mb-4" />

                      {/* FARE DETAILS ACCURACY MATRIX */}
                      <div className="space-y-2.5 text-xs mb-6">
                        {/* One Way Rate */}
                        <div className={`flex justify-between items-center p-2.5 rounded-xl border border-gray-100 ${theme.pillBg}`}>
                          <span className={`font-semibold ${theme.textColor}`}>One Way Drop Rate</span>
                          <span className={`text-base font-black ${theme.textColor}`}>
                            {fares.currency}{oneWayRate}/KM
                          </span>
                        </div>

                        {/* Round Trip Rate */}
                        <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-700 font-semibold">Round Trip Rate</span>
                          <span className="text-base font-semibold text-gray-900">
                            {fares.currency}{roundTripRate}/KM
                          </span>
                        </div>

                        {/* Driver Allowance (Bata) */}
                        <div className="flex justify-between items-center px-1 pt-1 text-gray-500 text-[11px]">
                          <span className="flex items-center gap-1.5">
                            <Receipt className="w-3.5 h-3.5 text-gray-400" />
                            Driver Allowance (Bata)
                          </span>
                          <span className="font-semibold text-gray-800">
                            {fares.currency}{driverBata}
                          </span>
                        </div>

                        {/* Luggage Capacity */}
                        <div className="flex justify-between items-center px-1 text-gray-500 text-[11px]">
                          <span className="flex items-center gap-1.5">
                            <Road className="w-3.5 h-3.5 text-gray-400" />
                            Toll, Parking, Permit
                          </span>
                          <span className="font-medium text-gray-800">
                            Extra
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION EXECUTION CTA */}
                    <div className="pt-2">
                      <a
                        href={`https://wa.me/${companyInfo.companyNumber || "919626850192"}?text=Hi,%20I%20want%20to%20book%20a%20${encodeURIComponent(item.name)}%20in%20${encodeURIComponent(fares.stateName)}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase shadow-xs transition-all text-center ${theme.bgColor} hover:opacity-90`}
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        Book Ride Instantly
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}