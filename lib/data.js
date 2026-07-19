import {
  Home,
  Info,
  ShieldCheck,
  Car,
  CircleDollarSign
} from "lucide-react";

export const companyInfo = {
    companyName:"Golden Oneway",
    companySlogan:"Fastest Taxi Service",
    companyLogo:"/logo.png",
    companyNumber:"919626850192",
    companyGmail:"goldenonewaytaxi.com@gmail.com",
    companyAddress:"Chinnakanal, Kerala 685613",
    companyDomain:"goldenonewaytaxi.com",
}

export const navigationData = [
  { 
    name: "Home", 
    link: "/", 
    icon: <Home size={16} /> 
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
  }
];