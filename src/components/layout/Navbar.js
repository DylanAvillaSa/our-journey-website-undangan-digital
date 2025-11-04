"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (
    pathname == "/template/template-1-silver" ||
    pathname == "/template/template-2-silver" ||
    pathname == "/template/template-3-silver" ||
    pathname == "/template/template-4-gold" ||
    pathname == "/template/template-5-gold" ||
    pathname == "/template/template-6-gold" ||
    pathname == "/template/template-8-gold" ||
    pathname == "/template/template-9-gold" ||
    pathname == "/template/template-10-gold" ||
    pathname == "/template/template-11-gold" ||
    pathname == "/template/template-13-platinum" ||
    pathname == "/template/template-14-platinum" ||
    pathname == "/template/template-15-platinum" ||
    pathname == "/template/template-16-platinum"
  ) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-shadow ${
        scrolled ? "shadow-lg bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo/logo-our-journey.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-auto h-auto"
          />
          <span className="font-bold text-xl text-gray-800">Our Journey</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-800 font-semibold">
          <li>
            <a href="#hero" className="hover:text-green-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#fitur" className="hover:text-green-500 transition">
              Fitur
            </a>
          </li>
          <li>
            <a href="#galeri" className="hover:text-green-500 transition">
              Template
            </a>
          </li>
          <li>
            <a href="#paket" className="hover:text-green-500 transition">
              Paket
            </a>
          </li>
          <li>
            <a href="#wa" className="hover:text-green-500 transition">
              Pesan WA
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#wa"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 text-3xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg flex flex-col gap-6 items-center py-6 text-gray-800 font-semibold"
          >
            <li>
              <a href="#hero" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#fitur" onClick={() => setIsOpen(false)}>
                Fitur
              </a>
            </li>
            <li>
              <a href="#galeri" onClick={() => setIsOpen(false)}>
                Template
              </a>
            </li>
            <li>
              <a href="#paket" onClick={() => setIsOpen(false)}>
                Paket
              </a>
            </li>
            <li>
              <a href="#wa" onClick={() => setIsOpen(false)}>
                Pesan WA
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
