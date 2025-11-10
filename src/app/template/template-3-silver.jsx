"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Countdown from "@/components/paket/gold/Countdown";
import { PlayCircle, PauseCircle } from "lucide-react";

export default function Template3Silver() {
  const [dataUndangan, setDataUndangan] = useState(null);
  const [daftarUcapan, setDaftarUcapan] = useState([
    {
      id: 1,
      nama: "Dewi & Rafi",
      isi: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah mawaddah warahmah 💖",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      isi: "Barakallah! Semoga selalu bahagia dan langgeng sampai akhir hayat 🤍",
    },
  ]);
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const rsvpRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/data/data.json");
      const data = await res.json();
      setDataUndangan(data.find((d) => d.template === "Silver"));
    };
    getData();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !ucapan) return;

    const newUcapan = {
      id: daftarUcapan.length + 1,
      nama,
      isi: ucapan,
    };

    setDaftarUcapan([newUcapan, ...daftarUcapan]);
    setNama("");
    setUcapan("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-hidden">
      {/* Backsound */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* --- LAYAR PEMBUKA --- */}
      {!opened && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-center px-6"
        >
          <Image
            src="/foto-dummy/pembuka.jpg"
            alt="Ornament"
            width={120}
            height={120}
            className="mb-6 opacity-90"
          />
          <h1 className="text-4xl md:text-5xl font-serif text-yellow-400 mb-3">
            {dataUndangan?.nama_mempelai_pria}
          </h1>
          <h2 className="text-4xl md:text-5xl font-serif text-yellow-400 mb-6">
            &
          </h2>
          <h1 className="text-4xl md:text-5xl font-serif text-yellow-400 mb-6">
            {dataUndangan?.nama_mempelai_wanita}
          </h1>
          <p className="text-gray-300 mb-10">
            Akan melangsungkan pernikahan pada{" "}
            <span className="text-yellow-400 font-semibold">
              21 Desember 2025
            </span>
          </p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="bg-yellow-500 text-[#0f172a] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition"
          >
            Buka Undangan
          </motion.button>
        </motion.section>
      )}

      {opened && (
        <>
          {/* Hero Section */}
          <section className="relative flex flex-col items-center bg-[url(/foto-dummy/latar.jpg)] bg-no-repeat object-cover ml-2 mt-3 rounded-md justify-center text-center min-h-screen  from-[#1e293b] to-[#0f172a]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-serif text-yellow-400"
            >
              {dataUndangan?.nama_mempelai_pria} &{" "}
              {dataUndangan?.nama_mempelai_wanita}
            </motion.h1>
            <p className="mt-4 text-lg text-slate-800">
              Akan melangsungkan pernikahan
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <Countdown targetDate={dataUndangan?.tanggal_resepsi} />
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="mt-10 flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
            >
              {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
              {isPlaying ? "Pause Music" : "Play Music"}
            </motion.button>
          </section>

          {/* Ayat */}
          <section className="py-20 bg-[#1e293b]/60 text-center">
            <p className="italic text-gray-300 max-w-2xl mx-auto leading-relaxed">
              “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang.”
            </p>
            <p className="mt-4 text-yellow-400 font-semibold">
              – QS. Ar-Rum: 21 –
            </p>
          </section>

          {/* Mempelai */}
          <section className="py-24 bg-[#0f172a] text-center">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-10">
              Mempelai
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <Image
                  src="/foto-dummy/pria.png"
                  alt="Mempelai Pria"
                  width={180}
                  height={180}
                  className="rounded-full border-4 border-yellow-500 shadow-lg"
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {dataUndangan?.nama_mempelai_pria}
                </h3>
                <p className="text-gray-400">Putra dari Bapak & Ibu Pratama</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <Image
                  src="/foto-dummy/wanita.png"
                  alt="Mempelai Wanita"
                  width={180}
                  height={180}
                  className="rounded-full border-4 border-yellow-500 shadow-lg"
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {dataUndangan?.nama_mempelai_wanita}
                </h3>
                <p className="text-gray-400">Putri dari Bapak & Ibu Lestari</p>
              </motion.div>
            </div>
          </section>

          {/* Jadwal */}
          <section className="py-20 bg-[#1e293b]/70 text-center">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-8">
              Waktu & Tempat
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="p-6 border border-yellow-500 rounded-xl w-64">
                <h3 className="font-semibold text-xl text-yellow-300">
                  Akad Nikah
                </h3>
                <p className="text-gray-300 mt-2">
                  {dataUndangan?.tanggal_akad}
                </p>
                <p className="text-gray-400 mt-2">
                  {dataUndangan?.lokasi_akad}
                </p>
              </div>
              <div className="p-6 border border-yellow-500 rounded-xl w-64">
                <h3 className="font-semibold text-xl text-yellow-300">
                  Resepsi
                </h3>
                <p className="text-gray-300 mt-2">
                  {dataUndangan?.tanggal_resepsi}
                </p>
                <p className="text-gray-400 mt-2">
                  {dataUndangan?.lokasi_resepsi}
                </p>
              </div>
            </div>

            <a
              href={dataUndangan?.link_maps}
              target="_blank"
              className="inline-block mt-10 px-6 py-3 bg-yellow-500 text-[#0f172a] rounded-full font-semibold hover:bg-yellow-400"
            >
              Lihat Lokasi
            </a>
          </section>

          {/* Amplop Digital */}
          <section className="py-20 bg-[#0f172a] text-center">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">
              Amplop Digital
            </h2>
            <p className="text-gray-300 mb-4">
              {dataUndangan?.amplop_digital.rekening}
            </p>
          </section>
          <section
            ref={rsvpRef}
            className="relative z-10 py-24 bg-[#1e293b]/60 text-center text-white"
          >
            <h2 className="text-3xl font-semibold text-yellow-400 mb-8">
              RSVP & Ucapan
            </h2>

            {/* Form RSVP */}
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-5 p-6 rounded-xl space-y-4 bg-white shadow-lg"
            >
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                className="w-full p-3 rounded-lg text-[#0f172a] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                value={ucapan}
                onChange={(e) => setUcapan(e.target.value)}
                placeholder="Ucapan dan doa..."
                className="w-full p-3 rounded-lg text-[#0f172a] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows={4}
              />
              <button
                type="submit"
                className="bg-yellow-500 text-[#0f172a] font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 transition-all"
              >
                Kirim
              </button>
            </form>

            {/* Daftar Ucapan */}
            <div className="max-w-2xl mx-auto mt-10 space-y-4 text-left px-6">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">
                Ucapan dan Doa Tamu 💌
              </h3>

              {daftarUcapan.length === 0 ? (
                <p className="text-gray-300 text-center">
                  Belum ada ucapan. Jadilah yang pertama mengirimkan doa!
                </p>
              ) : (
                daftarUcapan.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/10 border border-white/20 rounded-lg p-4 shadow-md"
                  >
                    <p className="font-semibold text-yellow-300">{item.nama}</p>
                    <p className="text-gray-200 mt-1">{item.isi}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-[#0f172a] text-center text-gray-400 text-sm">
            Dibuat dengan ❤️ oleh{" "}
            <span className="text-yellow-400">Dravora.id</span>
          </footer>
        </>
      )}
    </div>
  );
}
