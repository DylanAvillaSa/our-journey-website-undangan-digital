"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  LayoutDashboard,
  LogOut,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Share2,
} from "lucide-react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/libs/config";

export default function DashboardAdmin() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [pembelian, setPembelian] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadingAction, setLoadingAction] = useState(false);
  const sidebarRef = useRef(null);

  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL)
      return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  };

  const safeMillis = (val) => {
    if (!val) return 0;
    if (typeof val?.toMillis === "function") return val.toMillis();
    if (typeof val === "string") {
      const t = Date.parse(val);
      return Number.isNaN(t) ? 0 : t;
    }
    if (typeof val === "number") return val;
    return 0;
  };

  const isValidCloudinaryUrl = (url) =>
    typeof url === "string" && url.includes("res.cloudinary.com");

  // Proteksi admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/login");
      else setUser(currentUser);
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Realtime listener komentar
  useEffect(() => {
    const q = query(collection(db, "ucapan"), orderBy("nama_lengkap"));
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // Realtime listener pembelian
  useEffect(() => {
    const q = query(collection(db, "pembelian"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const sorted = data.sort((a, b) => {
        const ta =
          safeMillis(a.tanggal_pembelian) ||
          safeMillis(a.createdAt) ||
          safeMillis(a.updated_at);
        const tb =
          safeMillis(b.tanggal_pembelian) ||
          safeMillis(b.createdAt) ||
          safeMillis(b.updated_at);
        return tb - ta;
      });
      setPembelian(sorted);
    });
    return () => unsub();
  }, []);

  // ACC pesanan
  const handleAccPesanan = async (item) => {
    if (!user) return;
    setLoadingAction(true);
    try {
      const link_form = `${getBaseUrl()}/form-pemesanan/${item.id}`;
      await updateDoc(doc(db, "pembelian", item.id), {
        notif_seen: false,
        status: "menunggu_pembayaran",
        status_pembayaran: "menunggu pembayaran",
        link_form,
        verifiedAt: new Date().toISOString(),
        verifiedBy: user.email,
        updated_at: new Date().toISOString(),
      });
      alert(
        "✅ Pesanan berhasil di-ACC, user bisa mengupload bukti pembayaran."
      );
    } catch (err) {
      console.error(err);
      alert("❌ Gagal ACC pesanan.");
    }
    setLoadingAction(false);
  };

  // ACC pembayaran
  const handleAccPembayaran = async (item) => {
    if (!user) return;

    if (!item.bukti_transfer || !isValidCloudinaryUrl(item.bukti_transfer)) {
      alert("❌ Bukti transfer belum valid / belum tersedia.");
      return;
    }

    if (!confirm("Yakin ingin ACC pembayaran ini?")) return;

    setLoadingAction(true);
    try {
      const docRef = doc(db, "pembelian", item.id);
      const link_template =
        item.link_template || `${getBaseUrl()}/form-pemesanan/${item.id}`;

      await updateDoc(docRef, {
        status: "aktif",
        status_pembayaran: "lunas",
        notif_seen: false,
        verifiedAt: new Date().toISOString(),
        verifiedBy: user.email,
        updated_at: new Date().toISOString(),
      });

      // Kirim email (opsional)
      try {
        await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: item.email,
            subject: "🎉 Undangan Kamu Sudah Aktif!",
            text: `Halo ${item.nama_user}, undangan kamu sudah aktif! Link: ${link_template}`,
            html: `<div style="padding:20px;background:#f9f9f9;">
              <h2 style="color:#16a34a;">🎉 Undangan Kamu Sudah Aktif!</h2>
              <p>Halo <strong>${item.nama_user}</strong>,</p>
              <p>Undangan kamu sudah aktif. Klik tombol di bawah untuk melihat undanganmu:</p>
              <p><a href="${link_template}" style="background:#16a34a;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;">Lihat Undangan</a></p>
            </div>`,
          }),
        });
      } catch (err) {
        console.error("Gagal kirim email:", err);
      }

      alert("✅ Pembayaran diverifikasi, undangan aktif & bisa di-share.");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal ACC pembayaran.");
    }
    setLoadingAction(false);
  };

  // Tolak pesanan/pembayaran
  const handleTolak = async (item) => {
    if (!user) return;
    const alasan = prompt("Masukkan alasan penolakan:");
    if (alasan === null) return;

    try {
      await updateDoc(doc(db, "pembelian", item.id), {
        status: "ditolak",
        rejectedAt: new Date().toISOString(),
        rejectedBy: user.email,
        alasan_penolakan: alasan || "Tanpa alasan",
        updated_at: new Date().toISOString(),
      });
      alert("❌ Pesanan/Pembayaran ditolak.");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menolak pesanan.");
    }
  };

  // Delete template manual
  const handleDeleteTemplate = async (item) => {
    if (!confirm("Yakin ingin menghapus template ini?")) return;

    try {
      await deleteDoc(doc(db, "pembelian", item.id));
      alert("✅ Template berhasil dihapus.");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menghapus template.");
    }
  };

  // Filter + search
  const filteredPembelian = pembelian.filter((p) => {
    const matchStatus =
      filterStatus === "all" ? true : p.status === filterStatus;
    const matchSearch =
      p.nama_user.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.template.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-8 text-center">
            Admin Panel
          </h1>
          <nav className="flex flex-col gap-4">
            <button className="flex items-center gap-3 text-gray-700 hover:bg-green-100 p-2 rounded-lg transition">
              <LayoutDashboard size={20} /> Dashboard
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard Admin</h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, template..."
            className="border rounded-lg p-2 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="menunggu_verifikasi">Menunggu ACC Pesanan</option>
            <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
            <option value="aktif">Aktif</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>

        {/* Statistik */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Total Komentar</h3>
            <p className="text-3xl font-bold mt-2">{comments.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Total Pembelian</h3>
            <p className="text-3xl font-bold mt-2">{pembelian.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500">Menunggu Pembayaran</h3>
            <p className="text-3xl font-bold mt-2">
              {
                pembelian.filter((p) => p.status === "menunggu_pembayaran")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Daftar Pembelian */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Daftar Pembelian User</h3>
          {filteredPembelian.length === 0 ? (
            <p className="text-gray-500 text-center">Belum ada pembelian.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3 border">Nama</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Paket</th>
                    <th className="p-3 border">Template</th>
                    <th className="p-3 border">Tanggal</th>
                    <th className="p-3 border">Bukti</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPembelian.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 border">{item.nama_user}</td>
                      <td className="p-3 border">{item.email}</td>
                      <td className="p-3 border">{item.paket}</td>
                      <td className="p-3 border">{item.template}</td>
                      <td className="p-3 border">
                        {item.tanggal_pembelian
                          ? new Date(
                              safeMillis(item.tanggal_pembelian)
                            ).toLocaleDateString("id-ID")
                          : item.createdAt
                          ? new Date(
                              safeMillis(item.createdAt)
                            ).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td className="p-3 border text-center">
                        {item.bukti_transfer ? (
                          <a
                            href={item.bukti_transfer}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center justify-center gap-1"
                          >
                            <Eye size={16} /> Lihat
                          </a>
                        ) : (
                          <span className="text-gray-400">Belum upload</span>
                        )}
                      </td>
                      <td className="p-3 border text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div>
                            {item.status === "aktif" && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                Aktif
                              </span>
                            )}
                            {item.status === "menunggu_verifikasi" && (
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                                Menunggu ACC Pesanan
                              </span>
                            )}
                            {item.status === "menunggu_pembayaran" && (
                              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                                Menunggu Pembayaran
                              </span>
                            )}
                            {item.status === "ditolak" && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                Ditolak
                              </span>
                            )}
                          </div>
                          <div>
                            {item.status_pembayaran === "lunas" ? (
                              <span className="text-xs text-green-700">
                                Lunas
                              </span>
                            ) : item.status_pembayaran ? (
                              <span className="text-xs text-orange-700">
                                {item.status_pembayaran}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 border text-center">
                        {/* Aksi */}
                        {item.status === "menunggu_verifikasi" && (
                          <div className="flex gap-2 justify-center">
                            <button
                              disabled={loadingAction}
                              onClick={() => handleAccPesanan(item)}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 flex items-center gap-1"
                            >
                              <CheckCircle size={16} /> ACC Pesanan
                            </button>
                            <button
                              disabled={loadingAction}
                              onClick={() => handleTolak(item)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 flex items-center gap-1"
                            >
                              <XCircle size={16} /> Tolak
                            </button>
                          </div>
                        )}

                        {item.status === "menunggu_pembayaran" &&
                          item.bukti_transfer && (
                            <div className="flex flex-col gap-2 items-center">
                              <button
                                disabled={loadingAction}
                                onClick={() => handleAccPembayaran(item)}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 flex items-center gap-1"
                              >
                                <CheckCircle size={16} /> ACC Pembayaran
                              </button>
                              <button
                                disabled={loadingAction}
                                onClick={() => handleTolak(item)}
                                className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 flex items-center gap-1"
                              >
                                <XCircle size={16} /> Tolak
                              </button>
                            </div>
                          )}

                        {item.status === "aktif" && (
                          <div className="flex flex-col gap-2 items-center">
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `Halo ${item.nama_user}, undangan kamu sudah aktif! Link: ${item.link_template}`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 flex items-center gap-1"
                            >
                              <Share2 size={16} /> Share WA
                            </a>
                            <a
                              href={item.link_template}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline text-sm"
                            >
                              Lihat Undangan
                            </a>
                            <button
                              onClick={() => handleDeleteTemplate(item)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 flex items-center gap-1 mt-1"
                            >
                              <Trash2 size={16} /> Delete Template
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
