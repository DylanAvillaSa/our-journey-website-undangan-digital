"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery4({ background, theme }) {
  const photos = [
    "/images/prewed-1.jpg",
    "/images/prewed-2.jpg",
    "/images/tmp.jpg",
    "/images/bg-wedding.jpg",
    "/images/wedding-3.jpg",
  ];

  return (
    <section className="py-20 px-6 bg-white relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-14"
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

      {/* Video Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-16 overflow-hidden rounded-3xl shadow-lg relative group max-w-4xl mx-auto"
      >
        <video
          controls
          className="w-full h-[240px] md:h-[420px] object-cover"
          poster="/gallery/cover.jpg"
        >
          <source src="/gallery/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>
      </motion.div>

      {/* Masonry Style Gallery */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-md group break-inside-avoid"
          >
            <Image
              src={src}
              alt={`Gallery ${idx + 1}`}
              width={600}
              height={800}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center p-4">
              <p className="text-white text-sm font-medium">{`Foto ${
                idx + 1
              }`}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
