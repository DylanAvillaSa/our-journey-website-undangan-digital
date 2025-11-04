"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail, Instagram } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { fonts } from "@/app/layout";

// ===== Dummy Messages (Ucapan & Doa) =====
const dummyData = [
  {
    nama: "Alya Rahma",
    kehadiran: "hadir",
    ucapan: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah 💕",
    waktu: "21 Oktober 2025, 10:15",
  },
  {
    nama: "Rafi Pratama",
    kehadiran: "tidak hadir",
    ucapan: "Maaf belum bisa hadir, tapi doa terbaik selalu untuk kalian!",
    waktu: "21 Oktober 2025, 10:30",
  },
  {
    nama: "Mira Dewi",
    kehadiran: "hadir",
    ucapan: "Selamat menempuh hidup baru! Bahagia selalu 💍",
    waktu: "21 Oktober 2025, 11:05",
  },
];

// ===== Variasi Warna (2 Tema Baru, tanpa Emerald) =====
export const THEMES = {
  sunset: {
    pageBg:
      "bg-[radial-gradient(1400px_900px_at_10%_-10%,#fff4ed,transparent),radial-gradient(1400px_900px_at_90%_0%,#fff7f0,transparent)] bg-[#fffdfc]",
    headerGrad: "bg-gradient-to-r from-orange-700 via-red-500 to-pink-500",
    card: "bg-gradient-to-br from-[#fff7f5]/90 via-[#fff0eb]/80 to-[#fff8f3]/90 backdrop-blur-lg",
    border: "border-orange-400",
    textMain: "text-orange-900",
    cta: "bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 hover:from-orange-600 hover:to-red-500",
    chip: "bg-orange-100 text-orange-800",
  },

  // 🌌 Royal Purple & Gold
  royal: {
    pageBg:
      "bg-[radial-gradient(1400px_900px_at_20%_-10%,#f5f3ff,transparent),radial-gradient(1400px_900px_at_90%_0%,#faf5ff,transparent)] bg-[#fcfbff]",
    headerGrad: "bg-gradient-to-r from-purple-900 via-violet-700 to-indigo-600",
    card: "bg-gradient-to-br from-[#faf5ff]/90 via-[#f3e8ff]/80 to-[#ede9fe]/90 backdrop-blur-lg",
    border: "border-violet-400",
    textMain: "text-purple-900",
    cta: "bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-500 hover:from-violet-600 hover:to-purple-500",
    chip: "bg-violet-100 text-violet-800",
  },
  // 🔹 Varian 3: Rose Gold & Champagne
  roseGold: {
    pageBg:
      "bg-[radial-gradient(1400px_900px_at_30%_-20%,#fff5f5,transparent),radial-gradient(1400px_900px_at_90%_0%,#fffaf5,transparent)] bg-[#fffdfc]",
    headerGrad: "bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400",
    card: "bg-gradient-to-br from-[#fffaf8]/90 via-[#fff5f3]/80 to-[#fff0ec]/90 backdrop-blur-lg",
    border: "border-rose-300",
    textMain: "text-rose-900",
    cta: "bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 hover:from-rose-500 hover:to-pink-400",
    chip: "bg-rose-100 text-rose-800",
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
  exit: { opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.3 } },
};

// Variants untuk tiap tombol
const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.5, y: 10 },
};

export default function PlatinumTemplate15() {
  const rsvpRef = useRef(null);
  const audioRef = useRef(null);
  const [switcher, setSwitcher] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [theme, setTheme] = useState("sunset");
  const [formData, setFormData] = useState({
    nama: "",
    kehadiran: "",
    ucapan: "",
  });
  const [data, setData] = useState(dummyData);
  const totalHadir = data.filter((d) => d.kehadiran === "hadir").length;
  const totalTidakHadir = data.filter(
    (d) => d.kehadiran === "tidak hadir"
  ).length;
  const [submitted, setSubmitted] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem("msgs_v1");
      return raw ? JSON.parse(raw) : initialMessages;
    } catch (e) {
      return initialMessages;
    }
  });

  const [guestForm, setGuestForm] = useState({ name: "", message: "" });

  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const [showBackgroundVideo, setShowBackgroundVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const rekeningList = [
    {
      id: 1,
      bank: "BCA",
      nomor: "1234567890",
      nama: "Dylan Avilla",
      logo: "/asset/platinum/tema-merak/bca.png",
    },
  ];

  const TARGET_DATE = new Date("2025-12-21T10:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(TARGET_DATE));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const remaining = getTimeRemaining(TARGET_DATE);
      setTimeLeft(remaining);
      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        setFinished(true);
        clearInterval(t);
      }
    }, 1000);

    return () => clearInterval(t);
  }, [TARGET_DATE]);

  const handleVideoEnd = () => {
    // Saat video pembuka selesai, tampilkan background video
    setShowBackgroundVideo(true);
  };
  const canvasRef = useRef(null);

  const handlePauseBeforeEnd = (e) => {
    const video = e.target;
    const canvas = canvasRef.current;

    // kalau tinggal 0.3 detik terakhir
    if (video.duration - video.currentTime <= 1.3) {
      // gambar frame terakhir ke canvas
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // tampilkan canvas, sembunyikan video
      video.style.display = "none";
      canvas.classList.remove("hidden");
    }
  };

  const T = THEMES[theme];
  const ref = useRef(null);
  const [guestBook, setGuestBook] = useState([]);
  const [showGift, setShowGift] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ref.current) setTarget(ref.current);
  }, []);

  const handleOpen = () => setOpened(true);

  useEffect(() => {
    if (opened && rsvpRef.current) {
      setTimeout(() => {
        rsvpRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 900);
    }
  }, [opened]);

  useEffect(() => {
    localStorage.setItem("msgs_v1", JSON.stringify(messages));
  }, [messages]);

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const addGuestMessage = (e) => {
    e.preventDefault();
    if (!guestForm.name || !guestForm.message) return;
    const newMsg = {
      name: guestForm.name,
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
      message: guestForm.message,
    };
    setMessages((s) => [newMsg, ...s]);
    setGuestForm({ name: "", message: "" });
  };

  const handleSaveDate = () => {
    // Tanggal event harus string ISO: "2025-11-25T08:00:00"
    const startDate = new Date("2025-11-25T08:00:00");
    const endDate = new Date("2025-11-25T11:00:00");

    if (isNaN(startDate) || isNaN(endDate)) {
      alert("Tanggal event tidak valid!");
      return;
    }

    const formatForGoogle = (date) =>
      date.toISOString().replace(/-|:|\.\d{3}/g, "") + "Z";

    const start = formatForGoogle(startDate);
    const end = formatForGoogle(endDate);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Vidi & Riffany Wedding"
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      "Acara pernikahan kami"
    )}&location=${encodeURIComponent("Masjid Al-Falah, Jakarta Selatan")}`;

    window.open(url, "_blank");
  };

  const images = [
    "/images/family.jpg",
    "/images/tmp.jpg",
    "/images/bg-wedding.jpg",
  ]; // ganti sesuai foto pasangan lu

  const [current, setCurrent] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const images2 = ["/images/tmp.jpg", "/images/bg-wedding.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images2.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images2.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // ganti gambar tiap 5 detik
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <main
      className={`min-h-screen ${T.pageBg} relative overflow-hidden`}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* ===== Musik Latar + Controller ===== */}
      <audio
        ref={audioRef}
        // autoPlay
        loop
        src="/bg-wedding.mp3"
        className="hidden"
      />

      {/* Welcome Screen */}
      <AnimatePresence>
        {!opened && (
          <motion.section
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black"
          >
            {/* 🏔️ Background Layer dengan Blur */}
            <div className="absolute inset-0">
              <Image
                src="/asset/platinum/tema-travel/latar-belakang-pembuka.png"
                alt="Gunung Senja"
                fill
                priority
                className="object-cover opacity-70 scale-105 blur-xs"
              />

              {/* Lapisan Gradasi + efek blur lembut */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-rose-900/50 backdrop-blur-[80%] mix-blend-overlay" />
            </div>

            {/* ✨ Animated Light Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* 💫 Floating Rings */}
            <motion.div
              className="absolute -bottom-10 right-10 w-40 h-40 border border-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-20 right-20 w-24 h-24 border border-rose-400/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />

            {/* 💍 Center Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 max-w-lg w-full px-6"
            >
              {/* 🖼️ Foto Mempelai */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="relative mx-auto w-40 h-[14rem] md:w-48 md:h-[14rem] mb-6 rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(255,192,203,0.4)] border-4 border-transparent bg-gradient-to-tr from-rose-400 via-pink-300 to-yellow-200 p-[2px]"
              >
                <div className="w-full h-full rounded-md overflow-hidden bg-white">
                  <Image
                    src="/images/prewed-1.jpg"
                    alt="Foto Mempelai"
                    fill
                    className="object-cover scale-105"
                  />
                </div>

                {/* efek glow halus */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-rose-100/20 to-transparent" />
              </motion.div>

              {/* ✨ The Wedding Of */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white text-sm md:text-base tracking-[5px] uppercase mb-3 font-[var(--font-serif)]"
              >
                The Wedding Of
              </motion.p>

              {/* 🕊️ Nama Mempelai */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="font-[var(--font-vibes)] text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-orange-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] mb-4"
              >
                Putra & Putri
              </motion.h1>

              {/* 📅 Tanggal */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-white/90 text-lg md:text-xl mb-8 font-[var(--font-playfair)]"
              >
                12 • 12 • 2023
              </motion.p>

              {/* 💌 Guest Name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-white text-sm md:text-base mb-2 tracking-wide">
                  Kepada Yth:
                </p>
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-2xl font-semibold text-rose-700 bg-white/90 rounded-xl w-[240px] mx-auto py-1 shadow-md backdrop-blur-md"
                >
                  Nama Tamu
                </motion.p>
                <p className="text-white text-sm md:text-base mt-2">
                  Di Tempat
                </p>
              </motion.div>

              {/* 🕯️ Open Button */}
              <motion.button
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="bg-gradient-to-r from-rose-500 via-pink-400 to-orange-300 text-white px-8 py-3 rounded-full font-semibold tracking-wide shadow-lg mt-10 flex items-center gap-2 mx-auto hover:shadow-rose-400/60 transition-all duration-500"
              >
                <Mail className="w-5 h-5" /> Buka Undangan
              </motion.button>
            </motion.div>

            {/* 🌙 Bottom Glow */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===== UNDANGAN LENGKAP ===== */}
      {opened && (
        <div className="relative w-full min-h-screen overflow-y-auto">
          <AnimatePresence>
            {/* animasi */}
            <motion.div
              className="inset-0 fixed w-full h-full z-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {/* ===== Video Animasi Pembuka ===== */}
              {!showBackgroundVideo && (
                <motion.div
                  className="relative w-full h-full overflow-hidden flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <video
                    ref={videoRef}
                    src="/animasi-pembuka-template-15.mp4"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}

              {/* ===== Video Background ===== */}
              {showBackgroundVideo && (
                <motion.div
                  className="relative w-full h-full overflow-hidden flex items-center justify-center opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <video
                    ref={videoRef2}
                    src="/animasi-pembuka-template-15-2.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Ornamen Background */}
                  {/* <div className="absolute inset-0 pointer-events-none">
                    <img
                      src="/asset/platinum/tema-pegunungan/latar-nama.png"
                      alt="Ornament kanan bawah"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto md:w-[500px] animate-float-slow"
                    />
                  </div> */}

                  {/* Overlay teks */}
                  {/* <motion.div
                    className="absolute inset-0 w-1/2 mx-auto flex flex-col items-center justify-center text-white text-center bottom-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 5, duration: 5 }}
                  >
                    <motion.h1
                      className="text-sm md:text-6xl font-bold tracking-wide drop-shadow-lg"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1 }}
                    >
                      <span className="text-white text-xl">The Wedding Of</span>
                    </motion.h1>

                    <motion.div
                      className="text-2xl md:text-5xl text-white mt-1 font-light flex flex-col drop-shadow-md"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 2, duration: 1 }}
                    >
                      <p>Vidi</p>
                      <span>&</span>
                      <p>Riffany</p>
                    </motion.div>
                  </motion.div> */}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ======== Bagian Konten yang Bisa di Scroll ======== */}
          {showBackgroundVideo && (
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-gray-800 mt-[100vh] mx-3">
              {/* ===== Pembukaan Surah Ar-Rum ===== */}
              <section className="relative rounded-t-full py-24 px-6 md:px-16 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
                {/* Ornamen Background */}
                <div className="absolute inset-0 opacity-30">
                  <img
                    src="/asset/florar.png"
                    alt="Ornament atas"
                    className="absolute top-0 left-0 w-48 md:w-72 opacity-70 animate-pulse-slow"
                  />
                  <img
                    src="/asset/florar.png"
                    alt="Ornament bawah"
                    className="absolute bottom-0 right-0 w-48 md:w-72 opacity-70 animate-pulse-slow"
                  />
                </div>

                {/* Konten */}
                <div className="relative text-center">
                  <motion.h2
                    className="text-3xl md:text-5xl font-bold text-amber-700 mb-8 tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </motion.h2>

                  <motion.p
                    className="text-base md:text-2xl leading-relaxed italic text-gray-700 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                  >
                    “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                    menciptakan untukmu pasangan-pasangan dari jenismu sendiri,
                    agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
                    menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya
                    pada yang demikian itu benar-benar terdapat tanda-tanda bagi
                    kaum yang berpikir.”
                  </motion.p>

                  <motion.p
                    className="mt-6 text-amber-500 font-medium text-sm md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    — QS. Ar-Rum : 21 —
                  </motion.p>

                  {/* Garis Ornamen */}
                  <motion.div
                    className="mt-10 mx-auto w-48 h-[2px] bg-gradient-to-r from-rose-300 via-amber-400 to-rose-300 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </div>
              </section>

              {/* ===== Bagian Kedua Mempelai ===== */}
              <section className="relative py-28 px-6 rounded-t-full rounded-b-full mt-12 md:px-16 bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
                {/* Ornamen Background */}
                <div className="absolute inset-0 pointer-events-none">
                  <img
                    src="/asset/florar.png"
                    alt="Ornament kiri atas"
                    className="absolute top-0 left-0 w-40 md:w-[500px] opacity-40 animate-float-slow"
                  />
                  <img
                    src="/asset/florar.png"
                    alt="Ornament kanan bawah"
                    className="absolute bottom-0 right-0 w-40 md:w-[500px] opacity-40 animate-float-slow"
                  />
                </div>

                {/* Judul */}
                <motion.h3
                  className={`text-xl md:text-6xl font-bold text-amber-700 text-center mb-8 drop-shadow-sm ${fonts.greatVibes}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Assalamualaikum Warahmatullahi Wabarakatuh
                </motion.h3>

                <motion.p
                  className={`text-gray-700 text-center max-w-3xl mx-auto leading-relaxed text-sm md:text-xl font-light ${fonts.playfair}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
                  untuk menyelenggarakan pernikahan putra-putri kami:
                </motion.p>

                {/* Layout Mempelai */}
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-28 mt-24">
                  {/* Mempelai Pria */}
                  <motion.div
                    className="relative group w-full md:w-[320px] bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-all duration-700 border border-amber-100"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden ring-4 ring-amber-300 shadow-xl">
                      <img
                        src="/images/prewed-1.jpg"
                        alt="Mempelai Pria"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-36">
                      <h4 className="text-3xl font-semibold text-amber-700">
                        Vidi
                      </h4>
                      <p className="text-gray-600 mt-2 italic text-sm">
                        Putra dari Bapak Ahmad & Ibu Siti
                      </p>

                      {/* 🔗 Instagram Icon */}
                      <a
                        href="https://instagram.com/vidiofficial" // Ganti sesuai akun
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center mt-4 text-amber-600 hover:text-amber-800 transition-colors duration-300"
                      >
                        <Instagram size={22} strokeWidth={1.5} />
                        <span className="ml-2 text-sm font-medium">
                          Instagram
                        </span>
                      </a>
                    </div>

                    <div className="absolute top-0 right-0 bg-amber-100/30 w-20 h-20 rounded-bl-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 bg-rose-100/30 w-24 h-24 rounded-tr-full blur-2xl"></div>
                  </motion.div>

                  {/* Ornamen Tengah Unik */}
                  <motion.div
                    className="flex flex-col items-center justify-center relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <motion.div
                      className="absolute inset-0 blur-3xl bg-amber-200/30 w-40 h-40 rounded-full animate-pulse-slow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                    />
                    <motion.span
                      className="relative text-7xl text-amber-600 font-[var(--font-vibes)] z-10"
                      initial={{ rotate: -15, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      &
                    </motion.span>
                  </motion.div>

                  {/* Mempelai Wanita */}
                  <motion.div
                    className="relative group w-full md:w-[320px] bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-all duration-700 border border-amber-100"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden ring-4 ring-amber-300 shadow-xl">
                      <img
                        src="/images/prewed-2.jpg"
                        alt="Mempelai Wanita"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-36">
                      <h4 className="text-3xl font-semibold text-amber-700">
                        Riffany
                      </h4>
                      <p className="text-gray-600 mt-2 italic text-sm">
                        Putri dari Bapak Yusuf & Ibu Laila
                      </p>

                      {/* 🔗 Instagram Icon */}
                      <a
                        href="https://instagram.com/riffany.official" // Ganti sesuai akun
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center mt-4 text-amber-600 hover:text-amber-800 transition-colors duration-300"
                      >
                        <Instagram size={22} strokeWidth={1.5} />
                        <span className="ml-2 text-sm font-medium">
                          Instagram
                        </span>
                      </a>
                    </div>

                    <div className="absolute top-0 right-0 bg-amber-100/30 w-20 h-20 rounded-bl-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 bg-rose-100/30 w-24 h-24 rounded-tr-full blur-2xl"></div>
                  </motion.div>
                </div>

                {/* Waktu & Tempat */}
                <motion.div
                  className="mt-24 text-center text-gray-700"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <p className="text-xl md:text-2xl text-amber-700 font-semibold mb-2">
                    🗓️ Sabtu, 21 Desember 2025
                  </p>
                  <p className="text-lg md:text-xl text-gray-600">
                    📍 Gedung Puri Indah Convention Hall, Jakarta
                  </p>
                  <motion.p
                    className="mt-8 italic text-gray-500 max-w-xl mx-auto text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    Merupakan kehormatan dan kebahagiaan bagi kami apabila
                    Bapak/Ibu berkenan hadir untuk memberikan doa restu.
                  </motion.p>
                </motion.div>
              </section>

              {/* countdown */}
              <section className="relative mt-12 bg-[url(/asset/platinum/tema-pegunungan/latar-countdown.png)] bg-cover rounded-md w-full bg-gradient-to-b from-amber-700 to-white text-white py-20 overflow-hidden">
                {/* Background Ornament Glow */}
                <div className="absolute inset-0">
                  <div className="absolute -top-20 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative container mx-auto px-6 text-center">
                  {/* Title */}
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Hitungan Mundur Menuju Hari Bahagia
                  </motion.h2>
                  <motion.p
                    className="text-teal-100/90 text-lg mb-12"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    Catat tanggalnya — hadir dan berikan doa restu terbaikmu.
                  </motion.p>

                  {/* Horizontal Countdown */}
                  <motion.div
                    className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    {[
                      { label: "Hari", value: timeLeft.days },
                      { label: "Jam", value: timeLeft.hours },
                      { label: "Menit", value: timeLeft.minutes },
                      { label: "Detik", value: timeLeft.seconds },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-amber-500/10 border border-white/20 rounded-full shadow-inner backdrop-blur-md hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                      >
                        <span className="text-3xl md:text-4xl font-semibold">
                          {padNumber(item.value)}
                        </span>
                        <span className="text-xs mt-2 tracking-widest uppercase text-teal-100/90">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* When finished */}
                  {finished && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="mt-14 bg-white/10 border border-white/20 px-8 py-5 rounded-2xl inline-block shadow-xl backdrop-blur-md"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Alhamdulillah — Kita Menikah!
                      </h3>
                      <p className="text-teal-100">
                        Terima kasih atas doa dan kehadiran Anda 💕
                      </p>
                    </motion.div>
                  )}
                </div>
              </section>
              <section className="flex flex-col items-center justify-center space-y-12 py-16 bg-transparent">
                {/* Akad Nikah */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative bg-transparent text-white flex flex-col items-center overflow-hidden"
                >
                  {/* Background Bulan */}
                  <div className="absolute top-0 left-0 w-2/3 md:w-1/3 opacity-50">
                    <img
                      src="/asset/platinum/tema-pegunungan/bulan.png"
                      alt="moon"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Card Akad Nikah */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative bg-gradient-to-b from-white to-gray-100 text-gray-800 w-[90%] max-w-md mx-auto rounded-t-3xl shadow-2xl overflow-hidden py-10 px-6 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <CalendarDays className="text-gray-700 w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                      Akad Nikah
                    </h3>

                    <div className="flex justify-center items-center gap-6 mb-6">
                      <div className="text-right">
                        <p className="text-xs tracking-wider">MINGGU</p>
                        <p className="text-xs text-gray-600">
                          09.00 - 10.00 WIB
                        </p>
                      </div>
                      <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        31
                      </div>
                      <div className="text-left">
                        <p className="text-xs tracking-wider">AGUSTUS</p>
                        <p className="text-xs text-gray-600">2025</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                      <MapPin className="text-gray-700 mb-2" />
                      <h4 className="font-bold text-sm text-gray-900 uppercase">
                        Kediaman Mempelai Wanita
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-1 max-w-xs">
                        Jl. Guntur Melati Masuk ke Gapura MDL 525, Haurpanggung,
                        Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-black text-white text-sm px-6 py-2 rounded-full shadow hover:bg-gray-900 transition"
                    >
                      📍 Buka Maps
                    </a>
                  </motion.div>
                </motion.section>

                {/* Resepsi */}
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative bg-transparent text-white flex flex-col items-center overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative bg-gradient-to-b from-white to-gray-100 text-gray-800 w-[90%] max-w-md mx-auto rounded-b-3xl shadow-2xl overflow-hidden py-10 px-6 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <CalendarDays className="text-gray-700 w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                      Resepsi
                    </h3>

                    <div className="flex justify-center items-center gap-6 mb-6">
                      <div className="text-right">
                        <p className="text-xs tracking-wider">MINGGU</p>
                        <p className="text-xs text-gray-600">
                          10.30 - 13.00 WIB
                        </p>
                      </div>
                      <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        31
                      </div>
                      <div className="text-left">
                        <p className="text-xs tracking-wider">AGUSTUS</p>
                        <p className="text-xs text-gray-600">2025</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                      <MapPin className="text-gray-700 mb-2" />
                      <h4 className="font-bold text-sm text-gray-900 uppercase">
                        Kediaman Mempelai Wanita
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-1 max-w-xs">
                        Jl. Guntur Melati Masuk ke Gapura MDL 525, Haurpanggung,
                        Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-black text-white text-sm px-6 py-2 rounded-full shadow hover:bg-gray-900 transition"
                    >
                      📍 Buka Maps
                    </a>

                    <img
                      src="/asset/floral-bottom.png"
                      alt="floral"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 opacity-20"
                    />
                  </motion.div>
                </motion.section>
              </section>

              {/* love story */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative mt-12 py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
              >
                {/* Ornamen bulan di background */}
                <div className="absolute left-0 top-0 w-44 h-44 bg-[url('/asset/platinum/tema-pegunungan/bulan.png')] bg-no-repeat bg-contain opacity-20 animate-pulse"></div>
                <div className="absolute right-0 bottom-0 w-44 h-44 bg-[url('/asset/platinum/tema-pegunungan/bulan.png')] bg-no-repeat bg-contain opacity-20 rotate-180 animate-pulse"></div>

                <h2 className="text-4xl font-extrabold text-white text-center mb-6 tracking-wide">
                  Our Love Story
                </h2>
                <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
                  Cinta kami berawal dari pertemuan sederhana, tumbuh dalam doa,
                  dan kini berlabuh pada satu janji suci yang diridhai oleh-Nya
                  🌙
                </p>

                {/* Timeline horizontal */}
                <div className="relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 px-6 md:px-20">
                  {/* Step 1 */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full md:w-1/3 border border-gray-700 hover:border-teal-400 transition"
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                      1
                    </div>
                    <h3 className="text-2xl font-semibold text-teal-300 mt-4">
                      Awal Pertemuan
                    </h3>
                    <p className="text-gray-300 mt-3">
                      Tak ada yang kebetulan dalam rencana Tuhan. Di antara
                      banyak wajah, kami dipertemukan dengan cara yang tak
                      disangka. Satu senyum, satu sapaan, menjadi awal dari
                      kisah yang perlahan tumbuh menjadi cinta.
                    </p>
                    <p className="mt-4 text-sm text-gray-500 italic">2019</p>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full md:w-1/3 border border-gray-700 hover:border-teal-400 transition"
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                      2
                    </div>
                    <h3 className="text-2xl font-semibold text-teal-300 mt-4">
                      Tumbuh Dalam Doa
                    </h3>
                    <p className="text-gray-300 mt-3">
                      Dalam perjalanan waktu, kami belajar tentang kesabaran dan
                      arti saling memahami. Kami berdoa di waktu yang sama,
                      meniti langkah bersama, hingga akhirnya yakin bahwa takdir
                      memang telah menulis nama kami berdampingan.
                    </p>
                    <p className="mt-4 text-sm text-gray-500 italic">2021</p>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full md:w-1/3 border border-gray-700 hover:border-teal-400 transition"
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                      3
                    </div>
                    <h3 className="text-2xl font-semibold text-teal-300 mt-4">
                      Menuju Satu Ikatan
                    </h3>
                    <p className="text-gray-300 mt-3">
                      Di bawah sinar bulan dan restu keluarga, kami mengikrarkan
                      janji untuk berjalan seirama menuju kehidupan baru. Cinta
                      kami kini bukan hanya tentang dua hati, tapi satu takdir
                      yang menyatu selamanya.
                    </p>
                    <p className="mt-4 text-sm text-gray-500 italic">2025</p>
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="mt-20 text-center">
                  <div className="w-32 h-1 bg-teal-400 mx-auto rounded-full"></div>
                  <p className="text-gray-400 mt-3 italic">
                    “Di bawah cahaya bulan, kami belajar bahwa cinta sejati
                    bukan sekadar memiliki, tapi menyatu dalam doa dan restu
                    Ilahi.”
                  </p>
                </div>
              </motion.section>

              {/* Galeri Foto */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative py-24 mt-12 bg-gradient-to-b from-white via-teal-50/30 to-white overflow-hidden"
              >
                {/* Ornamen background */}
                <div className="absolute left-0 top-0 w-48 h-48 bg-[url('/asset/platinum/tema-pegunungan/bulan.png')] bg-no-repeat bg-contain opacity-30 animate-pulse"></div>
                <div className="absolute right-0 bottom-0 w-48 h-48  opacity-30 rotate-180 animate-pulse"></div>

                {/* Judul */}
                <div className="text-center mb-12 px-4">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-teal-700 tracking-tight mb-4">
                    Galeri Cinta Kami
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Setiap momen berharga terekam dalam bingkai kenangan.
                    Berikut adalah potret perjalanan cinta kami menuju hari
                    bahagia 💞
                  </p>
                </div>

                {/* Galeri grid */}
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    "/images/prewed-1.jpg",
                    "/images/prewed-2.jpg",
                    "/images/tmp.jpg",
                    "/images/bg-wedding.jpg",
                    "/images/bg.jpg",
                  ].map((src, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                      onClick={() => setSelectedImage(src)}
                    >
                      <img
                        src={src}
                        alt={`Foto ${i + 1}`}
                        className="object-cover w-full h-52 md:h-64 lg:h-72 transform group-hover:scale-110 transition duration-500"
                      />
                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
                        <span className="text-white text-sm md:text-base font-medium tracking-wide">
                          Klik untuk melihat
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Lightbox modal */}
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                  >
                    <motion.img
                      src={selectedImage}
                      alt="Foto Besar"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-2xl max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
                    />
                    {/* Tombol close */}
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-8 right-8 text-white text-3xl hover:text-teal-300 transition"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </motion.section>

              {/* Wedding Gift */}
              <motion.section
                className="relative mt-12 py-24 bg-gradient-to-b from-teal-700 to-teal-900 text-center overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Ornamen kanan-kiri */}
                <img
                  src="/asset/platinum/tema-merak/ornament-merak.png"
                  className="absolute right-0 bottom-0 w-40 opacity-40 rotate-12 pointer-events-none"
                  alt="ornamen merak"
                />
                <img
                  src="/asset/platinum/tema-merak/ornament-merak.png"
                  className="absolute left-0 top-0 w-40 opacity-40 -rotate-12 pointer-events-none"
                  alt="ornamen merak"
                />

                {/* Judul */}
                <motion.h2
                  className="text-4xl font-bold text-white mb-4 font-playfair drop-shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Wedding Gift 💝
                </motion.h2>

                <p className="text-teal-100 max-w-2xl mx-auto leading-relaxed mb-10 px-6">
                  Doa dan restu Anda sudah merupakan hadiah terindah bagi kami.
                  Namun jika ingin memberikan tanda kasih, dengan senang hati
                  kami menerimanya melalui rekening berikut:
                </p>

                {/* Tombol */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGift((prev) => !prev)}
                  className="px-8 py-3 bg-white text-teal-800 font-semibold rounded-full shadow-lg hover:bg-teal-100 transition"
                >
                  {showGift ? "Tutup Hadiah 🎀" : "Buka Hadiah Pernikahan 🎁"}
                </motion.button>

                {/* Card Rekening */}
                <AnimatePresence>
                  {showGift && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.6 }}
                      className="mt-10 flex justify-center space-x-6 flex-wrap"
                    >
                      {rekeningList.map((rek) => (
                        <motion.div
                          key={rek.id}
                          whileHover={{ scale: 1.03 }}
                          className="bg-white/95 shadow-xl rounded-2xl px-8 py-6 w-80 text-left border border-teal-100 relative overflow-hidden"
                        >
                          <img
                            src="/asset/platinum/tema-merak/ornament-merak.png"
                            alt="ornamen"
                            className="absolute opacity-20 -right-10 -bottom-10 w-32 rotate-12 pointer-events-none"
                          />
                          <div className="flex items-center gap-3 mb-4">
                            <img
                              src={rek.logo}
                              alt={rek.bank}
                              className="w-10 h-10"
                            />
                            <h3 className="text-xl font-bold text-teal-800">
                              Bank {rek.bank}
                            </h3>
                          </div>
                          <p className="text-gray-700 mb-1">
                            No. Rekening:
                            <span className="font-semibold ml-2">
                              {rek.nomor}
                            </span>
                          </p>
                          <p className="text-gray-700 mb-4">
                            a.n.{" "}
                            <span className="font-semibold">{rek.nama}</span>
                          </p>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(rek.nomor);
                              setCopied(rek.id.toString());
                              setTimeout(() => setCopied(null), 2000);
                            }}
                            className="text-sm bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-teal-800 transition"
                          >
                            {copied === rek.id.toString()
                              ? "✅ Disalin"
                              : "Salin Nomor"}
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>

              {/* Form RSPV */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative py-24 mt-12 rounded-xl bg-gradient-to-b from-teal-50 via-white to-teal-50 text-center overflow-hidden"
              >
                {/* Ornamen background */}
                <img
                  src="/asset/platinum/tema-merak/ornament-merak.png"
                  alt="ornamen merak"
                  className="absolute left-0 top-0 w-40 opacity-25 -rotate-12 pointer-events-none"
                />
                <img
                  src="/asset/platinum/tema-merak/ornament-merak.png"
                  alt="ornamen merak"
                  className="absolute right-0 bottom-0 w-40 opacity-25 rotate-12 pointer-events-none"
                />

                {/* Judul */}
                <motion.h2
                  className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-4 font-playfair"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  RSVP Kehadiran 💌
                </motion.h2>

                <p className="text-gray-600 max-w-xl mx-auto mb-10 px-4">
                  Kami sangat berbahagia jika Anda dapat hadir dan berbagi
                  kebahagiaan di hari spesial kami. Mohon konfirmasi kehadiran
                  Anda melalui form di bawah ini ✨
                </p>

                {/* Form Container */}
                <motion.div
                  className="bg-white/90 shadow-2xl backdrop-blur-sm rounded-3xl p-8 md:p-10 w-[90%] max-w-xl mx-auto border border-teal-100"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-col gap-6 text-left">
                    {/* Nama */}
                    <div>
                      <label className="block text-teal-800 font-semibold mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        required
                        className="w-full p-3 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>

                    {/* Kehadiran */}
                    <div>
                      <label className="block text-teal-800 font-semibold mb-2">
                        Apakah Anda akan hadir?
                      </label>
                      <select
                        name="kehadiran"
                        value={formData.kehadiran}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        <option value="">Pilih status kehadiran</option>
                        <option value="hadir">Ya, saya akan hadir 💖</option>
                        <option value="tidak hadir">
                          Maaf, saya tidak bisa hadir 🙏
                        </option>
                      </select>
                    </div>

                    {/* Ucapan */}
                    <div>
                      <label className="block text-teal-800 font-semibold mb-2">
                        Ucapan & Doa
                      </label>
                      <textarea
                        name="ucapan"
                        value={formData.ucapan}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tuliskan doa dan ucapan untuk kedua mempelai..."
                        className="w-full p-3 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                      ></textarea>
                    </div>

                    {/* Tombol Kirim */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="mt-4 bg-teal-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-teal-800 transition font-semibold"
                    >
                      Kirim Konfirmasi
                    </motion.button>
                  </div>

                  {/* Notifikasi */}
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-green-700 bg-green-100 py-3 rounded-xl"
                    >
                      🎉 Terima kasih atas konfirmasinya! Doa & kehadiran Anda
                      sangat berarti 💚
                    </motion.div>
                  )}
                </motion.div>
              </motion.form>

              {/* daftar hadir dan ucapan peserta */}
              <motion.section
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative py-24 mt-12 rounded-xl bg-gradient-to-b from-white via-teal-50 to-white text-center overflow-hidden"
              >
                {/* Ornamen background */}
                <img
                  src="/asset/platinum/tema-merak/ornament-merak.png"
                  alt="ornamen merak kiri"
                  className="absolute left-0 top-0 w-40 opacity-25 -rotate-12 pointer-events-none"
                />
                <img
                  src="/asset/platinum/tema-merak/ornament-merak.png"
                  alt="ornamen merak kanan"
                  className="absolute right-0 bottom-0 w-40 opacity-25 rotate-12 pointer-events-none"
                />

                {/* Judul */}
                <motion.h2
                  className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-4 font-playfair"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Daftar Kehadiran & Ucapan
                </motion.h2>

                <p className="text-gray-600 max-w-xl mx-auto mb-12 px-4">
                  Terima kasih atas konfirmasi dan doa terbaik dari sahabat &
                  keluarga 💖
                </p>

                {/* Statistik kehadiran */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
                >
                  <div className="bg-white shadow-xl rounded-2xl px-8 py-6 w-60 border border-teal-100">
                    <h3 className="text-3xl font-bold text-teal-700">
                      {totalHadir}
                    </h3>
                    <p className="text-gray-600 mt-1">Tamu Hadir 💚</p>
                  </div>
                  <div className="bg-white shadow-xl rounded-2xl px-8 py-6 w-60 border border-teal-100">
                    <h3 className="text-3xl font-bold text-rose-600">
                      {totalTidakHadir}
                    </h3>
                    <p className="text-gray-600 mt-1">Tidak Hadir 💔</p>
                  </div>
                </motion.div>

                {/* Daftar Ucapan */}
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    transition={{ staggerChildren: 0.15 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                  >
                    {data.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-6 border border-teal-100 text-left relative"
                      >
                        {/* Ornamen kecil di pojok */}
                        <div className="absolute top-3 right-3 w-6 h-6 bg-[url('/asset/platinum/tema-merak/mini-floral.png')] bg-contain bg-no-repeat opacity-40"></div>

                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-teal-800">
                            {item.nama}
                          </h4>
                          <span
                            className={`text-sm font-medium px-3 py-1 rounded-full ${
                              item.kehadiran === "hadir"
                                ? "bg-teal-100 text-teal-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {item.kehadiran === "hadir"
                              ? "Hadir"
                              : "Tidak Hadir"}
                          </span>
                        </div>

                        <p className="text-gray-700 italic mb-3 leading-relaxed">
                          “{item.ucapan}”
                        </p>

                        <p className="text-xs text-gray-500 text-right">
                          {item.waktu}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.section>
              {/* Penutup */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="relative py-20 mt-12 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden text-center"
              >
                {/* Ornamen atas */}
                <img
                  src="/asset/platinum/tema-merak/ornament-merak-atas.png"
                  alt="ornament atas"
                  className="absolute top-0 left-0 w-48 opacity-60 animate-pulse"
                />
                <img
                  src="/asset/platinum/tema-merak/ornament-merak-atas.png"
                  alt="ornament atas kanan"
                  className="absolute top-0 right-0 w-48 opacity-60 animate-pulse rotate-180"
                />

                {/* Ucapan Terima Kasih */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="relative z-10 container mt-12 mx-auto px-6 max-w-2xl"
                >
                  <h2 className="text-4xl md:text-5xl font-semibold text-teal-500 mb-6 font-serif">
                    Terima Kasih
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                    Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa
                    restu kepada kami.
                  </p>
                  <p className="text-gray-500 italic mb-10">
                    "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                    menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
                    agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
                    menjadikan di antaramu rasa kasih dan sayang." <br />
                    <span className="text-sm text-gray-400">
                      (QS. Ar-Rum: 21)
                    </span>
                  </p>

                  {/* Nama Pasangan */}
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-3xl font-bold text-gray-800 font-serif">
                      Aulia & Rafi
                    </h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                      className="w-16 h-0.5 bg-teal-400 rounded-full"
                    />
                    <p className="text-gray-500">21 Desember 2025</p>
                  </div>
                </motion.div>

                {/* Ornamen bawah */}
                <img
                  src="/asset/platinum/tema-merak/ornament-merak-bawah.png"
                  alt="ornament bawah"
                  className="absolute bottom-0 left-0 w-48 opacity-60 animate-pulse"
                />
                <img
                  src="/asset/platinum/tema-merak/ornament-merak-bawah.png"
                  alt="ornament bawah kanan"
                  className="absolute bottom-0 right-0 w-48 opacity-60 animate-pulse rotate-180"
                />

                {/* Footer */}
                <footer className="mt-16 text-sm text-gray-400">
                  <p>
                    Dibuat dengan 💖 oleh{" "}
                    <span className="text-teal-500 font-medium">
                      Our Journey
                    </span>
                  </p>
                </footer>
              </motion.section>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function getTimeRemaining(target) {
  const now = new Date();
  const t = Math.max(0, target.getTime() - now.getTime()); // ms remaining, at least 0
  // compute step-by-step:
  const msInSecond = 1000;
  const msInMinute = 60 * msInSecond;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;

  const days = Math.floor(t / msInDay);
  const hours = Math.floor((t % msInDay) / msInHour);
  const minutes = Math.floor((t % msInHour) / msInMinute);
  const seconds = Math.floor((t % msInMinute) / msInSecond);

  return { total: t, days, hours, minutes, seconds };
}

function padNumber(n) {
  return String(n).padStart(2, "0");
}
