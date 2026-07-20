import { Home, Info, ShieldCheck, Car, CircleDollarSign } from "lucide-react";

export const companyInfo = {
  companyName: "Golden Oneway Taxi",
  companySlogan: "Fastest Taxi Service",
  companyLogo: "/logo.png",
  companyNumber: "919626850192",
  companyGmail: "goldenonewaytaxi.com@gmail.com",
  companyAddress: "Chinnakanal, Kerala 685613",
  companyDomain: "goldenonewaytaxi.com",
};

export const navigationData = [
  {
    name: "Home",
    link: "/",
    icon: <Home size={16} />,
  },
  {
    name: "About",
    slug: "about",
    link: "/about",
    icon: <Info size={16} />,
  },
  {
    name: "Services",
    slug: "services",
    link: "/services",
    icon: <ShieldCheck size={16} />,
  },
  {
    name: "Fleets",
    slug: "fleets",
    link: "/#fleets",
    icon: <Car size={16} />,
  },
  {
    name: "Pricing",
    slug: "pricing",
    link: "/pricing",
    icon: <CircleDollarSign size={16} />,
  },
];

export const fareDetails = {
  kerala: {
    stateName: "Kerala",
    currency: "₹",
    vehicles: {
      hatchback: {
        name: "Hatchback (Alto, WagonR)",
        seats: 4,
         img: "/BookingCars/swift-dzire-taxi.avif",
        oneWay: {
          baseFare: 150,
          perKm: 14,
          minKm: 50, // Minimum distance charged for one-way
        },
        roundTrip: {
          baseFare: 250,
          perKm: 12,
          minKm: 150, // Minimum distance charged per day for round-trip
        },
        hourlyRental: {
          basePackage: "4 Hrs / 40 Km",
          packageRate: 800,
          extraHrCharge: 150,
          extraKmCharge: 13,
        },
        waitingCharge: 2, // per minute
      },
      sedan: {
        name: "Sedan (Dzire, Etios)",
        seats: 4,
          img: "/BookingCars/swift-dzire-taxi.avif",
        oneWay: {
          baseFare: 200,
          perKm: 16,
          minKm: 50,
        },
        roundTrip: {
          baseFare: 300,
          perKm: 14,
          minKm: 150,
        },
        hourlyRental: {
          basePackage: "4 Hrs / 40 Km",
          packageRate: 1000,
          extraHrCharge: 200,
          extraKmCharge: 15,
        },
        waitingCharge: 2,
      },
      suv: {
        name: "SUV (Ertiga, Innova)",
        seats: 7,
          img: "/BookingCars/swift-dzire-taxi.avif",
        oneWay: {
          baseFare: 300,
          perKm: 22,
          minKm: 80,
        },
        roundTrip: {
          baseFare: 450,
          perKm: 19,
          minKm: 200,
        },
        hourlyRental: {
          basePackage: "4 Hrs / 40 Km",
          packageRate: 1500,
          extraHrCharge: 250,
          extraKmCharge: 18,
        },
        waitingCharge: 3,
      },
    },
  },
  "tamil nadu": {
    stateName: "Tamil Nadu",
    currency: "₹",
    vehicles: {
      hatchback: {
        name: "Hatchback (Alto, WagonR)",
        seats: 4,
          img: "/BookingCars/swift-dzire-taxi.avif",
        oneWay: {
          baseFare: 120,
          perKm: 16,
          minKm: 40,
        },
        roundTrip: {
          baseFare: 200,
          perKm: 13,
          minKm: 130,
        },
        hourlyRental: {
          basePackage: "4 Hrs / 40 Km",
          packageRate: 900,
          extraHrCharge: 180,
          extraKmCharge: 14,
        },
        waitingCharge: 3,
      },
      sedan: {
        name: "Sedan (Dzire, Etios)",
        seats: 4,
          img: "/BookingCars/swift-dzire-taxi.avif",
        oneWay: {
          baseFare: 180,
          perKm: 18,
          minKm: 40,
        },
        roundTrip: {
          baseFare: 250,
          perKm: 15,
          minKm: 130,
        },
        hourlyRental: {
          basePackage: "4 Hrs / 40 Km",
          packageRate: 1100,
          extraHrCharge: 220,
          extraKmCharge: 16,
        },
        waitingCharge: 3,
      },
      suv: {
        name: "SUV (Ertiga, Innova)",
        seats: 7,
          img: "/BookingCars/swift-dzire-taxi.avif",
        oneWay: {
          baseFare: 280,
          perKm: 24,
          minKm: 70,
        },
        roundTrip: {
          baseFare: 400,
          perKm: 21,
          minKm: 180,
        },
        hourlyRental: {
          basePackage: "4 Hrs / 40 Km",
          packageRate: 1600,
          extraHrCharge: 280,
          extraKmCharge: 20,
        },
        waitingCharge: 4,
      },
    },
  },
};


export const themeDetails = {
  kerala: {
    textColor: "text-emerald-600",
    hoverText: "hover:text-emerald-600",
    bgColor: "hover:bg-emerald-700", // Used for hover overrides
    hoverBg: "hover:bg-emerald-700",
    pillBg: "bg-emerald-600/5",      // pre-baked fallback with opacity!
  },
  "tamil nadu": {
    textColor: "text-[#c52038]",
    hoverText: "hover:text-[#c52038]",
    bgColor: "hover:bg-[#c52038]",
    hoverBg: "hover:bg-[#c52038]",
    pillBg: "bg-[#c52038]/5",
  },
};
