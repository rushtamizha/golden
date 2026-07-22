import { Home, Info, ShieldCheck, Car, CircleDollarSign } from "lucide-react";

export const companyInfo = {
  companyName: "Golden Oneway Taxi",
  companySlogan: "Premium Ride Experience",
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
    link: "/fleets",
    icon: <Car size={16} />,
  },
  {
    name: "contact",
    slug: "contact",
    link: "/contact",
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
        name: "SEDAN",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 100,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 150,
        },
      },
      etios: {
        name: "ETIOS",
        seats: 4,
        img: "/BookingCars/etios.webp",
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 100,
        },
        roundTrip: {
          bata: 400,
          perKm: 15,
          minKm: 150,
        },
      },
      ciaz: {
        name: "CIAZ",
        seats: 4,
        img: "/BookingCars/ciaz.webp",
        oneWay: {
          bata: 400,
          perKm: 16,
          minKm: 100,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 150,
        },
      },
      ertiga: {
        name: "ERTIGA",
        seats: 6,
        img: "/BookingCars/ertiga.webp",
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 100,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 150,
        },
      },
      carens: {
        name: "KIA CARENS",
        seats: 6,
        img: "/BookingCars/carens.webp",
        oneWay: {
          bata: 400,
          perKm: 14,
          minKm: 100,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 150,
        },
      },
      innova: {
        name: "INNOVA",
        seats: 7,
        img: "/BookingCars/innova.webp",
        oneWay: {
          bata: 500,
          perKm: 19,
          minKm: 100,
        },
        roundTrip: {
          bata: 500,
          perKm: 19,
          minKm: 150,
        },
      },
      crysta: {
        name: "CRYSTA",
        seats: 7,
        img: "/BookingCars/innovo-crysta.webp",
        oneWay: {
          bata: 600,
          perKm: 22,
          minKm: 100,
        },
        roundTrip: {
          bata: 600,
          perKm: 22,
          minKm: 150,
        },
      },
      "tempo-12": {
        name: "TEMPO 12",
        seats: 12,
        img: "/BookingCars/tempo.webp",
        oneWay: {
          bata: 1000,
          perKm: 24,
          minKm: 100,
        },
        roundTrip: {
          bata: 1000,
          perKm: 24,
          minKm: 150,
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
        name: "SEDAN",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 250,
        },
      },
      etios: {
        name: "ETIOS",
        seats: 4,
        img: "/BookingCars/etios.webp",
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 15,
          minKm: 250,
        },
      },
      ciaz: {
        name: "CIAZ",
        seats: 4,
        img: "/BookingCars/ciaz.webp",
        oneWay: {
          bata: 400,
          perKm: 16,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 250,
        },
      },
      ertiga: {
        name: "ERTIGA",
        seats: 6,
        img: "/BookingCars/ertiga.webp",
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 250,
        },
      },
      carens: {
        name: "KIA CARENS",
        seats: 6,
        img: "/BookingCars/carens.webp",
        oneWay: {
          bata: 400,
          perKm: 14,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 14,
          minKm: 250,
        },
      },
      innova: {
        name: "INNOVA",
        seats: 7,
        img: "/BookingCars/innova.webp",
        oneWay: {
          bata: 500,
          perKm: 19,
          minKm: 130,
        },
        roundTrip: {
          bata: 500,
          perKm: 19,
          minKm: 250,
        },
      },
      crysta: {
        name: "CRYSTA",
        seats: 7,
        img: "/BookingCars/innovo-crysta.webp",
        oneWay: {
          bata: 600,
          perKm: 22,
          minKm: 130,
        },
        roundTrip: {
          bata: 600,
          perKm: 22,
          minKm: 250,
        },
      },
      "tempo-12": {
        name: "TEMPO 12",
        seats: 12,
        img: "/BookingCars/tempo.webp",
        oneWay: {
          bata: 1000,
          perKm: 24,
          minKm: 130,
        },
        roundTrip: {
          bata: 1000,
          perKm: 24,
          minKm: 250,
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
    textColor: "text-[#D16B30]",
    borderColor: "border-[#D16B30]",
    ringColor: "ring-[#D16B30]",
    bgImage: ["/Background/tamilnaduBg.webp"],
    hoverText: "hover:text-[#D16B30]",
    bgColor: "bg-[#D16B30]",
    hoverBg: "hover:bg-[#D16B30]",
    pillBg: "bg-[#D16B30]/5",
  },
};
