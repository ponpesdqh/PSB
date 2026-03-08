import Link from 'next/link';
import { getPublicConfig } from '@/lib/api';

export default async function Pengumuman() {
    const config = await getPublicConfig();
    const schoolName = config?.namaSekolah || "Ma'had Darul Qur'an Wal Hadits OKU Timur";

    const pengumumanDatas = [
        {
            id: 1,
            title: 'Hasil Seleksi Gelombang 1',
            date: '10 Maret 2026',
            content: `Alhamdulillah, ujian seleksi berbasis CBT untuk gelombang 1 telah selesai. Berikut adalah daftar santri yang dinyatakan DITERIMA di ${schoolName}.`,
            link: '#'
        },
        {
            id: 2,
            title: 'Informasi Daftar Ulang & Persiapan Masuk Asrama',
            date: '12 Maret 2026',
            content: 'Bagi santri yang dinyatakan lulus, harap melakukan daftar ulang paling lambat 20 Maret 2026. Persiapkan perlengkapan asrama sesuai dengan panduan.',
            link: '#'
        },
        {
            id: 3,
            title: 'Pembukaan Pendaftaran Gelombang 2',
            date: '15 April 2026',
            content: 'Mengingat kuota yang masih tersedia, panitia akan membuka pendaftaran santri baru Gelombang 2 mulai pertengahan April 2026.',
            link: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Papan Pengumuman
                    </h1>
                    <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mt-6"></div>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Pusat informasi resmi kelulusan dan berita terbaru seputar PSB.
                    </p>
                </div>

                <div className="space-y-6">
                    {pengumumanDatas.map((item) => (
                        <div key={item.id} className="glass p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-l-emerald-500">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">{item.title}</h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 whitespace-nowrap">
                                    {item.date}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {item.content}
                            </p>
                            <Link
                                href={item.link}
                                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-500 transition-colors"
                            >
                                Baca Selengkapnya
                                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
