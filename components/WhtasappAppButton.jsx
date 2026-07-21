"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

const ContactButton = () => {
  const phoneNumber = "919626850192";
  const whatsappMessage = "Hi! I'd like to inquire about your services.";

  const actions = [
    {
      id: 'call',
      icon: <Phone size={24} fill="currentColor" />,
      color: 'bg-red-500',
      label: 'Call Us',
      onClick: () => window.open(`tel:+${phoneNumber}`, '_self'),
      hasPulse: false // You can change this to true if you want the call button to pulse
    },
    {
      id: 'whatsapp',
      icon: <BsWhatsapp size={24} fill="currentColor" />,
      color: 'bg-[#25D366]',
      label: 'WhatsApp',
      onClick: () => window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank'),
      hasPulse: true // Pulse effect applied to WhatsApp on the right side
    }
  ];

  return (
    // Changed flex-col to flex-row and positioned across the bottom area
    <div className="fixed bottom-6 left-6 right-6 z-[100] flex justify-between items-center pointer-events-none">
      {actions.map((action) => (
        <div key={action.id} className="relative flex flex-col items-center justify-center group pointer-events-auto">
          {/* Label on Hover - Now shows above the button */}
          <span className="absolute bottom-16 px-3 py-1 bg-white text-slate-800 text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
            {action.label}
          </span>
          
          {/* Pulse Effect */}
          {action.hasPulse && (
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute w-14 h-14 ${action.color} rounded-full -z-10`}
            />
          )}

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={action.onClick}
            className={`${action.color} text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl border-2 border-white/20`}
          >
           {action.icon}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default ContactButton;