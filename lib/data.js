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

export const carDetails = {
wagonimage:"/CardCars/wagonr.webp",
swiftimage:"/CardCars/swift-dzire-one-way-taxi-pondicherry-to-chennai.webp",
 etiosimage:"/CardCars/toyota-etios-airport-taxi-pondicherry-to-chennai.webp",
 ciazimage:"/CardCars/maruti-ciaz-premium-one-way-taxi-chennai-to-pondicherry.webp",
 ertigaimage:"/CardCars/maruti-ertiga-6-plus-1-family-taxi-pondicherry-to-chennai.webp",
 kiaimage:"/CardCars/kia-carens.webp",
  innovaimage:"/CardCars/toyota-innova-7-seater-taxi-pondicherry-to-chennai.webp",
  crystaimage:"/CardCars/toyota-innova-crysta-airport-taxi-pondicherry-to-chennai.webp",
  tempoimage:"/CardCars/tempo-traveller-12-seater-pondicherry-to-chennai-taxi.webp",
}

export const fareDetails = {
  kerala: {
    stateName: "Kerala",
    currency: "₹",
    defaults: {
      oneWayMinKm: 70,
      roundTripMinKm: false,
    },
    vehicles: {
      wagnor: {
        name: "WAGNOR",
        seats: 4,
        img: "/BookingCars/wagonr.webp",
        thumbnail:carDetails.wagonimage,
        oneWay: {
          bata: 0,
          perKm: 22,
          minKm: 100,
        },
      },sedan: {
        name: "SEDAN",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
       thumbnail:carDetails.swiftimage,
        oneWay: {
          bata: 0,
          perKm: 24,
          minKm: 100,
        },
      },
      etios: {
        name: "ETIOS",
        seats: 4,
        img: "/BookingCars/etios.webp",
       thumbnail:carDetails.etiosimage,
        oneWay: {
          bata: 0,
          perKm: 24,
          minKm: 100,
        },
      },
      ciaz: {
        name: "CIAZ",
        seats: 4,
        img: "/BookingCars/ciaz.webp",
         thumbnail:carDetails.ciazimage,
        oneWay: {
          bata: 0,
          perKm: 24,
          minKm: 100,
        },

      },
      ertiga: {
        name: "ERTIGA",
        seats: 6,
        img: "/BookingCars/ertiga.webp",
       thumbnail:carDetails.ertigaimage,
        oneWay: {
          bata: 0,
          perKm: 32,
          minKm: 100,
        },

      },
      carens: {
        name: "KIA CARENS",
        seats: 6,
        img: "/BookingCars/carens.webp",
        thumbnail:carDetails.kiaimage,
        oneWay: {
          bata: 0,
          perKm: 32,
          minKm: 100,
        },

      },
      innova: {
        name: "INNOVA",
        seats: 7,
        img: "/BookingCars/innova.webp",
       thumbnail:carDetails.innovaimage,
        oneWay: {
          bata: 0,
          perKm: 32,
          minKm: 100,
        },

      },
      crysta: {
        name: "CRYSTA",
        seats: 7,
        img: "/BookingCars/innovo-crysta.webp",
         thumbnail:carDetails.crystaimage,
        oneWay: {
          bata: 0,
          perKm: 36,
          minKm: 100,
        },

      },
      "tempo-12": {
        name: "TEMPO 12",
        seats: 12,
        img: "/BookingCars/tempo.webp",
         thumbnail:carDetails.tempoimage,
        oneWay: {
          bata: 0,
          perKm: 30,
          minKm: 100,
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
      wagnor: {
        name: "WAGNOR",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
         thumbnail:carDetails.wagonimage,
        oneWay: {
          bata: 400,
          perKm: 13,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 12,
          minKm: 250,
        },
      },sedan: {
        name: "SEDAN",
        seats: 4,
        img: "/BookingCars/swift-dzire.webp",
         thumbnail:carDetails.swiftimage,
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 13,
          minKm: 250,
        },
      },
      etios: {
        name: "ETIOS",
        seats: 4,
        img: "/BookingCars/etios.webp",
         thumbnail:carDetails.etiosimage,
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 13,
          minKm: 250,
        },
      },
      ciaz: {
        name: "CIAZ",
        seats: 4,
        img: "/BookingCars/ciaz.webp",
         thumbnail:carDetails.ciazimage,
        oneWay: {
          bata: 400,
          perKm: 15,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 13,
          minKm: 250,
        },
      },
      ertiga: {
        name: "ERTIGA",
        seats: 6,
        img: "/BookingCars/ertiga.webp",
         thumbnail:carDetails.ertigaimage,
        oneWay: {
          bata: 400,
          perKm: 20,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 18,
          minKm: 250,
        },
      },
      carens: {
        name: "KIA CARENS",
        seats: 6,
        img: "/BookingCars/carens.webp",
         thumbnail:carDetails.kiaimage,
        oneWay: {
          bata: 400,
          perKm: 20,
          minKm: 130,
        },
        roundTrip: {
          bata: 400,
          perKm: 18,
          minKm: 250,
        },
      },
      innova: {
        name: "INNOVA",
        seats: 7,
        img: "/BookingCars/innova.webp",
         thumbnail:carDetails.innovaimage,
        oneWay: {
          bata: 500,
          perKm: 21,
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
         thumbnail:carDetails.crystaimage,
        oneWay: {
          bata: 600,
          perKm: 23,
          minKm: 130,
        },
        roundTrip: {
          bata: 600,
          perKm: 23,
          minKm: 250,
        },
      },
      "tempo-12": {
        name: "TEMPO 12",
        seats: 12,
        img: "/BookingCars/tempo.webp",
         thumbnail:carDetails.tempoimage,
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
    bgImage: ["/Background/tamilNaduBg.webp"],
    hoverText: "hover:text-[#D16B30]",
    bgColor: "bg-[#D16B30]",
    hoverBg: "hover:bg-[#D16B30]",
    pillBg: "bg-[#D16B30]/5",
  },
};
