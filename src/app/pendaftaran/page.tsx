'use client';

import { useState, useEffect } from 'react';
import { getPublicConfig, PublicData, JenjangItem } from '@/lib/api';

export default function Pendaftaran() {
    const [config, setConfig] = useState<PublicData | null>(null);
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Data Santri
        jenjang: '',
        nama_lengkap: '',
        nik: '',
        nisn: '',
        tempat_lahir: '',
        tgl_lahir: '',
        jenis_kelamin: '',
        asal_sekolah: '',
        // Data Wali
        nama_ayah: '',
        nik_ayah: '',
        no_hp_ayah: '',
        nama_ibu: '',
        nik_ibu: '',
        no_hp_ibu: '',
        no_kk: '',
        alamat: '',
        no_wa: '', // Backup utama
    });

    useEffect(() => {
        const fetchConfig = async () => {
            const data = await getPublicConfig();
            if (data) setConfig(data);
            setIsLoadingConfig(false);
        };
        fetchConfig();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // RED-1 FIX: Simplified — both branches were identical
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare payload
            const payload = {
                action: 'submitPendaftaran',
                jenjang_dipilih: formData.jenjang,
                nama_lengkap: formData.nama_lengkap,
                nik: formData.nik,
                nisn: formData.nisn,
                tempat_lahir: formData.tempat_lahir,
                tgl_lahir: formData.tgl_lahir,
                jenis_kelamin: formData.jenis_kelamin,
                asal_sekolah: (formData.jenjang === 'PAUD' || formData.jenjang === 'SD') ? '' : formData.asal_sekolah,
                nama_ayah: formData.nama_ayah,
                nik_ayah: formData.nik_ayah,
                no_hp_ayah: formData.no_hp_ayah,
                nama_ibu: formData.nama_ibu,
                nik_ibu: formData.nik_ibu,
                no_hp_ibu: formData.no_hp_ibu,
                no_kk: formData.no_kk,
                alamat: formData.alamat,
                no_wa: formData.no_hp_ayah || formData.no_hp_ibu || formData.no_wa, // Gunakan no HP Ayah/Ibu sbg no WA utama jika no_wa kosong
            };

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL || '', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.status === 200 && result.data.success) {
                alert(`Pendaftaran Berhasil Dikirim!\nNomor Pendaftaran Anda: ${result.data.noDaftar}`);
                window.location.reload();
            } else {
                alert(result.data.error || result.message || 'Terjadi kesalahan saat mengirim pendaftaran.');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan jaringan/sistem. Pastikan URL API sudah disetel dengan benar.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showAsalSekolah = formData.jenjang && formData.jenjang !== 'PAUD' && formData.jenjang !== 'SD';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Formulir Pendaftaran Santri Baru
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Tahun Ajaran {config?.tahunAjaran || '2026/2027'} {config?.namaSekolah || 'Pondok Pesantren'}
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
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Tahap 1: Data Santri</h2>
                            <div className="space-y-6">

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Pilih Jenjang Sekolah <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {isLoadingConfig ? (
                                            <div className="col-span-full text-center py-4 text-slate-500">Memuat opsi jenjang...</div>
                                        ) : config?.jenjangList && config.jenjangList.length > 0 ? (
                                            config.jenjangList.map((j: JenjangItem) => (
                                                <label key={j.base} className={`cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 text-center flex flex-col items-center gap-1 ${formData.jenjang === j.base ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40 shadow-md' : 'border-slate-200 hover:border-emerald-300 dark:border-slate-700'}`}>
                                                    <input required type="radio" name="jenjang" value={j.base} checked={formData.jenjang === j.base} onChange={handleChange} className="sr-only" />
                                                    <span className="text-2xl">🏫</span>
                                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{j.base}</span>
                                                    <span className="text-xs text-slate-500">{j.label}</span>
                                                </label>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-4 text-red-500">Gagal memuat jenjang. Silakan refresh.</div>
                                        )}
                                    </div>
                                </div>

                                <hr className="border-slate-200 dark:border-slate-800" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Santri <span className="text-red-500">*</span></label>
                                        <input required name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors uppercase" placeholder="Sesuai Akta Kelahiran/Ijazah" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NIK Santri <span className="text-red-500">*</span></label>
                                        <input required name="nik" value={formData.nik} onChange={handleChange} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={16} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="16 Digit NIK di KK" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NISN (Opsional)</label>
                                        <input name="nisn" value={formData.nisn} onChange={handleChange} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={10} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" placeholder="Kosongkan jika tidak ada" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tempat Lahir <span className="text-red-500">*</span></label>
                                        <input required name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors uppercase" placeholder="Kota/Kabupaten Lahir" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
                                        <input required name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                                        <select required name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                                            <option value="">-- Pilih Jenis Kelamin --</option>
                                            <option value="Laki-laki">Laki-laki (Banin)</option>
                                            <option value="Perempuan">Perempuan (Banat)</option>
                                        </select>
                                    </div>

                                    {showAsalSekolah && (
                                        <div className="animate-in fade-in slide-in-from-top-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Asal Sekolah <span className="text-red-500">*</span></label>
                                            <input required name="asal_sekolah" value={formData.asal_sekolah} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors uppercase" placeholder="Nama Sekolah Sebelumnya" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Tahap 2: Data Orang Tua / Wali</h2>
                            <div className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                    <div className="md:col-span-2">
                                        <h3 className="font-bold text-blue-800 dark:text-blue-300">Data Ayah</h3>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Ayah (Sesuai KK) <span className="text-red-500">*</span></label>
                                        <input required name="nama_ayah" value={formData.nama_ayah} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-white/80 bg-white/80 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase" placeholder="Nama Ayah Lengkap" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NIK Ayah <span className="text-red-500">*</span></label>
                                        <input required name="nik_ayah" value={formData.nik_ayah} onChange={handleChange} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={16} className="w-full px-4 py-3 rounded-xl border-white/80 bg-white/80 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="16 Digit NIK Ayah" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">No HP / WhatsApp Ayah <span className="text-red-500">*</span></label>
                                        <input required name="no_hp_ayah" value={formData.no_hp_ayah} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border-white/80 bg-white/80 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Cth: 0812..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                                    <div className="md:col-span-2">
                                        <h3 className="font-bold text-rose-800 dark:text-rose-300">Data Ibu</h3>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Ibu (Sesuai KK) <span className="text-red-500">*</span></label>
                                        <input required name="nama_ibu" value={formData.nama_ibu} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border-white/80 bg-white/80 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase" placeholder="Nama Ibu Lengkap" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NIK Ibu <span className="text-red-500">*</span></label>
                                        <input required name="nik_ibu" value={formData.nik_ibu} onChange={handleChange} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={16} className="w-full px-4 py-3 rounded-xl border-white/80 bg-white/80 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="16 Digit NIK Ibu" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">No HP / WhatsApp Ibu <span className="text-red-500">*</span></label>
                                        <input required name="no_hp_ibu" value={formData.no_hp_ibu} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border-white/80 bg-white/80 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Cth: 0852..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nomor Kartu Keluarga (KK) <span className="text-red-500">*</span></label>
                                        <input required name="no_kk" value={formData.no_kk} onChange={handleChange} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={16} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="16 Digit Nomor KK" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alamat Lengkap Domisili <span className="text-red-500">*</span></label>
                                        <textarea required name="alamat" value={formData.alamat} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border-slate-200 bg-white/50 dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors uppercase" placeholder="Desa, Kecamatan, RT/RW, Kabupaten, Provinsi"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Tahap 3: Konfirmasi</h2>
                            <div className="space-y-5">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200 border-b pb-2">Ringkasan Pendaftaran</h3>
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">Jenjang Pilihan</dt>
                                            <dd className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">{formData.jenjang}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">Nama Santri</dt>
                                            <dd className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{formData.nama_lengkap || '-'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">NIK Santri</dt>
                                            <dd className="font-semibold text-slate-800 dark:text-slate-200">{formData.nik || '-'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">TTL</dt>
                                            <dd className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{formData.tempat_lahir}, {formData.tgl_lahir}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-slate-500 dark:text-slate-400">Nama Ayah</dt>
                                            <dd className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{formData.nama_ayah} / {formData.no_hp_ayah}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 mt-6 text-sm flex gap-3">
                                    <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <p>Dengan menekan tombol <strong>Kirim Pendaftaran</strong>, saya selaku orang tua/wali menyatakan bahwa seluruh data yang diisi telah benar dan menyetujui aturan tata tertib pondok pesantren sesuai Manhaj Salaf.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                        {step > 1 ? (
                            <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-medium transition-colors">
                                Kembali
                            </button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <button type="button" onClick={nextStep} disabled={step === 1 && !formData.jenjang} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                Selanjutnya
                            </button>
                        ) : (
                            <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]">
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
