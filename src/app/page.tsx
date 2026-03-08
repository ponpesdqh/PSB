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

      {/* Overview Ponpes */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Program Pendidikan Ponpes DQH OKUT</h2>
            <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg leading-relaxed">
              Bismillah. Pendaftaran Pondok Pesantren Darul-Qur'an Wal-Hadits (DQH) OKU Timur meliputi 6 jenjang pendidikan: PAUD, SD, Mutawassithah (SMP), I'dad Lughawi (IL), Tsanawiyah (SMA), dan Ma'had 'Ali (S1).<br /><br />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Seluruh jenjang (terutama tingkat menengah ke atas) ditargetkan insyaallah akan menguasai bahasa Arab aktif dan pasif dalam 3 bulan.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Tabel Program (Responsive Grid) */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="overflow-x-auto rounded-3xl shadow-xl mb-16">
            <table className="min-w-full text-sm text-left bg-white dark:bg-slate-800">
              <thead className="bg-emerald-600 text-white font-bold text-center">
                <tr>
                  <th className="px-4 py-4 border-r border-emerald-500/30">JENJANG PENDIDIKAN</th>
                  <th className="px-2 py-4 border-r border-emerald-500/30">FOKUS UTAMA / LAMA BELAJAR</th>
                  <th className="px-2 py-4 border-r border-emerald-500/30">TARGET UMUM</th>
                  <th className="px-2 py-4 border-r border-emerald-500/30">HAFALAN (AL-QURAN & HADITS)</th>
                  <th className="px-2 py-4">KETERANGAN / BEASISWA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">

                {/* 1. PAUD */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-pink-700 dark:text-pink-400 border-r border-slate-100 dark:border-slate-700">1. PAUD Islam</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Pendidikan Anak Usia Dini</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Pengenalan Adab Dasar Islami</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Doa Harian & Surah Pendek</td>
                  <td className="px-2 py-4 text-center text-slate-500">Membentuk pondasi Akhlak</td>
                </tr>

                {/* 2. SD */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors bg-slate-50/50 dark:bg-slate-800/50">
                  <td className="px-4 py-4 font-bold text-orange-700 dark:text-orange-400 border-r border-slate-100 dark:border-slate-700">2. SD Islam (Miftahul Khoir)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">6 tahun</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Kejar Paket A, Tajwid, Life Skill</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">5 juz & 100 Hadits</td>
                  <td className="px-2 py-4 text-center text-slate-500">Seluruh fasilitas milik sendiri</td>
                </tr>

                {/* 3. MTW */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-emerald-700 dark:text-emerald-400 border-r border-slate-100 dark:border-slate-700">3. MTW (Mutawassithah / Setara SMP)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">3 tahun</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Paket B & Standar Madinah Univ.</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">2,5 juz/tahun & 450 Hadits</td>
                  <td className="px-2 py-4 text-center text-emerald-600 font-semibold">Berbeasiswa</td>
                </tr>

                {/* 4. IL */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors bg-slate-50/50 dark:bg-slate-800/50">
                  <td className="px-4 py-4 font-bold text-teal-700 dark:text-teal-400 border-r border-slate-100 dark:border-slate-700">4. IL (Al-I'dad Al-Lughawi / Pra-TSN)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">1 tahun (Fokus Bahasa)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Persiapan intensif keislaman dasar</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">1 juz/tahun & 100 Hadits</td>
                  <td className="px-2 py-4 text-center text-emerald-600 font-semibold">Berbeasiswa bagi yg ingin pengabdi</td>
                </tr>

                {/* 5. TSN */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-blue-700 dark:text-blue-400 border-r border-slate-100 dark:border-slate-700">5. TSN (Ats-Tsanawiyah / Setara SMA)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">3 tahun</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Formal, ILD, atau Tahfidzh (Paket C)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Terbanyak hingga 750 Hadits</td>
                  <td className="px-2 py-4 text-center text-slate-500">Sesuai jurusan spesifik</td>
                </tr>

                {/* 6. MAL */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors bg-slate-50/50 dark:bg-slate-800/50">
                  <td className="px-4 py-4 font-bold text-rose-700 dark:text-rose-400 border-r border-slate-100 dark:border-slate-700">6. MAL (Ma'had 'Ali / Setara S1 S.Pd)</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">4 tahun</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">Kurikulum Ma'had 'Ali & Kuliah S.Pd</td>
                  <td className="px-2 py-4 text-center border-r border-slate-100 dark:border-slate-700">2,5 juz/tahun & 450 Hadits</td>
                  <td className="px-2 py-4 text-center text-emerald-600 font-semibold">Berbeasiswa</td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ekstrakurikuler */}
            <div className="glass p-8 rounded-3xl border-l-4 border-l-amber-500 shadow-xl bg-white dark:bg-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 text-xl">🛠️</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ekstrakurikuler Pilihan</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Santri dan santriwati dapat bebas memilih ekstrakurikuler guna membekali diri dengan soft-skill maupun hard-skill:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Industri Kimia (Sabun/Deterjen)', 'Komputer', 'Tata Boga', 'Beladiri Karate', 'Pertukangan & Perbengkelan', 'Tata Rias', 'Gardening', 'Tata Busana'].map((eks, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold border border-amber-200 dark:border-slate-600">{eks}</span>
                ))}
              </div>
            </div>

            {/* Binaan & Alumni */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-3xl border-l-4 border-l-blue-500 shadow-xl bg-white dark:bg-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Binaan Ponpes DQH OKUT</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ponpes tahfidz putri UBK Prabumulih, 9 Rumah Tahfidzh, serta konsultan pendidikan di berbagai daerah.
                </p>
              </div>
              <div className="glass p-6 rounded-3xl border-l-4 border-l-emerald-500 shadow-xl bg-white dark:bg-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pegawai & Alumni Tersebar</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Pendidikan:</strong> Univ. Islam Madinah (KSA), LIPIA (Jakarta), STDI Imam Syafii, dll.<br />
                  <strong>Mengajar di:</strong> Berbagai instansi di Kalsel, Jogja, Riau, Sumsel, dll.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pendaftaran Santri Baru Dibuka!</h2>
          <p className="text-emerald-100 text-lg mb-10">Jangan lewatkan kesempatan untuk bergabung bersama keluarga besar Pondok Pesantren DQH OKU Timur.</p>
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
