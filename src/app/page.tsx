import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-32">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1598460613840-7abac7509d78?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center text-left">
          <div className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-semibold mb-6 tracking-wide">
            Penerimaan Santri Baru 2026/2027
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
            Membangun Generasi Rabbani di Atas Manhaj <span className="text-emerald-400">Salafus Shalih</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Pondok Pesantren As-Sunnah berkomitmen mencetak santri yang berakidah lurus, berakhlak mulia, dan unggul dalam ilmu syar'i maupun umum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pendaftaran"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:-translate-y-1 text-center"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/status"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold text-lg transition-all duration-300 text-center"
            >
              Cek Status Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      {/* Muqaddimah & Overview */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Kenapa Memilih SD Islam Miftahul Khoir?</h2>
            <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg leading-relaxed">
              Zaman sudah mulai berubah, lingkungan yang buruk, teman bermain dan wawasan negatif sangat berpengaruh terhadap perkembangan anak. Yayasan Kunci Kebaikan OKU Timur mendirikan SD Islam Miftahul Khoir untuk mencetak generasi muslim yang berilmu, taat beribadah dan bermanfaat. <br /><br />
              <span className="font-semibold italic">"Jangan salah memilih sekolah!"</span>
            </p>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Target Kelulusan */}
            <div className="glass p-8 rounded-3xl border-t-4 border-t-emerald-500 shadow-xl bg-white dark:bg-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl">🎯</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Target Kelulusan</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Mampu menghafal dalil-dalil dasar agama Islam.</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Mampu membaca Al-Quran dengan baik dan benar (Tajwid).</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Hafal minimal 5 juz Al-Quran.</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Hafal minimal 100 hadits pendek beserta maknanya.</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Mengamalkan doa-doa harian.</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Rajin shalat 5 waktu (di masjid untuk laki-laki).</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Gemar membaca.</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Lulus Asesmen Nasional standar Dinas Pendidikan.</li>
                <li className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Menguasai life skill dasar.</li>
              </ul>
            </div>

            {/* Materi Pelajaran & Syarat */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-3xl border-l-4 border-l-amber-500 shadow-xl bg-white dark:bg-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 text-xl">📚</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Materi Pelajaran</h3>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 space-y-4">
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Umum:</strong><br />
                    Kejar Paket A sesuai standar Dinas Pendidikan & Kebudayaan.
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Diniyah:</strong><br />
                    Aqidah Akhlak, Fiqh Ibadah, Adab Islami, Tajwid, Kisah/Sirah, Bahasa Arab, BTA, Hafalan Quran, Hafalan Doa & Hadits.
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl border-l-4 border-l-blue-500 shadow-xl bg-white dark:bg-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Waktu & Tempat Pendaftaran</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-1">⏰ Jam 07.00 s.d 11.00</strong>
                  Senin s.d Jumat di Kantor Ponpes Darul-Qur'an Wal-Hadits OKU Timur.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500">
                    Syarat pendaftaran minimal 6 tahun (per Juli), fotokopi KTP/KK/Akte (masing-masing 3 lembar), pas foto 3x4 (4 lembar), biaya pendaftaran Rp. 100.000 (Gratis bagi tidak mampu).
                  </p>
                </div>
              </div>
            </div>

            {/* Fasilitas */}
            <div className="glass p-8 rounded-3xl border-t-4 border-t-emerald-500 shadow-xl bg-emerald-50 dark:bg-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-2xl">🕌</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Fasilitas Ponpes</h3>
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-400 font-semibold mb-3">Seluruh Gedung Milik Sendiri</p>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2"><span>1.</span> Masjid</li>
                <li className="flex gap-2"><span>2.</span> Mushalla Akhwat</li>
                <li className="flex gap-2"><span>3.</span> Asrama</li>
                <li className="flex gap-2"><span>4.</span> Kelas</li>
                <li className="flex gap-2"><span>5.</span> Perpustakaan</li>
                <li className="flex gap-2"><span>6.</span> Kantor</li>
                <li className="flex gap-2"><span>7.</span> Mini Market (ABA)</li>
                <li className="flex gap-2"><span>8.</span> Kamar Mandi/WC</li>
                <li className="flex gap-2"><span>9.</span> Taman Bermain</li>
                <li className="flex gap-2"><span>10.</span> Lahan Perkebunan</li>
                <li className="flex gap-2"><span>11.</span> Lab Komputer</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pendaftaran SD Islam Miftahul Khoir</h2>
          <p className="text-emerald-100 text-lg mb-10">Jangan lewatkan kesempatan untuk bergabung mencetak generasi muslim yang berilmu dan bermanfaat.</p>
          <Link
            href="/pendaftaran"
            className="inline-block px-10 py-4 rounded-xl bg-white text-emerald-700 font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Mulai Daftar Online Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
