"use client";

import React, { useState } from "react";

const packages = [
  {
    name: "Silver",
    price: { original: "Rp 70.000", promo: "Rp 49.000" },
    features: [
      "Semua fitur Bronze",
      "Tampilan lebih elegan",
      "Jumlah undangan unlimited",
      "Photo Slider (4)",
      "Ucapan dan Doa",
      "Photo Gallery (4)",
      "Template (2)",
      "Countdown",
      "Amplop Digital",
      "Musik",
    ],
    color: "border-gray-400 text-gray-700",
    bg: "bg-gray-50",
  },
  {
    name: "Gold",
    price: { original: "Rp 150.000", promo: "Rp 99.000" },
    features: [
      "Semua fitur Silver",
      "Video",
      "Love Story",
      "Story Instagram",
      "Photo Slider (2)",
      "Custom Tema",
      "Variasi warna (3)",
      "Photo Gallery (8)",
      "Link Streaming",
    ],
    color: "border-yellow-500 text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    name: "Platinum",
    price: { original: "Rp 200.000", promo: "Rp 159.000" },
    features: [
      "Semua fitur Gold",
      "Custom Tema",
      "Desain eksklusif",
      "Ucapan Melalui Video",
    ],
    color: "border-rose-500 text-rose-700",
    bg: "bg-rose-50",
  },
];

const FormPemesanan = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPackage) {
      alert("Pilih paket terlebih dahulu!");
      return;
    }

    const adminNumber = "6285351873440";

    // Format pesan WhatsApp
    const message = `
*💌 Pemesanan Undangan Website (${selectedPackage.name} Package)*

📦 *Paket:* ${selectedPackage.name}
💰 *Harga:* ${selectedPackage.price.promo} (dari ${
      selectedPackage.price.original
    })

👰 *Mempelai Wanita*
- Nama Panggilan: ${formData.panggilanWanita || "-"}
- Nama Lengkap: ${formData.namaLengkapWanita || "-"}

🤵 *Mempelai Pria*
- Nama Panggilan: ${formData.panggilanPria || "-"}
- Nama Lengkap: ${formData.namaLengkapPria || "-"}

📆 *Tanggal Akad:* ${formData.akadTanggal || "-"}
💍 *Tanggal Resepsi:* ${formData.resepsiTanggal || "-"}

📍 *Alamat:*
${formData.alamat || "-"}

🌐 *Link Maps:* ${formData.linkMaps || "-"}

🖼 *Gallery:* ${formData.gallery || "-"}

${
  selectedPackage.features.includes("Love Story")
    ? `❣ *Love Story:*\n${formData.loveStory || "-"}\n`
    : ""
}

${
  selectedPackage.features.includes("Amplop Digital")
    ? `💰 *Amplop Digital:*
Rekening: ${formData.rekening || "-"}
E-Wallet: ${formData.dompetDigital || "-"}\n`
    : ""
}

${
  selectedPackage.features.includes("Musik")
    ? `🎵 *Backsound Musik:* ${formData.backsound || "-"}\n`
    : ""
}

${
  selectedPackage.features.includes("Link Streaming")
    ? `📹 *Live Streaming:* ${formData.streaming || "-"}\n`
    : ""
}

${
  selectedPackage.features.includes("Custom Tema")
    ? `🎨 *Custom Tema:* ${formData.tema || "-"}\n`
    : ""
}

📧 *Email:* ${formData.email || "-"}
`;

    const encodedMessage = encodeURIComponent(message.trim());
    const waLink = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          💌 Form Order Undangan Website
        </h1>

        {/* Pilihan Paket */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg)}
              className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all hover:scale-105 ${
                selectedPackage?.name === pkg.name
                  ? `${pkg.bg} ${pkg.color} border-4`
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-lg font-bold">{pkg.name}</h3>
              <div className="mt-2">
                <p className="text-gray-500 text-sm line-through">
                  {pkg.price.original}
                </p>
                <p className="text-lg font-bold text-green-700">
                  {pkg.price.promo}
                </p>
              </div>
              <div className="mt-3">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  🔥 Promo Spesial
                </span>
              </div>
            </div>
          ))}
        </div>

        {!selectedPackage ? (
          <p className="text-center text-gray-600">
            Pilih paket terlebih dahulu untuk menampilkan form.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              📋 Data Pemesan ({selectedPackage.name} Package)
            </h2>

            {/* Data Mempelai */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="panggilanWanita"
                placeholder="Nama Panggilan Mempelai Wanita"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                name="namaLengkapWanita"
                placeholder="Nama Lengkap Mempelai Wanita"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                name="panggilanPria"
                placeholder="Nama Panggilan Mempelai Pria"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                name="namaLengkapPria"
                placeholder="Nama Lengkap Mempelai Pria"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
            </div>

            {/* Tanggal & Lokasi */}
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                📅 Tanggal & Lokasi Acara
              </h2>
              <input
                name="akadTanggal"
                placeholder="Tanggal Akad (contoh: Kamis, 23 Oktober 2025)"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-3"
                required
              />
              <input
                name="resepsiTanggal"
                placeholder="Tanggal Resepsi (contoh: Minggu, 26 Oktober 2025)"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-3"
                required
              />
              <textarea
                name="alamat"
                placeholder="Alamat Lengkap Lokasi Acara"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
                rows={3}
              />
              <input
                name="linkMaps"
                placeholder="Link Google Maps Lokasi"
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mt-3"
                required
              />
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                🖼 Gallery Foto
              </h2>
              <input
                name="gallery"
                placeholder={`Link Google Drive (${
                  selectedPackage.name === "Silver"
                    ? "4 foto"
                    : selectedPackage.name === "Gold"
                    ? "8 foto"
                    : "12"
                })`}
                required
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
            </div>

            {/* Love Story */}
            {selectedPackage.features.includes("Love Story") && (
              <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                  ❣ Love Story
                </h2>
                <textarea
                  name="loveStory"
                  placeholder="Ceritakan perjalanan cinta kalian..."
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg w-full"
                  rows={6}
                />
              </div>
            )}

            {/* Amplop Digital */}
            {selectedPackage.features.includes("Amplop Digital") && (
              <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                  💰 Amplop Digital
                </h2>
                <input
                  name="rekening"
                  placeholder="Nomor Rekening (BRI, BCA, dll)"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg w-full mb-3"
                />
                <input
                  name="dompetDigital"
                  placeholder="Dompet Digital (OVO, DANA, Shopeepay)"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg w-full"
                />
              </div>
            )}

            {/* Musik */}
            {selectedPackage.features.includes("Musik") && (
              <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                  🎵 Backsound Musik
                </h2>
                <input
                  name="backsound"
                  placeholder="Link YouTube Musik"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg w-full"
                />
              </div>
            )}

            {/* Streaming */}
            {selectedPackage.features.includes("Link Streaming") && (
              <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                  📹 Link Streaming
                </h2>
                <input
                  name="streaming"
                  placeholder="Link Live Streaming (IG/YouTube)"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg w-full"
                />
              </div>
            )}

            {/* Custom Tema */}
            {selectedPackage.features.includes("Custom Tema") && (
              <div>
                <h2 className="text-2xl font-semibold text-green-700 mb-4">
                  🎨 Custom Tema
                </h2>
                <textarea
                  name="tema"
                  placeholder="Jelaskan warna, gaya, atau tema yang kamu inginkan..."
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg w-full"
                  rows={3}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                📧 Kontak Pengirim
              </h2>
              <input
                name="email"
                type="email"
                placeholder="Email Pengirim"
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300"
              >
                Kirim Pemesanan via WhatsApp 📲
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormPemesanan;
