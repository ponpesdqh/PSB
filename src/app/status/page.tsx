'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CekStatus() {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsSearching(true);
        setResult(null);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
                alert('API URL belum diatur. Hubungi administrator.');
                return;
            }
            const res = await fetch(`${apiUrl}?action=cekStatus&query=${encodeURIComponent(query.trim())}`);
            const json = await res.json();

            if (json.status === 200 && json.data && json.data.found) {
                const d = json.data;
                const statusColors: Record<string, { color: string; bg: string }> = {
                    'Menunggu': { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                    'Verifikasi Dokumen': { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    'Diterima': { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                    'Ditolak': { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
                };
                const sc = statusColors[d.status] || statusColors['Menunggu'];
                setResult({
                    noDaftar: d.no_daftar,
                    namaPendaftar: d.nama_sensor,
                    jalurPilihan: d.jalur || d.asal_sekolah || '-',
                    statusUtama: d.status,
                    catatan: d.catatan_admin || '',
                    color: sc.color,
                    bg: sc.bg,
                });
            } else {
                alert('Data tidak ditemukan. Pastikan Nomor Pendaftaran / NIK sudah benar.');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan jaringan. Silakan coba lagi.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !result) return;

        setIsUploading(true);
        // Simulate Base64 convertion and POST to GAS
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('Bukti pembayaran berhasil diunggah! Menunggu verifikasi admin.');
            setResult({ ...result, statusUtama: 'Menunggu Verifikasi', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' });
            setFile(null);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Cek Status & Upload Bukti
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Masukkan Nomor Pendaftaran atau NIK Santri.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex glass rounded-2xl p-2 shadow-lg border-emerald-500/20 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow bg-transparent border-0 px-4 py-3 focus:ring-0 text-slate-900 dark:text-white text-lg"
                            placeholder="Contoh: PSB-26-0001 atau 3201..."
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-emerald-500 disabled:opacity-50 transition-colors flex items-center justify-center min-w-[120px]"
                        >
                            {isSearching ? <span className="animate-pulse">Mencari...</span> : 'Cari Data'}
                        </button>
                    </div>
                </form>

                {result && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="glass p-8 rounded-3xl shadow-xl overflow-hidden relative">
                            <div className={`absolute top-0 right-0 left-0 h-2 ${result.bg.split(' ')[0]}`}></div>

                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{result.namaPendaftar}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-mono mb-6">{result.noDaftar} • {result.jalurPilihan}</p>

                            <div className={`p-4 rounded-xl border mb-8 ${result.bg} ${result.color.replace('text-', 'border-').replace('dark:text-', 'dark:border-')}`}>
                                <p className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-1">Status Pendaftaran</p>
                                <p className={`text-2xl font-bold ${result.color}`}>{result.statusUtama}</p>
                            </div>

                            {result.statusUtama === 'Belum Bayar' && (
                                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        Upload Bukti Transfer
                                    </h3>
                                    <form onSubmit={handleUpload} className="space-y-4">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            required
                                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900/30 dark:file:text-emerald-400 dark:hover:file:bg-emerald-900/50 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isUploading || !file}
                                            className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
                                        >
                                            {isUploading ? 'Sedang Mengunggah...' : 'Kirim Bukti'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {result.statusUtama === 'Pembayaran Diterima' && (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 text-center border border-emerald-200 dark:border-emerald-800">
                                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-2">Akses Test Online Terbuka</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Alhamdulillah, pembayaran telah diverifikasi. Santri sudah dapat mengikuti Ujian Seleksi Online (CBT).</p>

                                    <Link
                                        href={`/test?id=${result.noDaftar}`}
                                        className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1"
                                    >
                                        Mulai Test Online
                                    </Link>
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
