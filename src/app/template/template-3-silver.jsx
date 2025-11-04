"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import CountdownSection from "@/components/paket/silver/template1/CountdownSection";

const messages = [
  {
    name: "Andi Wijaya",
    time: "2025-08-10 12:45:00",
    message: "Selamat berbahagia, semoga langgeng sampai akhir hayat 💖",
  },
  {
    name: "Rina Kusuma",
    time: "2025-08-10 13:10:00",
    message: "Semoga menjadi keluarga yang penuh cinta dan keberkahan ✨",
  },
];

export default function Template3Silver() {
  const [opened, setOpened] = useState(false);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#64748b] text-[#e2e8f0] relative overflow-hidden scroll-smooth"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Background Ornaments */}
      <Image
        src="/asset/ornament-gold.png"
        alt="ornament"
        width={180}
        height={180}
        className="absolute top-0 left-0 w-44 md:w-60 opacity-50"
      />
      <Image
        src="/asset/ornament-gold.png"
        alt="ornament"
        width={180}
        height={180}
        className="absolute bottom-0 right-0 w-44 md:w-60 opacity-50"
      />

      {/* Welcome Screen */}
      {!opened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10 bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-[#d4af37]"
        >
          <p className="text-sm mb-4 text-gray-200">You're Invited To</p>
          <div className="rounded-full overflow-hidden border-4 border-[#d4af37] w-40 h-40 mx-auto mb-4">
            <Image
              src="/images/tmp.jpg"
              width={160}
              height={160}
              className="h-full object-cover"
              alt="pasangan"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">
            Aisyah & Rendra
          </h1>
          <p className="text-sm text-gray-300">
            Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk
            hadir di acara kami.
          </p>
          <motion.button
            onClick={() => setOpened(true)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-4 bg-gradient-to-r from-[#1e293b] to-[#334155] hover:opacity-90 text-[#d4af37] font-semibold py-2 px-6 rounded-full shadow-md border border-[#d4af37]"
          >
            Buka Undangan
          </motion.button>
        </motion.div>
      )}

      {/* Full Invitation */}
      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center p-6 min-h-screen relative text-gray-100 mt-20"
        >
          {/* Foto Mempelai */}
          <Image
            src="/images/tmp.jpg"
            width={160}
            height={160}
            alt="Foto Mempelai"
            className="mx-auto w-40 h-40 rounded-full border-4 border-[#d4af37] object-cover shadow-lg"
          />

          <h2 className="mt-4 text-3xl font-[GreatVibes] text-[#d4af37]">
            The Wedding of Aisyah & Rendra
          </h2>

          {/* Ayat */}
          <p className="mt-4 text-sm text-gray-300 italic">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram
            kepadanya..."
          </p>
          <h2 className="mt-2 text-[#d4af37]">- Ar-Rum Ayat 21 -</h2>

          {/* Countdown */}
          <CountdownSection template="template-3" />

          {/* Info Akad */}
          <section className="mt-12">
            <div className="relative w-[90%] max-w-md mx-auto">
              <div className="bg-white/20 backdrop-blur-md rounded-3xl px-6 py-6 border border-[#d4af37] shadow-xl">
                <h3 className="text-lg md:text-xl font-semibold text-[#d4af37]">
                  Sabtu, 20 Desember 2025
                </h3>
                <p className="text-sm text-gray-200 mt-1">
                  Pukul 09:00 - 13:00
                </p>
                <p className="text-sm text-gray-100 mt-3">
                  Ballroom Hotel, Jakarta
                </p>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-gradient-to-r from-[#1e293b] to-[#334155] mt-16 rounded-xl p-5 flex flex-col gap-5 border border-[#d4af37]">
            <h1 className="text-2xl font-semibold text-[#d4af37]">
              Our Gallery
            </h1>

            {["/images/galeri-1.png", "/images/galeri-2.png"].map(
              (galeri, index) => (
                <div
                  key={index}
                  className="border border-[#d4af37] rounded overflow-hidden"
                >
                  <img src={galeri} className="w-full rounded" />
                </div>
              )
            )}
          </section>

          {/* RSVP Form */}
          <section className="py-10 px-4 bg-cover bg-center mt-12">
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-[#d4af37]">
              <h1 className="text-center text-3xl font-[GreatVibes] text-[#d4af37] mb-6">
                Kehadiran
              </h1>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-200 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama"
                    className="w-full border border-gray-500 rounded-lg px-3 py-2 bg-transparent text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-200 mb-1">
                    Ucapan
                  </label>
                  <textarea
                    placeholder="Tulis ucapan untuk mempelai"
                    rows="4"
                    className="w-full border border-gray-500 rounded-lg px-3 py-2 bg-transparent text-white focus:outline-none focus:border-[#d4af37]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm text-gray-200 mb-1">
                    Kehadiran
                  </label>
                  <select className="w-full border border-gray-500 rounded-lg px-3 py-2 bg-transparent text-white focus:outline-none focus:border-[#d4af37]">
                    <option value="">Pilih opsi</option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak">Tidak Hadir</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1e293b] to-[#334155] hover:opacity-90 text-[#d4af37] py-2 rounded-lg transition duration-300 border border-[#d4af37]"
                >
                  Kirim
                </button>
              </form>
            </div>
          </section>

          {/* List Ucapan */}
          <section className="py-8 px-4 mt-10">
            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-[#d4af37]">
              <h2 className="text-xl font-bold text-[#d4af37] mb-4">
                Ucapan Tamu
              </h2>
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-xl p-4 shadow-sm border border-[#334155]"
                  >
                    <p className="font-bold text-[#d4af37]">
                      {msg.name}{" "}
                      <span className="font-normal italic text-gray-300 text-sm">
                        - {msg.time}
                      </span>
                    </p>
                    <p className="text-gray-200 mt-1">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </main>
  );
}
