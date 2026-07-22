"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Phone, MessageSquare, Check } from "lucide-react";
import { companyInfo } from "@/lib/data";
import { useRegion } from "@/app/context/RegionContext";
import BookingForm from "@/components/BookingForm";


import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function TaxiBookingHero() {
  const { theme, fares } = useRegion();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white">
      {/* Background Slideshow Canvas */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={1200}
          loop={true}
          className="w-full h-full"
        >
          {theme.bgImage.map((src, idx) => (
            <SwiperSlide key={idx} className="w-full h-full">
              <Image height={100} width={100}
                className="w-full h-full object-cover bg-center " src={src}
              />

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Hero Content Column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-white leading-tight">
            {companyInfo.companyName.split(" ").slice(0, 2).join(" ")}{" "}
            <span className={`block text-5xl md:text-6xl ${theme.textColor}`}>{fares.stateName} Taxi</span>
          </h1>
          <p className="text-white text-sm md:text-base max-w-xl">
            Book reliable one way drops, outstation trips, and airport transfers
            across{" "}
            <span className={`font-semibold ${theme.textColor}`}>
              {fares.stateName}
            </span>{" "}
            with transparent billing and no hidden costs.
          </p>

          <div className="space-y-2 max-w-md text-xs font-medium text-white">
            {[
              "Verified Highway Fleets",
              "Fixed Dynamic Pricing Models",
              "Zero Hidden Allowances",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/5 border border-white/10 p-2.5 rounded-xl backdrop-blur-xs"
              >
                <Check className={`w-4 h-4 shrink-0 ${theme.textColor}`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col max-w-md sm:flex-row gap-3 pt-2">
            <a
              href={`tel:+${companyInfo.companyNumber}`}
              className="flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold px-5 py-3 rounded-2xl hover:bg-blue-800 transition shadow-xs text-xs uppercase tracking-wide"
            >
              <Phone className="w-4 h-4 fill-current" />
              Call +{companyInfo.companyNumber}
            </a>
            <a
              href={`https://wa.me/${companyInfo.companyNumber}`}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-2xl transition shadow-xs text-xs uppercase tracking-wide ${theme.bgColor}`}
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Book via WhatsApp
            </a>
          </div>
        </div>

        {/* Right Reusable Form */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}