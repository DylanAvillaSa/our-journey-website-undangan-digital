"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CountdownSection from "@/components/paket/silver/template1/CountdownSection";

const messages = [
  {
    name: "Andi",
    time: "2025-08-09 16:17:53",
    message: "Selamat menempuh hidup baru 💙",
  },
  {
    name: "Siti",
    time: "2025-08-09 18:05:22",
    message: "Barakallah, semoga sakinah mawaddah warahmah 🤍",
  },
];

export default function Template2Silver() {
  const rsvpRef = useRef(null);
  const [dataMempelai, setDataMempelai] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/data/data.json");
      const data = await res.json();
      setDataMempelai(data.find((d) => d.template === "Silver"));
    };
    getData();
  }, []);

  useEffect(() => {
    if (opened && rsvpRef.current) {
      setTimeout(() => {
        rsvpRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    }
  }, [opened]);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center bg-[#F4F7FB] text-[#1E2A5E] relative overflow-hidden"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* WELCOME */}
      {!opened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg max-w-md border border-blue-100"
        >
          <p className="text-sm mb-3 text-[#415A77]">We Invite You To</p>
          <div className="rounded-full overflow-hidden border-4 border-[#1E2A5E] w-40 h-40 mx-auto mb-4">
            <Image
              src="/foto-dummy/pembuka.jpg"
              width={160}
              height={160}
              className="h-full object-cover"
              alt="pasangan"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#1E2A5E]">
            {dataMempelai?.nama_mempelai_pria} &{" "}
            {dataMempelai?.nama_mempelai_wanita}
          </h1>
          <p className="text-sm text-[#415A77] mb-2">
            Dengan penuh rasa syukur, kami mengundang Anda untuk hadir di hari
            bahagia kami.
          </p>
          <motion.button
            onClick={() => setOpened(true)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-3 bg-[#1E2A5E] text-white py-2 px-6 rounded-full shadow hover:bg-[#14213D]"
          >
            Buka Undangan
          </motion.button>
        </motion.div>
      )}

      {/* ISI UNDANGAN */}
      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col items-center mt-10"
        >
          {/* Pembuka */}
          <section className="max-w-xl text-center px-6">
            <Image
              src="/foto-dummy/pembuka.jpg"
              width={160}
              height={160}
              alt="Foto Mempelai"
              className="mx-auto rounded-full border-4 border-[#1E2A5E]"
            />
            <h2 className="mt-4 text-3xl font-semibold text-[#1E2A5E]">
              {dataMempelai?.nama_mempelai_pria} &{" "}
              {dataMempelai?.nama_mempelai_wanita}
            </h2>
            <p className="mt-3 text-sm text-[#415A77] italic">
              “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
              untukmu pasangan hidup dari jenismu sendiri...”
            </p>
            <h3 className="mt-2 text-sm text-[#1E2A5E]">– Ar-Rum 21 –</h3>
          </section>

          {/* Countdown */}
          <CountdownSection />

          {/* Mempelai */}
          <section className="mt-12 w-full bg-white py-10 px-6 rounded-3xl shadow-lg max-w-2xl">
            <h3 className="text-2xl font-semibold mb-8 text-[#1E2A5E]">
              Pasangan Bahagia
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Pria */}
              <div>
                <Image
                  src="/foto-dummy/pria.png"
                  width={160}
                  height={160}
                  alt="Groom"
                  className="mx-auto rounded-full border-4 border-[#1E2A5E]"
                />
                <h4 className="mt-3 text-xl text-[#1E2A5E]">
                  {dataMempelai?.nama_mempelai_pria}
                </h4>
                <p className="text-sm text-[#415A77]">
                  Putra dari Bapak A & Ibu B
                </p>
              </div>

              {/* Wanita */}
              <div>
                <Image
                  src="/foto-dummy/wanita.png"
                  width={160}
                  height={160}
                  alt="Bride"
                  className="mx-auto rounded-full border-4 border-[#1E2A5E]"
                />
                <h4 className="mt-3 text-xl text-[#1E2A5E]">
                  {dataMempelai?.nama_mempelai_wanita}
                </h4>
                <p className="text-sm text-[#415A77]">
                  Putri dari Bapak C & Ibu D
                </p>
              </div>
            </div>
          </section>

          {/* Lokasi Acara */}
          <section className="mt-16 max-w-2xl text-center">
            <h3 className="text-2xl font-semibold text-[#1E2A5E] mb-4">
              Akad Nikah
            </h3>
            <p className="text-[#415A77] text-sm">
              Jumat, 15 Agustus 2025 • 09.00 WIB
            </p>
            <p className="text-[#415A77] text-sm mt-1">
              Masjid Al-Ikhlas, Jakarta Selatan
            </p>

            <h3 className="text-2xl font-semibold text-[#1E2A5E] mt-10 mb-4">
              Resepsi
            </h3>
            <p className="text-[#415A77] text-sm">
              Sabtu, 16 Agustus 2025 • 19.00 WIB
            </p>
            <p className="text-[#415A77] text-sm">
              Gedung Balai Kartini, Jakarta
            </p>

            <div className="mt-6">
              <a
                href={dataMempelai?.link_maps}
                target="_blank"
                className="bg-[#1E2A5E] text-white py-2 px-5 rounded-full shadow hover:bg-[#14213D]"
              >
                Lihat Lokasi
              </a>
            </div>
          </section>

          {/* Amplop Digital */}
          <section className="mt-16 max-w-md w-full text-center bg-white/90 rounded-3xl border border-blue-100 p-6 shadow">
            <h3 className="text-2xl font-semibold text-[#1E2A5E] mb-4">
              Amplop Digital
            </h3>
            <p className="text-[#415A77] text-sm mb-4">
              Kirim hadiah atau doa tulus Anda melalui rekening berikut:
            </p>
            <div className="bg-[#F4F7FB] p-4 rounded-lg shadow-sm text-sm">
              <p>BANK BCA</p>
              <p className="font-semibold text-[#1E2A5E]">
                1234567890 - {dataMempelai?.nama_mempelai_pria}
              </p>
            </div>
          </section>

          {/* RSVP */}
          <section
            ref={rsvpRef}
            className="mt-16 w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
          >
            <h3 className="text-2xl font-semibold text-[#1E2A5E] mb-4">
              Kehadiran
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full border rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Tulis ucapan untuk mempelai"
                rows="3"
                className="w-full border rounded-lg px-3 py-2"
              ></textarea>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="">Pilih Kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak">Tidak Hadir</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#1E2A5E] text-white py-2 rounded-lg hover:bg-[#14213D]"
              >
                Kirim
              </button>
            </form>
          </section>

          {/* Ucapan Tamu */}
          <section className="mt-12 w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#1E2A5E] mb-4">
              Ucapan Tamu
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className="bg-[#F4F7FB] p-4 rounded-xl border border-blue-100"
                >
                  <p className="font-semibold text-[#1E2A5E]">{m.name}</p>
                  <p className="text-xs text-[#415A77]">{m.time}</p>
                  <p className="mt-1 text-[#415A77]">{m.message}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Penutup */}
          <section className="mt-16 mb-10 text-[#415A77] max-w-xl text-center">
            <p>
              Merupakan kehormatan bagi kami sekeluarga apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberi doa restu.
            </p>
            <p className="mt-4 font-semibold">
              {dataMempelai?.nama_mempelai_pria} &{" "}
              {dataMempelai?.nama_mempelai_wanita}
            </p>
          </section>
        </motion.div>
      )}
    </main>
  );
}
