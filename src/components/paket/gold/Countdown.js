"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Countdown({ date }) {
  const calculateTimeLeft = () => {
    const difference = new Date(date) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (!timeLeft) {
    return (
      <p className="text-center text-lg font-semibold text-green-600">
        Acara sudah dimulai 🎉
      </p>
    );
  }

  // Animasi angka tiap berubah
  const flipVariant = {
    initial: { opacity: 0, y: -20, rotateX: -90 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: 20, rotateX: 90 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-2xl mx-auto py-10"
    >
      <h3 className="text-center text-lg md:text-xl font-bold mb-6">
        Menuju Hari Bahagia
      </h3>

      <div className="grid grid-cols-4 gap-4 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="p-4 rounded-2xl shadow bg-white text-black"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={value}
                variants={flipVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-bold"
              >
                {value}
              </motion.p>
            </AnimatePresence>
            <p className="text-sm text-gray-600 capitalize">{unit}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
