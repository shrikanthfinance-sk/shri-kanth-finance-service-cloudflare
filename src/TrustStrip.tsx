import React from 'react';
import { Calendar, IndianRupee, MapPin, Landmark, UserCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: <Calendar className="w-5 h-5 text-[#C9A227]" />,
      title: "Since 2023",
      subtitle: "Established 17 Feb 2023"
    },
    {
      icon: <IndianRupee className="w-5 h-5 text-[#C9A227]" />,
      title: "₹2 Lakh – ₹5 Crore",
      subtitle: "Loan Assistance Range"
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#C9A227]" />,
      title: "6 District Service Area",
      subtitle: "Gwalior & Chambal Zone"
    },
    {
      icon: <Landmark className="w-5 h-5 text-[#C9A227]" />,
      title: "Multiple Connections",
      subtitle: "Banks & NBFC Network"
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#C9A227]" />,
      title: "Personalised Guidance",
      subtitle: "End-to-End Assistance"
    }
  ];

  return (
    <div className="bg-[#0B2A4A] text-white py-6 border-y border-[#071E36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 items-center">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3.5 ${
                index < trustItems.length - 1 ? 'lg:border-r lg:border-slate-700/60 lg:pr-4' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white tracking-tight truncate">
                  {item.title}
                </div>
                <div className="text-xs text-slate-300 truncate">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
