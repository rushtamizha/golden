"use client";
import { fareDetails, themeDetails } from "@/lib/data";
import React, { createContext, useContext, useState, useEffect } from "react";

const RegionContext = createContext(undefined);

export const RegionProvider = ({ children }) => {
  const [region, setRegionState] = useState(null);

  // Load selection from localStorage if it exists so returning users don't see the modal
  useEffect(() => {
    const savedRegion = localStorage.getItem("user-region");
    setRegionState(savedRegion);
  }, []);

  const setRegion = (selectedRegion) => {
    setRegionState(selectedRegion);
    localStorage.setItem("user-region", selectedRegion);
  };

  // Fallback to Kerala configuration if no region is selected yet
  const activeRegion = region || "kerala";
  const fares = fareDetails[activeRegion];
  const theme = themeDetails[activeRegion];
  return (
    <RegionContext.Provider value={{ region, setRegion, fares, theme }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
