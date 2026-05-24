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
      className="w-full bg-[#fdfcfb] rounded-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_20px_60px_-15px_rgba(140,109,83,0.15)] border border-[#e2d8ce]/40 overflow-hidden origin-top"
    >
      {/* Header Section */}
      <div className="relative border-b border-[#e2d8ce]/30"
        style={{ padding: "clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem)" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-[clamp(1rem,3vw,2rem)] right-[clamp(1rem,3vw,2rem)] z-50 text-[#8c6d53]/60 hover:text-[#8c6d53] transition-all p-2.5 rounded-full hover:bg-[#8c6d53]/5 border border-[#8c6d53]/10"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="space-y-1">
          <span className="text-[#8c6d53] font-semibold tracking-[0.3em] uppercase"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)" }}>Reservation</span>
          <h3 className="font-playfair text-[#1a202c]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>Book Your Stay</h3>
        </div>

        {/* Subtle Progress Indicator */}
        <div className="flex gap-1.5 mt-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="h-[2px] w-[clamp(2.5rem,5vw,3.5rem)] bg-[#8c6d53] rounded-full" />
          <div className="h-[2px] w-[clamp(2.5rem,5vw,3.5rem)] bg-[#8c6d53]/10 rounded-full" />
          <div className="h-[2px] w-[clamp(2.5rem,5vw,3.5rem)] bg-[#8c6d53]/10 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Calendar */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[#e2d8ce]/30"
          style={{ padding: "clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem)" }}>
          <div className="flex items-center justify-between mb-[clamp(2rem,5vw,3rem)]">
            <h4 className="font-semibold text-[#1a202c] tracking-widest uppercase"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)" }}>Select Check-in</h4>
            <div className="flex items-center gap-[clamp(1rem,3vw,2rem)]">
              <button className="p-1 text-[#8c6d53]/40 hover:text-[#8c6d53] transition-colors">
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <span className="font-playfair text-[#1a202c] min-w-[100px] text-center"
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>May 2026</span>
              <button className="p-1 text-[#8c6d53] hover:text-[#1a202c] transition-colors">
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-[clamp(1rem,3vw,2rem)] mb-[clamp(1rem,3vw,1.5rem)]">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={`${day}-${idx}`} className="text-center font-bold text-[#8c6d53]/40 tracking-widest"
                style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)" }}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-[clamp(0.5rem,1.5vw,1rem)]">
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
                      width: "clamp(2.25rem, 5vw, 3rem)",
                      fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)"
                    }}
                  >
                    {day}
                    {isSelected && (
                      <motion.div
                        layoutId="selection-ring"
                        className="absolute inset-[-4px] border border-[#1a202c]/10 rounded-full"
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-[clamp(2.5rem,6vw,4rem)] pt-8 border-t border-[#e2d8ce]/20">
            <div className="w-2 h-2 rounded-full bg-[#1a202c]" />
            <span className="text-[#8c6d53]/60 uppercase tracking-widest font-semibold"
              style={{ fontSize: "clamp(0.55rem, 1vw, 0.65rem)" }}>Available Dates Only</span>
          </div>
        </div>

        {/* Right Side: Summary */}
        <div className="w-full lg:w-[clamp(20rem,35vw,28rem)] bg-[#f7f5f0]/40 flex flex-col justify-between"
          style={{ padding: "clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem)" }}>
          <div className="space-y-[clamp(2rem,5vw,3rem)]">
            <div>
              <span className="text-[#8c6d53] font-bold tracking-[0.2em] uppercase block mb-4"
                style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)" }}>Guest Details</span>
              <div className="flex items-center justify-between p-4 bg-white rounded-[clamp(0.75rem,1.5vw,1rem)] border border-[#e2d8ce]/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8c6d53]/5 rounded-lg">
                    <Users size={18} className="text-[#8c6d53]" />
                  </div>
                  <span className="font-medium text-[#1a202c]"
                    style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)" }}>2 Adults, 1 Child</span>
                </div>
                <button className="font-bold text-[#8c6d53] hover:underline"
                  style={{ fontSize: "clamp(0.55rem, 1vw, 0.65rem)" }}>Edit</button>
              </div>
            </div>

            <div className="space-y-5">
              <span className="text-[#8c6d53] font-bold tracking-[0.2em] uppercase block mb-4"
                style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)" }}>Price Breakdown</span>
              <div className="space-y-[clamp(1rem,2.5vw,1.5rem)]">
                <div className="flex items-center justify-between">
                  <span className="text-[#1a202c]/50" style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)" }}>Villa Rate</span>
                  <span className="font-semibold text-[#1a202c]" style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)" }}>฿{pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#1a202c]/50" style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)" }}>Service & Taxes</span>
                  <span className="text-[#1a202c]/40 italic" style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.85rem)" }}>Calculated later</span>
                </div>
                <div className="h-[1px] w-full bg-[#e2d8ce]/30" />
                <div className="flex items-center justify-between">
                  <span className="font-playfair text-[#1a202c]" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>Total Estimated</span>
                  <span className="font-playfair text-[#8c6d53]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}>
                    {checkIn ? `฿${pricePerNight.toLocaleString()}` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,4rem)]">
            <motion.button
              disabled={!checkIn}
              whileHover={checkIn ? { scale: 1.02, y: -2 } : {}}
              whileTap={checkIn ? { scale: 0.98 } : {}}
              className={`
                w-full py-[clamp(1rem,2.5vw,1.5rem)] rounded-full flex items-center justify-center gap-4 font-bold tracking-[0.2em] uppercase transition-all duration-500
                ${checkIn
                  ? 'bg-[#1a202c] text-white shadow-2xl shadow-[#1a202c]/30 hover:bg-[#2d3748]'
                  : 'bg-[#e2d8ce] text-[#8c6d53]/40 cursor-not-allowed opacity-50'
                }
              `}
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)" }}
            >
              <span>{checkIn ? 'Confirm Dates' : 'Select Arrival'}</span>
              <ArrowRight size={18} />
            </motion.button>
            <p className="text-center text-[#8c6d53]/40 mt-6 tracking-widest uppercase font-bold"
              style={{ fontSize: "clamp(0.5rem, 1vw, 0.6rem)" }}>
              Instant Confirmation • Best Price Guaranteed
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
