"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Templates sesuai jumlah per kategori
const allTemplates = {
  Silver: [1, 2, 3].map((i) => ({
    id: i,
    name: `Silver ${i}`,
    src: `/template/template-${i}.png`,
    link: `/template/template-${i}-silver`,
  })),
  Gold: [4, 5, 6, 8, 9, 10, 11].map((i, idx) => ({
    id: i,
    name: `Gold ${idx + 1}`,
    src: `/template/template-${i}.png`,
    link: `/template/template-${i}-gold`,
  })),
  Platinum: [13, 14, 15, 16].map((i, idx) => ({
    id: i,
    name: `Platinum ${idx + 1}`,
    src: `/template/template-${i}.png`,
    link: `/template/template-${i}-platinum`,
  })),
};

const GaleriTemplateSection = ({ setSelectedTemplate, setOpenModal }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Silver");
  const templates = allTemplates[selectedCategory];

  const openTemplateModal = (tpl) => {
    setSelectedTemplate(tpl);
    setOpenModal(true);
  };

  return (
    <section className="px-6 md:px-24 py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">
        📸 Contoh Template
      </h2>

      {/* Switch Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        {["Silver", "Gold", "Platinum"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Templates */}
      <div className="flex flex-wrap justify-center gap-6">
        {templates.map((tpl) => (
          <motion.div
            key={tpl.id}
            whileHover={{ scale: 1.03 }}
            className="relative cursor-pointer rounded-xl overflow-hidden shadow-md bg-gray-100 flex flex-col items-center w-[220px] sm:w-[250px] md:w-[200px]"
          >
            {/* Gambar */}
            <div className="w-full h-[220px] sm:h-[250px] md:h-[200px] relative">
              <Image
                src={tpl.src}
                alt={tpl.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Nama Template */}
            <span className="text-center font-semibold mt-2">{tpl.name}</span>

            {/* Tombol */}
            <div className="flex gap-2 mt-3 mb-3 w-full px-4">
              <button
                onClick={() => router.push(tpl.link)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold transition"
              >
                Live Preview
              </button>
              <button
                onClick={() => openTemplateModal(tpl)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition"
              >
                Pesan Sekarang
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GaleriTemplateSection;
