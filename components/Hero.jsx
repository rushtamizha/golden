"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import {
  Phone,
  MessageSquare,
  Check,
  MapPin,
  User,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { companyInfo } from "@/lib/data";
import { useRegion } from "@/app/context/RegionContext";

import "swiper/css";
import "swiper/css/effect-fade";

const GOOGLE_MAPS_LIBRARIES = ["places"];

export default function TaxiBookingHero() {
  const { theme, fares } = useRegion(); // <-- Consuming Context Variables Globally
  const [tripType, setTripType] = useState("one-way"); // options: 'one-way' | 'roundTrip'
  const [selectedVehicle, setSelectedVehicle] = useState("hatchback");
  const [passengerCount, setPassengerCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const swiperRef = useRef(null);
  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    region: "IN",
  });

  // Generate fleet list cleanly matching the object configuration keys
  const currentFleet = Object.entries(fares.vehicles).map(([key, value]) => ({
    id: key,
    name: value.name,
    seats: value.seats,
    img: value.img,
    pricing: value[tripType === "one-way" ? "oneWay" : "roundTrip"],
    waitingCharge: value.waitingCharge,
  }));

  // Handle passenger updates adjusting vehicle tier targets smoothly
  const handlePassengerChange = (count) => {
    const parsedCount = parseInt(count) || 1;
    setPassengerCount(parsedCount);

    const validOption = currentFleet.find((v) => parsedCount <= v.seats);
    if (validOption && validOption.id !== selectedVehicle) {
      setSelectedVehicle(validOption.id);
    }
  };

  // Safe structural synchronization fallback checking active vehicle bounds across modes
  useEffect(() => {
    const matchExists = currentFleet.some((v) => v.id === selectedVehicle);
    if (!matchExists && currentFleet.length > 0) {
      setSelectedVehicle(currentFleet[0].id);
    }
  }, [tripType]);

  const handleVehicleSelection = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    const selectedUnit = currentFleet.find((v) => v.id === vehicleId);
    if (selectedUnit && passengerCount > selectedUnit.seats) {
      setPassengerCount(selectedUnit.seats);
    }
  };

  // Swiper slide auto-center trigger point adjustments
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const activeIdx = currentFleet.findIndex((v) => v.id === selectedVehicle);
      if (activeIdx !== -1) {
        swiperRef.current.swiper.slideTo(activeIdx);
      }
    }
  }, [selectedVehicle, tripType]);

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const getCurrentDateFormatted = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  };

  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropAddress: "",
    fullName: "",
    mobileNumber: "",
    pickupDate: getCurrentDateFormatted(),
    pickupTime: getCurrentTimeFormatted(),
    returnDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current !== null) {
      const place = pickupAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setFormData((prev) => ({
          ...prev,
          pickupAddress: place.formatted_address,
        }));
      }
    }
  };

  const onDropPlaceChanged = () => {
    if (dropAutocompleteRef.current !== null) {
      const place = dropAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setFormData((prev) => ({
          ...prev,
          dropAddress: place.formatted_address,
        }));
      }
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetVehicle =
      currentFleet.find((v) => v.id === selectedVehicle) || currentFleet[0];
    const whatsappBaseNumber = "919626850192";

    const payloadData = {
      ...formData,
      tripType: tripType === "one-way" ? "One Way Drop" : "Round Trip",
      vehicleName: targetVehicle.name,
      ratePerKm: `${fares.currency}${targetVehicle.pricing.perKm}/KM`,
      baseFare: `${fares.currency}${targetVehicle.pricing.baseFare}`,
      passengers: passengerCount,
      stateContext: fares.stateName,
    };

    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData),
      });
    } catch (err) {
      console.error("Email backup dispatch failed:", err);
    }

    let message = `*🚕 NEW TAXI BOOKING REQUEST (${payloadData.stateContext.toUpperCase()})* \n\n`;
    message += `*Trip Type:* ${payloadData.tripType}\n`;
    message += `*Vehicle:* ${payloadData.vehicleName}\n`;
    message += `*Base Fare:* ${payloadData.baseFare}\n`;
    message += `*Rate:* ${payloadData.ratePerKm}\n`;
    message += `*Passengers:* ${payloadData.passengers} Person(s)\n\n`;
    message += `*📍 Route Details:*\n`;
    message += `• *Pickup:* ${payloadData.pickupAddress || "Not Specified"}\n`;
    message += `• *Drop:* ${payloadData.dropAddress || "Not Specified"}\n\n`;
    message += `*📅 Schedule:*\n`;
    message += `• *Date:* ${payloadData.pickupDate}\n`;
    message += `• *Time:* ${payloadData.pickupTime}\n`;
    if (tripType === "round-trip" && payloadData.returnDate) {
      message += `• *Return Date:* ${payloadData.returnDate}\n`;
    }
    message += `\n`;
    message += `*👤 Contact Details:*\n`;
    message += `• *Name:* ${payloadData.fullName || "Not Specified"}\n`;
    message += `• *Mobile:* ${payloadData.mobileNumber || "Not Specified"}\n`;

    const encryptedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappBaseNumber}&text=${encryptedMessage}`;

    setIsSubmitting(false);
    window.open(whatsappUrl, "_blank");
  };

  const activeVehicleObject =
    currentFleet.find((v) => v.id === selectedVehicle) || currentFleet[0];

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
              <div
                className="w-full h-full bg-cover  bg-center bg-no-repeat scale-100 "
                style={{ backgroundImage: `url('${src}')` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`absolute inset-0 bg-black/80 `} />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Interactive Landing Copy Column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
          <h1 className="text-2xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            {companyInfo.companyName.split(" ").slice(0, 2).join(" ")}{" "}
            <span className={theme.textColor}>
              {fares.stateName}
            </span>
          </h1>
          <p className="text-white md:text-lg max-w-xl">
            Reliable one way drops, local packages, outstation trips, and
            airport transfers across{" "}
            <span className={`font-semibold ${theme.textColor}`}>
              {fares.stateName}
            </span>{" "}
            with standard metrics and clear transparency models.
          </p>
          <div className="space-y-2 max-w-md text-xs font-medium text-white">
            {[
              "Verified Highway Fleets",
              "Fixed Dynamic Pricing Models",
              "Zero Hidden Allowances",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-xs"
              >
                <Check className={`w-4 h-4 shrink-0 ${theme.textColor}`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col max-w-md sm:flex-row gap-3 pt-2">
            <a
              href="tel:+919626850192"
              className="flex items-center justify-center gap-3 bg-blue-700 text-white font-bold px-6 py-4 rounded-2xl hover:bg-blue-800 transition shadow-xs text-sm uppercase tracking-wide"
            >
              {" "}
              <Phone className="w-4 h-4 fill-current" />
              Call +91 9626850192
            </a>
            <a
              href="https://wa.me/919626850192"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center gap-3  text-white font-bold px-6 py-4 rounded-2xl  transition shadow-xs text-sm uppercase tracking-wide ${theme.bgColor}`}
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Book via WhatsApp
            </a>
          </div>
        </div>

        {/* Right Application Engine Form Container */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
          <form
            onSubmit={handleBookingSubmit}
            className="bg-white text-gray-800 w-full max-w-2xl rounded-3xl p-6 shadow-2xl flex flex-col border border-gray-100"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Quick Cab Reservation
              </h2>
            </div>

            <div className="space-y-4">
              {/* Row 1: Trip Path Selector Node */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  1. Choose Trip Path
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTripType("one-way")}
                    className={`p-3 rounded-xl border font-semibold text-sm transition-all flex flex-col items-center justify-center ${
                      tripType === "one-way"
                        ? `border-current ${theme.textColor} ${theme.pillBg} ring-2 ring-current/20`
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>One Way Drop</span>
                    <span className="text-[10px] opacity-70 font-normal mt-0.5">
                      Min charged: {activeVehicleObject?.pricing?.minKm || 50}{" "}
                      KM
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("round-trip")}
                    className={`p-3 rounded-xl border font-semibold text-sm transition-all flex flex-col items-center justify-center ${
                      tripType === "round-trip"
                        ? `border-current ${theme.textColor} ${theme.pillBg} ring-2 ring-current/20`
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>Round Trip</span>
                    <span className="text-[10px] opacity-70 font-normal mt-0.5">
                      Min: {activeVehicleObject?.pricing?.minKm || 150} KM / Day
                    </span>
                  </button>
                </div>
              </div>

              {/* Row 2: Maps Architecture Nodes */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  2. Route Architecture
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 z-10" />
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (pickupAutocompleteRef.current = autocomplete)
                        }
                        onPlaceChanged={onPickupPlaceChanged}
                      >
                        <input
                          type="text"
                          name="pickupAddress"
                          value={formData.pickupAddress}
                          onChange={handleInputChange}
                          required
                          placeholder={
                            loadError
                              ? "Enter Pickup Point"
                              : "Type Pickup Address..."
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </Autocomplete>
                    ) : (
                      <input
                        type="text"
                        placeholder="Loading geo-engine..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm opacity-50 cursor-not-allowed"
                        disabled
                      />
                    )}
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 z-10" />
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (dropAutocompleteRef.current = autocomplete)
                        }
                        onPlaceChanged={onDropPlaceChanged}
                      >
                        <input
                          type="text"
                          name="dropAddress"
                          value={formData.dropAddress}
                          onChange={handleInputChange}
                          required
                          placeholder={
                            loadError
                              ? "Enter Drop Destination"
                              : "Type Drop Destination..."
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </Autocomplete>
                    ) : (
                      <input
                        type="text"
                        placeholder="Loading geo-engine..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm opacity-50 cursor-not-allowed"
                        disabled
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Row 3: Dispatch Time Matrix & Headcount Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Pickup Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={passengerCount}
                      onChange={(e) => handlePassengerChange(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white appearance-none cursor-pointer font-medium text-gray-800"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Passenger{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Conditional Return Layer for Outstations */}
              <AnimatePresence initial={false}>
                {tripType === "round-trip" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        required={tripType === "round-trip"}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Row 4: Client Verification Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="WhatsApp Mobile Number"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 5: Sliding Contextual Car Selector */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  3. Allocated Fleet Matrix
                </span>
                <Swiper
                  ref={swiperRef}
                  spaceBetween={8}
                  slidesPerView={2.4}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    480: { slidesPerView: 3.2 },
                    640: { slidesPerView: 4.2 },
                  }}
                  className="w-full vehicle-swiper"
                >
                  {currentFleet.map((vehicle) => (
                    <SwiperSlide key={vehicle.id}>
                      <div
                        onClick={() => handleVehicleSelection(vehicle.id)}
                        className={`cursor-pointer p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between h-[96px] m-0.5 bg-white select-none ${
                          selectedVehicle === vehicle.id
                            ? `ring-2 ring-offset-0 shadow-xs border-current bg-slate-50/50`
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                        style={{
                          color:
                            selectedVehicle === vehicle.id
                              ? theme.textColor
                                  .replace("text-[", "")
                                  .replace("]", "")
                              : undefined,
                        }}
                      >
                        <div className="h-8 w-full flex items-center justify-center mix-blend-multiply">
                          <img
                            src={vehicle.img}
                            alt={vehicle.name}
                            className="h-full object-contain pointer-events-none"
                          />
                        </div>
                        <div className="w-full mt-0.5">
                          <div
                            className={`text-[10px] font-bold leading-none ${theme.textColor}`}
                          >
                            {fares.currency}
                            {vehicle.pricing?.perKm}/KM
                          </div>
                          <div className="text-[8px] text-gray-900 font-extrabold mt-0.5 uppercase tracking-wide truncate">
                            {vehicle.name.split("(")[0].trim()}
                          </div>
                          <div className="text-[7px] text-gray-400 font-medium">
                            Max: {vehicle.seats} Pax
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-5 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all text-center shadow-lg flex items-center justify-center gap-2.5 ${theme.hoverBg}`}
              style={{
                backgroundColor: theme.textColor.includes("[")
                  ? theme.textColor.match(/\[(.*?)\]/)?.[1]
                  : undefined,
              }}
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              {isSubmitting
                ? "Processing Fleet Matrix..."
                : "Book Instantly via WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
