"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery3({ background, theme }) {
  const photos = [
    "/gallery/photo1.jpg",
    "/gallery/photo2.jpg",
    "/gallery/photo3.jpg",
    "/gallery/photo4.jpg",
  ];

  return (
    <section className="py-16 px-6 bg-white relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p
          className={`${background[theme].textMain} font-[GreatVibes] text-xl`}
        >
          Moment
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
          GALLERY
        </h2>
      </motion.div>

      {/* Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-8 overflow-hidden rounded-xl shadow-lg"
      >
        <video
          controls
          className="w-full h-[240px] md:h-[420px] object-cover"
          poster="/gallery/cover.jpg"
        >
          <source src="/gallery/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Grid Foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="relative w-full h-48 md:h-64 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={src}
              alt={`Gallery ${idx + 1}`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
