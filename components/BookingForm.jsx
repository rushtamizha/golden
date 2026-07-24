"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  Phone,
  MessageSquare,
  MapPin,
  User,
  Calendar,
  Clock,
  Users,
  X,
  Calculator,
  Navigation,
  Info,
} from "lucide-react";
import { companyInfo } from "@/lib/data";
import { useRegion } from "@/app/context/RegionContext";

import "swiper/css";

const GOOGLE_MAPS_LIBRARIES = ["places"];

export default function BookingForm({ className = "" }) {
  const { theme, fares } = useRegion();
  const [tripType, setTripType] = useState("one-way"); // 'one-way' | 'round-trip'
  const [selectedVehicle, setSelectedVehicle] = useState("hatchback");
  const [passengerCount, setPassengerCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Modal & Route Calculation States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fareBreakdown, setFareBreakdown] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const swiperRef = useRef(null);
  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    region: "IN",
  });

  const currentFleet = Object.entries(fares.vehicles).map(([key, value]) => ({
    id: key,
    name: value.name,
    seats: value.seats,
    img: value.img,
    pricing: value[tripType === "one-way" ? "oneWay" : "roundTrip"],
  }));

  const activeVehicleObject =
    currentFleet.find((v) => v.id === selectedVehicle) || currentFleet[0];

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  };

  const getCurrentDateFormatted = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
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

  const handlePassengerChange = (count) => {
    const parsedCount = parseInt(count) || 1;
    setPassengerCount(parsedCount);

    const validOption = currentFleet.find((v) => parsedCount <= v.seats);
    if (validOption && validOption.id !== selectedVehicle) {
      setSelectedVehicle(validOption.id);
    }
  };

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

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const activeIdx = currentFleet.findIndex(
        (v) => v.id === selectedVehicle
      );
      if (activeIdx !== -1) {
        swiperRef.current.swiper.slideTo(activeIdx);
      }
    }
  }, [selectedVehicle, tripType]);

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

  // Distance Calculation
  const handleCalculateFare = async (e) => {
    e.preventDefault();
    if (!formData.pickupAddress || !formData.dropAddress) {
      alert("Please enter both Pickup and Drop locations.");
      return;
    }

    setIsCalculating(true);

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: formData.pickupAddress,
        destination: formData.dropAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);

      const route = results.routes[0].legs[0];
      const actualKm = Math.round(route.distance.value / 1000);
      const durationText = route.duration.text;

      const pricing = activeVehicleObject.pricing;
      const minKm = pricing.minKm;
      const ratePerKm = pricing.perKm;
      const bata = pricing.bata;

      const billableKm = Math.max(actualKm, minKm);
      const kmCost = billableKm * ratePerKm;
      const totalEstimatedFare = kmCost + bata;

      setFareBreakdown({
        actualKm,
        billableKm,
        minKm,
        ratePerKm,
        bata,
        kmCost,
        totalEstimatedFare,
        durationText,
      });

      setIsModalOpen(true);
    } catch (err) {
      console.error("Route calculations failed:", err);
      alert(
        "Could not calculate driving distance. Please verify both addresses."
      );
    } finally {
      setIsCalculating(false);
    }
  };

  // Final Dispatch Action
  const handleConfirmAndBook = async () => {
    setIsSubmitting(true);

    const whatsappBaseNumber = companyInfo.companyNumber || "919626850192";
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      formData.pickupAddress
    )}&destination=${encodeURIComponent(formData.dropAddress)}`;

    const payloadData = {
      ...formData,
      tripType: tripType === "one-way" ? "One Way Drop" : "Round Trip",
      vehicleName: activeVehicleObject.name,
      ratePerKm: `${fares.currency}${fareBreakdown.ratePerKm}/KM`,
      driverBata: `${fares.currency}${fareBreakdown.bata}`,
      minKm: `${fareBreakdown.minKm} KM`,
      distanceKm: `${fareBreakdown.actualKm} KM`,
      estimatedFare: `${fares.currency}${fareBreakdown.totalEstimatedFare}`,
      passengers: passengerCount,
      stateContext: fares.stateName,
      googleMapsUrl,
    };

    // 1. Dispatch Email to Admin
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData),
      });
    } catch (err) {
      console.error("SMTP Email Dispatch Error:", err);
    }

    // 2. Format WhatsApp Message with Route Link
    let message = `*🚕 NEW TAXI BOOKING CONFIRMATION (${fares.stateName.toUpperCase()})*\n\n`;
    message += `*Customer:* ${payloadData.fullName || "N/A"}\n`;
    message += `*Mobile:* ${payloadData.mobileNumber || "N/A"}\n`;
    message += `*Trip Type:* ${payloadData.tripType}\n`;
    message += `*Vehicle:* ${payloadData.vehicleName}\n`;
    message += `*Passengers:* ${payloadData.passengers} Pax\n\n`;
    message += `*📍 Route Details:*\n`;
    message += `• *From:* ${payloadData.pickupAddress}\n`;
    message += `• *To:* ${payloadData.dropAddress}\n`;
    message += `• *Distance:* ${payloadData.distanceKm} (Min Charge: ${payloadData.minKm})\n`;
    message += `• *Map Navigation:* ${payloadData.googleMapsUrl}\n\n`;
    message += `*📅 Schedule:*\n`;
    message += `• *Date:* ${payloadData.pickupDate} at ${payloadData.pickupTime}\n`;
    if (tripType === "round-trip" && payloadData.returnDate) {
      message += `• *Return Date:* ${payloadData.returnDate}\n`;
    }
    message += `\n*💰 Estimated Fare:* ${payloadData.estimatedFare}\n`;
    message += `*(Rate: ${payloadData.ratePerKm} | Driver Bata: ${payloadData.driverBata})*\n`;

    const encryptedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappBaseNumber}&text=${encryptedMessage}`;

    setIsSubmitting(false);
    setIsModalOpen(false);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <form
        onSubmit={handleCalculateFare}
        className="bg-white text-gray-800 w-full rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col border border-gray-100"
      >
        <div className="mb-3">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Book Your Premium Taxi Ride
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            One Way • Round Trip • Airport Transfers Across {fares.stateName}
          </p>
        </div>

        <div className="space-y-3.5">
          {/* Row 1: Trip Path Selector */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              1. Trip Type
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={`p-2.5 rounded-xl border font-semibold text-xs transition-all flex flex-col items-center justify-center ${
                  tripType === "one-way"
                    ? `border-current ${theme.textColor} ${theme.pillBg} ring-1 ring-current/20`
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>One Way Drop</span>
                <span className="text-[10px] opacity-70 font-normal mt-0.5">
                  Min Charged:{" "}
                  {fares.defaults?.oneWayMinKm ||
                    (fares.stateName === "Kerala" ? 70 : 130)}{" "}
                  KM
                </span>
              </button>
              { fares.defaults?.roundTripMinKm && <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={`p-2.5 rounded-xl border font-semibold text-xs transition-all flex flex-col items-center justify-center ${
                  tripType === "round-trip"
                    ? `border-current ${theme.textColor} ${theme.pillBg} ring-1 ring-current/20`
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Round Trip</span>
                 <span className="text-[10px] opacity-70 font-normal mt-0.5">
                  Min Charged:{" "}
                  {fares.defaults?.roundTripMinKm ||
                    (fares.stateName === "Kerala" ? 0 : 250)}{" "}
                  KM / Day
                </span> 
              </button> }
            </div>
          </div>

          {/* Row 2: Location Inputs */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              2. Route Details
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 z-10" />
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(a) => (pickupAutocompleteRef.current = a)}
                    onPlaceChanged={onPickupPlaceChanged}
                  >
                    <input
                      type="text"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      required
                      placeholder={
                        loadError ? "Pickup Location" : "Enter Pickup Address..."
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </Autocomplete>
                ) : (
                  <input
                    type="text"
                    placeholder="Loading maps..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs opacity-50 cursor-not-allowed"
                    disabled
                  />
                )}
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 z-10" />
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(a) => (dropAutocompleteRef.current = a)}
                    onPlaceChanged={onDropPlaceChanged}
                  >
                    <input
                      type="text"
                      name="dropAddress"
                      value={formData.dropAddress}
                      onChange={handleInputChange}
                      required
                      placeholder={
                        loadError ? "Drop Location" : "Enter Drop Address..."
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </Autocomplete>
                ) : (
                  <input
                    type="text"
                    placeholder="Loading maps..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs opacity-50 cursor-not-allowed"
                    disabled
                  />
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Schedule & Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <AnimatePresence initial={false}>
              {tripType === "round-trip" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      required={tripType === "round-trip"}
                      className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={passengerCount}
                  onChange={(e) => handlePassengerChange(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white appearance-none cursor-pointer font-medium text-gray-800"
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

          {/* Row 4: Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Your Full Name"
                className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
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
                className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 5: Vehicle Matrix Swiper */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                3. Select Vehicle
              </span>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                Driver Bata: {fares.currency}
                {activeVehicleObject.pricing.bata}
              </span>
            </div>
            <Swiper
              ref={swiperRef}
              spaceBetween={8}
              slidesPerView={3.5}
               modules={[Autoplay]}
              // loop={currentFleet.length > 4}
              loop={false}
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
                    className={`cursor-pointer p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between h-[92px] m-0.5 select-none ${
                      selectedVehicle === vehicle.id
                        ? `${theme.borderColor} ${theme.ringColor} ${theme.pillBg} ring-1 ring-offset-0 shadow-xs`
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className="h-7 w-full flex items-center justify-center mix-blend-multiply">
                      <img
                        src={vehicle.img}
                        alt={vehicle.name}
                        className="h-full object-contain pointer-events-none"
                      />
                    </div>
                    <div className="w-full mt-0.5">
                      <div
                        className={`text-[10px] font-semibold leading-none ${theme.textColor}`}
                      >
                        {fares.currency}
                        {vehicle.pricing?.perKm}/KM
                      </div>
                      <div className="text-[8px] text-gray-900 font-semibold mt-0.5 uppercase tracking-wide truncate">
                        {vehicle.name.split("(")[0].trim()}
                      </div>
                      <div className="text-[7px] text-black font-medium">
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
          disabled={isCalculating}
          className={`w-full mt-4 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all text-center shadow-lg flex items-center justify-center gap-2 ${theme.bgColor}`}
        >
          <Calculator className="w-4 h-4" />
          {isCalculating ? "Calculating Route & Fare..." : "Get Fare Estimate"}
        </button>
      </form>

      {/* ================= ROUTE & FARE ESTIMATE MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && fareBreakdown && (
          <div className="fixed inset-0  z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-600" />
                    {tripType === "one-way" ? "One Way Drop" : "Round Trip"}{" "}
                    Fare Estimate
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {fares.stateName} Dynamic Tariff Breakdown
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4">
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
                    <span className="text-blue-600">
                      {formData.pickupAddress.split(",")[0]}
                    </span>
                    <span>→</span>
                    <span className="text-emerald-600">
                      {formData.dropAddress.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
                    <span>
                      Distance: <strong>{fareBreakdown.actualKm} KM</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Est. Time: <strong>{fareBreakdown.durationText}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Vehicle: <strong>{activeVehicleObject.name}</strong>
                    </span>
                  </div>
                </div>

                <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative">
                  {isLoaded && (
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      zoom={10}
                      options={{ disableDefaultUI: true, zoomControl: true }}
                    >
                      {directionsResponse && (
                        <DirectionsRenderer
                          directions={directionsResponse}
                          options={{
                            polylineOptions: {
                              strokeColor: "#dc2626",
                              strokeWeight: 4,
                            },
                          }}
                        />
                      )}
                    </GoogleMap>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">
                      Rate / KM
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {fares.currency}
                      {fareBreakdown.ratePerKm}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl">
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">
                      Driver Allowance (Bata)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {fares.currency}
                      {fareBreakdown.bata}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 bg-gray-50 border border-gray-100 p-3 rounded-xl">
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">
                      Min Billing Limit
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {fareBreakdown.minKm} KM
                    </span>
                  </div>
                </div>

                {fareBreakdown.actualKm < fareBreakdown.minKm && (
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 p-3 rounded-xl text-[11px] text-amber-900">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Actual trip is{" "}
                        <strong>{fareBreakdown.actualKm} KM</strong>. Charged for
                        regional minimum of{" "}
                        <strong>{fareBreakdown.minKm} KM</strong>.
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-green-600/5 border border-dashed border-green-600 text-white rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] text-black font-medium">
                      Estimated Total Fare
                    </span>
                    <span className="text-2xl font-black tracking-tight text-green-600">
                      {fares.currency}
                      {fareBreakdown.totalEstimatedFare.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right text-[10px] text-black leading-relaxed">
                    <div>Includes Base Fare & Driver Bata</div>
                    <div>Excludes Tolls & State Permits</div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-1/3 py-2.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition"
                >
                  Modify Route
                </button>
                <button
                  onClick={handleConfirmAndBook}
                  disabled={isSubmitting}
                  className={`w-full sm:w-2/3 py-2.5 text-xs font-semibold text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition ${theme.bgColor}`}
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  {isSubmitting
                    ? "Dispatching Details..."
                    : "Confirm & Book via WhatsApp"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}