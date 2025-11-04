"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import CountdownSection from "@/components/paket/silver/template1/CountdownSection";

const messages = [
  {
    name: "Team Our Journey",
    time: "2025-08-09 16:17:53",
    message: "Semoga acaranya berjalan dengan lancar dan sesuai rencana 🙏",
  },
  {
    name: "Budi Santoso",
    time: "2025-08-09 17:45:10",
    message: "Selamat menempuh hidup baru, semoga bahagia selalu ❤️",
  },
  {
    name: "Siti Aminah",
    time: "2025-08-09 18:05:22",
    message: "Barakallah, semoga menjadi keluarga sakinah mawaddah warahmah 🤲",
  },
];

export default function Template2Silver() {
  const [opened, setOpened] = useState(false);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center bg-[#F4F7FB] text-[#1E2A5E] relative overflow-hidden scroll-smooth"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Background Ornaments */}
      <Image
        src="/asset/ornament-blue.png"
        alt="ornament"
        width={150}
        height={150}
        className="absolute top-0 left-0 w-40 md:w-60 opacity-70"
      />
      <Image
        src="/asset/ornament-blue.png"
        alt="ornament"
        width={150}
        height={150}
        className="absolute bottom-0 right-0 w-40 md:w-60 opacity-70"
      />

      {/* Welcome Screen */}
      {!opened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#1E2A5E]"
        >
          <p className="text-sm mb-4 text-gray-600">We Invite You To</p>
          <div className="rounded-full overflow-hidden border-4 border-[#1E2A5E] w-40 h-40 mx-auto mb-4">
            <Image
              src="/images/tmp.jpg"
              width={160}
              height={160}
              className="h-full object-cover"
              alt="pasangan"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#1E2A5E]">
            Mandala & Raysa
          </h1>
          <p className="text-sm text-gray-600">
            Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i
            untuk Hadir di Acara Kami.
          </p>
          <motion.button
            onClick={() => setOpened(true)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-4 bg-[#1E2A5E] hover:bg-[#142045] text-white py-2 px-6 rounded-full shadow-md"
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
          className="text-center p-6 bg-[#F4F7FB] min-h-screen relative text-[#1E2A5E] mt-20"
        >
          {/* Foto Mempelai */}
          <Image
            src="/images/tmp.jpg"
            width={160}
            height={160}
            alt="Foto Mempelai"
            className="mx-auto w-40 h-40 rounded-full border-4 border-[#1E2A5E] object-cover"
          />
          <h2 className="mt-4 text-3xl font-[GreatVibes] text-[#1E2A5E]">
            The Wedding of Mandala & Raysa
          </h2>

          {/* Ayat */}
          <p className="mt-4 text-sm text-gray-600 italic">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram
            kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <h2 className="mt-2 text-[#1E2A5E]">- Ar-Rum Ayat 21 -</h2>

          {/* Countdown */}
          <CountdownSection template="template-2" />

          {/* Info Akad */}
          <section className="mt-12">
            <div className="relative w-[90%] max-w-md mx-auto">
              <div className="bg-white/90 rounded-3xl px-6 py-6 border-[3px] border-dashed border-[#1E2A5E] shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-[#1E2A5E]">
                  Minggu, 30 November 2025
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Pukul 10:00 - 14:00
                </p>
                <p className="text-sm text-gray-700 mt-3">
                  Gedung Serbaguna, Bandung
                </p>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-[#1E2A5E] mt-16 rounded-xl p-5 flex flex-col gap-5 text-white">
            <h1 className="text-2xl font-semibold text-white">Our Gallery</h1>
            {[
              "/images/galeri-1.png",
              "/images/galeri-2.png",
              "/images/galeri-3.png",
              "/images/galeri-4.png",
            ].map((galeri, index) => (
              <div
                key={index}
                className="border-dashed border-2 border-white rounded"
              >
                <img src={galeri} className="w-full rounded" />
              </div>
            ))}
          </section>

          {/* Relationship Story */}
          <section className="py-10 px-4 mt-12">
            <div className="max-w-xl mx-auto bg-white/90 rounded-2xl p-6 shadow-lg border border-[#1E2A5E]">
              <h1 className="text-center text-2xl font-bold text-[#1E2A5E] mb-4">
                Story of Us
              </h1>
              <p className="text-gray-700">
                Kami pertama bertemu di kampus, saling berbagi mimpi dan
                akhirnya menemukan satu sama lain. Setiap momen kami selalu
                penuh tawa dan cinta.
              </p>
            </div>
          </section>

          {/* Amplop Digital & Musik */}
          <section className="py-10 px-4 mt-12 bg-[#F4F7FB]">
            <div className="max-w-xl mx-auto bg-white/90 rounded-2xl p-6 shadow-lg border border-[#1E2A5E] flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[#1E2A5E]">
                Amplop Digital
              </h2>
              <p className="text-gray-700">
                Kirim ucapan & amplop secara digital melalui link ini.
              </p>

              <h2 className="text-xl font-semibold text-[#1E2A5E] mt-4">
                Musik
              </h2>
              <audio controls className="w-full rounded">
                <source src="/music/sample.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </section>

          {/* RSVP Form */}
          <section className="py-10 px-4 mt-12">
            <div className="max-w-md mx-auto bg-white/90 rounded-2xl p-6 shadow-lg border border-[#1E2A5E]">
              <h1 className="text-center text-3xl font-[GreatVibes] text-[#1E2A5E] mb-6">
                Kehadiran
              </h1>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E2A5E]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Ucapan
                  </label>
                  <textarea
                    placeholder="Tulis ucapan untuk mempelai"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E2A5E]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Kehadiran
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E2A5E]">
                    <option value="">Pilih opsi</option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak">Tidak Hadir</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1E2A5E] hover:bg-[#142045] text-white py-2 rounded-lg transition duration-300"
                >
                  Kirim
                </button>
              </form>
            </div>
          </section>

          {/* List Ucapan */}
          <section className="py-8 px-4 mt-10">
            <div className="max-w-lg mx-auto bg-white/95 rounded-2xl shadow-xl p-5 border border-[#1E2A5E]">
              <h2 className="text-xl font-bold text-[#1E2A5E] mb-4">
                Ucapan Tamu
              </h2>
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-[#F4F7FB] rounded-xl p-4 shadow-sm border border-gray-200"
                  >
                    <p className="font-bold text-[#1E2A5E]">
                      {msg.name}{" "}
                      <span className="font-normal italic text-gray-500 text-sm">
                        - {msg.time}
                      </span>
                    </p>
                    <p className="text-gray-700 mt-1">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Map / Lokasi */}
          <section className="py-10 px-4 mt-10">
            <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl p-6 shadow-lg border border-[#1E2A5E]">
              <h2 className="text-2xl font-semibold text-[#1E2A5E] mb-4">
                Lokasi Acara
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.1234!2d107.609!3d-6.90123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1234567890abcdef%3A0xabcdef1234567890!2sGedung%20Serbaguna%2C%20Bandung!5e0!3m2!1sen!2sid!4v1234567890"
                className="w-full h-72 rounded-lg"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </section>

          {/* Footer / Penutup */}
          <section className="py-10 mt-10">
            <p className="text-gray-600 text-sm">
              Terima kasih telah hadir dan memberikan doa terbaik untuk kami.
            </p>
            <p className="text-gray-600 text-sm mt-2">Mandala & Raysa</p>
          </section>
        </motion.div>
      )}
    </main>
  );
}
