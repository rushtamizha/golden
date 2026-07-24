'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Users, 
  Receipt, 
  MessageSquare, 
  PlaneTakeoff,
  ShieldCheck,
  Road
} from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';

export default function AirportTransfers() {
  const { theme, fares } = useRegion();

  // Convert vehicles dictionary object into an array with keys included as 'id'
  const vehicleList = Object.entries(fares.vehicles || {}).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  console.log(vehicleList)

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
          {vehicleList.map((item) => {
            const oneWayRate = item.oneWay?.perKm || 0;
            const roundTripRate = item.roundTrip?.perKm || 0;
            const driverBata = item.oneWay?.bata ?? 0;

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
                        src={item.thumbnail} 
                        alt={item.name} 
                        fill
                        className="object-cover  "
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
                          {item.seats} Seats
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
                        {item.roundTrip && <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-700 font-semibold">Round Trip Rate</span>
                          <span className="text-base font-semibold text-gray-900">
                            {fares.currency}{roundTripRate}/KM
                          </span>
                        </div> }

                        {/* Driver Allowance (Bata) */}
                        { item.roundTrip &&<div className="flex justify-between items-center px-1 pt-1 text-gray-500 text-[11px]">
                          <span className="flex items-center gap-1.5">
                            <Receipt className="w-3.5 h-3.5 text-gray-400" />
                            Driver Allowance (Bata)
                          </span>
                          <span className="font-semibold text-gray-800">
                            {driverBata > 0 ? `${fares.currency}${driverBata}` : "Included / Nil"}
                          </span>
                        </div> }

                        {/* Toll / Permit Charges */}
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