'use client';

import { useState } from 'react';

export default function Pendaftaran() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        namaLengkap: '',
        nik: '',
        jenisKelamin: '',
        tanggalLahir: '',
        alamat: '',
        namaWali: '',
        noWa: '',
        jenjang: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API request to GAS backend
        try {
            console.log('Submitting to Apps Script API:', formData);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Fake network delay
            alert('Pendaftaran Berhasil Dikirim! Nomor Pendaftaran Anda: PSB-26-0001');
            // In real scenario:
            // const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '?action=submitPendaftaran', {
            //   method: 'POST', body: JSON.stringify(formData)
            // });
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Formulir Pendaftaran Santri Baru
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Tahun Ajaran 2026/2027 Ma'had Salaf As-Sunnah
                    </p>
                </div>

                {/* Stepper */}
                <div className="mb-8 flex justify-center items-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold border-2 
                  ${step >= i ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white text-slate-400 border-slate-300 dark:bg-slate-800 dark:border-slate-700'}`}
                            >
                                {i}
                            </div>
                            {i < 3 && (
                                <div className={`w-16 h-1 mx-2 rounded-full ${step > i ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl shadow-xl border-emerald-500/10">

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Informasi Pribadi</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Santri</label>
                                    <input required name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Cth: Ahmad Abdullah" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NIK (Nomor Induk Kependudukan)</label>
                                        <input required name="nik" value={formData.nik} onChange={handleChange} type="number" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="16 Digit NIK" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin</label>
                                        <select required name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-laki (Banin)">Laki-laki (Banin)</option>
                                            <option value="Perempuan (Banat)">Perempuan (Banat)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal Lahir</label>
                                    <input required name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Alamat & Orang Tua</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Ayah / Wali</label>
                                    <input required name="namaWali" value={formData.namaWali} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Nama Lengkap Ayah/Wali" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nomor WhatsApp Aktif</label>
                                    <input required name="noWa" value={formData.noWa} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Cth: 081234567890" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alamat Domisili</label>
                                    <textarea required name="alamat" value={formData.alamat} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Jalan, RT/RW, Desa, Kecamatan, Kota/Kabupaten"></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Pilihan Pendidikan</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Pilih Jenjang Sekolah</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['SD', 'SMP', 'SMA'].map((j) => (
                                            <label key={j} className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 text-center flex flex-col items-center gap-2 ${formData.jenjang === j ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md' : 'border-slate-200 hover:border-emerald-300 dark:border-slate-700'}`}>
                                                <input type="radio" name="jenjang" value={j} checked={formData.jenjang === j} onChange={handleChange} className="sr-only" />
                                                <span className="text-3xl">{j === 'SD' ? '📚' : j === 'SMP' ? '🕌' : '🎓'}</span>
                                                <span className="font-bold text-slate-800 dark:text-slate-200">{j} Islam</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 mt-6 text-sm flex gap-3">
                                    <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <p>Dengan menekan tombol <strong>Kirim Pendaftaran</strong>, Anda menyatakan bahwa data yang diisi telah benar dan menyetujui aturan tata tertib pondok pesantren sesuai Manhaj Salaf.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex justify-between">
                        {step > 1 ? (
                            <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-medium transition-colors">
                                Kembali
                            </button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <button type="button" onClick={nextStep} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20">
                                Selanjutnya
                            </button>
                        ) : (
                            <button type="submit" disabled={isSubmitting || !formData.jenjang} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]">
                                {isSubmitting ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : 'Kirim Pendaftaran'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
