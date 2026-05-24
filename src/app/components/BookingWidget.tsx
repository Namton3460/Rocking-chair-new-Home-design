import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingWidgetProps {
  onClose: () => void;
  pricePerNight: number;
}

export function BookingWidget({ onClose, pricePerNight }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<number | null>(null);

  // Static dates for UI representation (May 2026)
  const daysInMonth = 31;
  const startDayOfWeek = 5; // Friday for May 1, 2026

  const handleDateClick = (day: number) => {
    setCheckIn(day);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#fdfcfb] rounded-[clamp(1rem,3vw,2.5rem)] shadow-[0_20px_60px_-15px_rgba(140,109,83,0.15)] border border-[#e2d8ce]/40 overflow-hidden origin-top"
    >
      {/* Header Section */}
      <div className="relative border-b border-[#e2d8ce]/30"
        style={{ padding: "clamp(1rem, 4vw, 1.75rem) clamp(1rem, 5vw, 3rem)" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-50 text-[#8c6d53] transition-all p-3 rounded-full bg-[#8c6d53]/10 hover:bg-[#8c6d53]/20 border border-[#8c6d53]/20 shadow-md active:scale-95"
        >
          <X size={26} strokeWidth={2.5} />
        </button>

        <div className="space-y-1 pr-12">
          <span className="text-[#8c6d53] font-semibold tracking-[0.3em] uppercase"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)" }}>Reservation</span>
          <h3 className="font-playfair text-[#1a202c]"
            style={{ fontSize: "clamp(1.35rem, 3.5vw, 2.25rem)" }}>Book Your Stay</h3>
        </div>

        {/* Subtle Progress Indicator */}
        <div className="flex gap-1.5 mt-[clamp(1rem,3vw,2rem)]">
          <div className="h-[2px] w-[clamp(2rem,5vw,3.5rem)] bg-[#8c6d53] rounded-full" />
          <div className="h-[2px] w-[clamp(2rem,5vw,3.5rem)] bg-[#8c6d53]/10 rounded-full" />
          <div className="h-[2px] w-[clamp(2rem,5vw,3.5rem)] bg-[#8c6d53]/10 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row">
        {/* Left Side: Calendar */}
        <div className="flex-1 border-b xl:border-b-0 xl:border-r border-[#e2d8ce]/30"
          style={{ padding: "clamp(1rem, 4vw, 2.5rem) clamp(1rem, 5vw, 3.5rem)" }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-[clamp(1.25rem,4vw,2.5rem)]">
            <h4 className="font-semibold text-[#1a202c] tracking-widest uppercase"
              style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)" }}>Select Check-in</h4>
            <div className="flex items-center justify-between gap-[clamp(0.8rem,3vw,2rem)]">
              <button className="p-1 text-[#8c6d53]/40 hover:text-[#8c6d53] transition-colors">
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <span className="font-playfair text-[#1a202c] min-w-[90px] text-center text-sm sm:text-base">May 2026</span>
              <button className="p-1 text-[#8c6d53] hover:text-[#1a202c] transition-colors">
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-[clamp(0.75rem,2.5vw,1.5rem)] mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={`${day}-${idx}`} className="text-center font-bold text-[#8c6d53]/40 tracking-widest text-[0.6rem] sm:text-[0.75rem]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2">
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 5;
              const isSelected = checkIn === day;

              return (
                <div key={day} className="flex justify-center items-center aspect-square">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative aspect-square flex items-center justify-center transition-all duration-300 rounded-full
                      ${isSelected
                        ? 'bg-[#1a202c] text-white shadow-xl shadow-[#1a202c]/20'
                        : isToday
                          ? 'border border-[#8c6d53]/30 text-[#8c6d53] font-bold'
                          : 'text-[#1a202c]/60 hover:bg-[#8c6d53]/5 hover:text-[#8c6d53]'
                      }
                    `}
                    style={{
                      width: "clamp(2rem, 4.5vw, 2.75rem)",
                      fontSize: "clamp(0.75rem, 1.4vw, 0.85rem)"
                    }}
                  >
                    {day}
                    {isSelected && (
                      <motion.div
                        layoutId="selection-ring"
                        className="absolute inset-[-3px] border border-[#1a202c]/10 rounded-full"
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#e2d8ce]/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a202c]" />
            <span className="text-[#8c6d53]/60 uppercase tracking-widest font-semibold text-[0.55rem] sm:text-[0.65rem]">Available Dates Only</span>
          </div>
        </div>

        {/* Right Side: Summary */}
        <div className="w-full xl:w-[clamp(18rem,32vw,26rem)] bg-[#f7f5f0]/40 flex flex-col justify-between"
          style={{ padding: "clamp(1rem, 4vw, 2.5rem) clamp(1rem, 5vw, 3.5rem)" }}>
          <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
            <div>
              <span className="text-[#8c6d53] font-bold tracking-[0.2em] uppercase block mb-3 text-[0.6rem] sm:text-[0.7rem]">Guest Details</span>
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#e2d8ce]/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8c6d53]/5 rounded-lg text-[#8c6d53]">
                    <Users size={16} />
                  </div>
                  <span className="font-medium text-[#1a202c] text-[0.75rem] sm:text-[0.85rem]">2 Adults, 1 Child</span>
                </div>
                <button className="font-bold text-[#8c6d53] hover:underline text-[0.55rem] sm:text-[0.65rem]">Edit</button>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[#8c6d53] font-bold tracking-[0.2em] uppercase block mb-3 text-[0.6rem] sm:text-[0.7rem]">Price Breakdown</span>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#1a202c]/50 text-[0.75rem] sm:text-[0.85rem]">Villa Rate</span>
                  <span className="font-semibold text-[#1a202c] text-[0.75rem] sm:text-[0.85rem]">฿{pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#1a202c]/50 text-[0.75rem] sm:text-[0.85rem]">Service & Taxes</span>
                  <span className="text-[#1a202c]/40 italic text-[0.7rem] sm:text-[0.8rem]">Calculated later</span>
                </div>
                <div className="h-[1px] w-full bg-[#e2d8ce]/30" />
                <div className="flex items-center justify-between">
                  <span className="font-playfair text-[#1a202c] text-sm sm:text-base">Total Estimated</span>
                  <span className="font-playfair text-[#8c6d53] text-lg sm:text-xl">
                    {checkIn ? `฿${pricePerNight.toLocaleString()}` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <motion.button
              disabled={!checkIn}
              whileHover={checkIn ? { scale: 1.02, y: -2 } : {}}
              whileTap={checkIn ? { scale: 0.98 } : {}}
              className={`
                w-full py-4 rounded-full flex items-center justify-center gap-4 font-bold tracking-[0.2em] uppercase transition-all duration-500 text-[0.7rem] sm:text-[0.8rem]
                ${checkIn
                  ? 'bg-[#1a202c] text-white shadow-2xl shadow-[#1a202c]/30 hover:bg-[#2d3748]'
                  : 'bg-[#e2d8ce] text-[#8c6d53]/40 cursor-not-allowed opacity-50'
                }
              `}
            >
              <span>{checkIn ? 'Confirm Dates' : 'Select Arrival'}</span>
              <ArrowRight size={16} />
            </motion.button>
            <p className="text-center text-[#8c6d53]/40 mt-5 tracking-widest uppercase font-bold text-[0.5rem] sm:text-[0.55rem]">
              Instant Confirmation • Best Price Guaranteed
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
