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

      {/* Program Pendidikan */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Program Pendidikan</h2>
            <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Kurikulum terpadu antara ilmu agama (Dirosah Islamiyah) dan ilmu umum yang disesuaikan dengan standar nasional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { level: "SD Islam (Mibtada')", desc: "Pendidikan dasar dengan fokus tahsin dan tahfidz juz 30.", icon: "📚" },
              { level: "SMP Islam (Mutawasitah)", desc: "Pematangan bahasa Arab dasar dan pengenalan kitab Turats.", icon: "🕌" },
              { level: "SMA Islam (Tsanawiyah)", desc: "Pendalaman kitab-kitab ulama salaf dan persiapan mandiri.", icon: "🎓" },
            ].map((prog, i) => (
              <div key={i} className="glass p-8 rounded-3xl card-hover border-t-4 border-t-emerald-500 group">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{prog.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{prog.level}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi Highlight */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Kenapa Memilih Kami?</h2>
              <div className="space-y-6">
                {[
                  { title: "Manhaj Salaf", desc: "Berakidah sesuai pemahaman para sahabat riḍwānullāhi ‘alaihim." },
                  { title: "Pengajar Kompeten", desc: "Lulusan Universitas Islam Madinah, LIPIA, dan timur tengah lainnya." },
                  { title: "Bahasa Arab Aktif", desc: "Lingkungan berbahasa Arab untuk membiasakan santri." },
                  { title: "Fasilitas Memadai", desc: "Asrama yang nyaman dan kelas yang representatif untuk belajar." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
                  {/* Placeholder for real ponpes image */}
                  <span className="text-slate-400">Gambar Area Ponpes</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl border-emerald-500/20 w-48">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">500+</div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Santri Aktif & Alumni</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pendaftaran Gelombang 1 Dibuka</h2>
          <p className="text-emerald-100 text-lg mb-10">Jangan lewatkan kesempatan untuk bergabung bersama keluarga besar Ma'had Salaf As-Sunnah. Kuota terbatas!</p>
          <Link
            href="/pendaftaran"
            className="inline-block px-10 py-4 rounded-xl bg-white text-emerald-700 font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Mulai Mendaftar Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
