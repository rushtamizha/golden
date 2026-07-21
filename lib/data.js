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
    defaults: {
      oneWayMinKm: 100,
      roundTripMinKm: 150,
    },
    vehicles: {
      
      sedan: {
        name: "Sedan (Dzire, Etios)",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
        oneWay: {
          bata: 200,
          perKm: 16,
          minKm: 50,
        },
        roundTrip: {
          bata: 300,
          perKm: 14,
          minKm: 150,
        },
      },
      suv: {
        name: "SUV (Ertiga, Innova)",
        seats: 7,
        img: "/BookingCars/swift-dzire.webp",
        oneWay: {
          bata: 300,
          perKm: 22,
          minKm: 80,
        },
        roundTrip: {
          bata: 450,
          perKm: 19,
          minKm: 200,
        },
      },
    },
  },
  "tamil nadu": {
    stateName: "Tamil Nadu",
    currency: "₹",
    defaults: {
      oneWayMinKm: 130,
      roundTripMinKm: 250,
    },
    vehicles: {
      sedan: {
        name: "Sedan (Dzire, Etios)",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
        oneWay: {
          bata: 180,
          perKm: 18,
          minKm: 40,
        },
        roundTrip: {
          bata: 250,
          perKm: 15,
          minKm: 130,
        },
      },
      suv: {
        name: "SUV (Ertiga, Innova)",
        seats: 7,
        img: "/BookingCars/swift-dzire.webp",
        oneWay: {
          bata: 280,
          perKm: 24,
          minKm: 70,
        },
        roundTrip: {
          bata: 400,
          perKm: 21,
          minKm: 180,
        },
      },
    },
  },
};

export const themeDetails = {
  kerala: {
    textColor: "text-emerald-600",
    borderColor: "border-emerald-600",
    ringColor: "ring-emerald-600",
    bgImage: ["/Background/keralaBg.webp"],
    hoverText: "hover:text-emerald-600",
    bgColor: "bg-emerald-700", 
    hoverBg: "hover:bg-emerald-700",
    pillBg: "bg-emerald-600/5", 
  },
  "tamil nadu": {
    textColor: "text-rose-800",
    borderColor: "border-rose-800",
    ringColor: "ring-rose-800",
    bgImage: ["/Background/tamilnaduBg.webp"],
    hoverText: "hover:text-rose-800",
    bgColor: "bg-rose-800",
    hoverBg: "hover:bg-rose-800",
    pillBg: "bg-rose-800/5",
  },
};
