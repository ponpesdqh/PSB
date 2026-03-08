'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { questions } from '@/data/questions';

function TestContent() {
    const searchParams = useSearchParams();
    const id = searchParams ? searchParams.get('id') : '';

    const [hasStarted, setHasStarted] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [kategori, setKategori] = useState('');

    // Protect route
    useEffect(() => {
        if (typeof window !== 'undefined' && !id && !isFinished) {
            alert("Akses ditolak. Silakan login melalui halaman Cek Status.");
            window.location.href = '/status';
        }
    }, [id, isFinished]);

    const handleSelect = (option: string) => {
        setAnswers({ ...answers, [currentIdx]: option });
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            calculateResult();
        }
    };

    const handlePrev = () => {
        if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
    };

    const calculateResult = () => {
        let score = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correct) score++;
        });

        const percentage = (score / questions.length) * 100;

        // Evaluation Logic
        let predikat = "Baik";
        if (percentage > 50 && percentage <= 80) {
            predikat = "Sangat Baik";
        } else if (percentage > 80) {
            predikat = "Luar Biasa";
        }

        setKategori(predikat);
        setIsFinished(true);

        // Send result to backend
        fetch(process.env.NEXT_PUBLIC_API_URL + '?action=updateStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                noDaftar: id,
                statusBaru: 'Lulus Seleksi: ' + predikat,
                catatan: 'Nilai Kategori: ' + predikat
            })
        }).catch(console.error); // Silently catch for now
    };

    if (isFinished) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
                <div className="glass p-10 rounded-3xl max-w-lg text-center shadow-2xl border-emerald-500/30">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Ujian Selesai!</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">Alhamdulillah, ujian telah diselesaikan. Berikut adalah hasil evaluasi ananda.</p>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                        <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Predikat</span>
                        <span className="block text-4xl font-black text-emerald-600 dark:text-emerald-400">{kategori}</span>
                    </div>

                    <p className="mt-8 text-sm text-slate-500">Hasil ini telah otomatis tersimpan di sistem kami. Pengumuman resmi akan diinfokan lebih lanjut.</p>
                </div>
            </div>
        );
    }

    if (!hasStarted) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
                <div className="glass p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Ujian Seleksi Masuk</h1>
                    <div className="text-left bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mb-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 border border-slate-200 dark:border-slate-700">
                        <p><strong>Jumlah Soal:</strong> {questions.length} Pilihan Ganda</p>
                        <p><strong>Materi:</strong> Matematika Dasar & Bahasa Indonesia</p>
                        <p><strong>Sistem:</strong> Tidak bisa kembali, kerjakan dengan jujur.</p>
                        <p><strong>Nomor Pendaftaran:</strong> {id}</p>
                    </div>
                    <button
                        onClick={() => setHasStarted(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                    >
                        Bismillah, Mulai Ujian
                    </button>
                </div>
            </div>
        );
    }

    const q = questions[currentIdx];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">

                {/* Progress Bar */}
                <div className="mb-8 p-4 glass rounded-2xl shadow-sm flex items-center justify-between">
                    <div className="flex-grow mr-4">
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 ml-1">Soal {currentIdx + 1} dari {questions.length}</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold font-mono">
                        {q.tipe === 'MTK' ? '♾️ MATEMATIKA' : '📖 B.INDONESIA'}
                    </div>
                </div>

                {/* Question Card */}
                <div className="glass p-8 sm:p-10 rounded-3xl shadow-xl min-h-[400px] flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10"></div>

                    <h2 className="text-xl sm:text-2xl font-serif leading-relaxed text-slate-900 dark:text-white mb-8">
                        <span className="font-bold text-emerald-600 mr-2">{currentIdx + 1}.</span> {q.question}
                    </h2>

                    <div className="space-y-3 flex-grow z-10">
                        {q.options.map((opt, i) => (
                            <label
                                key={i}
                                className={`flex text-slate-800 dark:text-slate-200 items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                  ${answers[currentIdx] === opt
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 font-semibold shadow-sm'
                                        : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-emerald-300'}`}
                            >
                                <input
                                    type="radio"
                                    name={`q-${currentIdx}`}
                                    value={opt}
                                    checked={answers[currentIdx] === opt}
                                    onChange={() => handleSelect(opt)}
                                    className="w-5 h-5 text-emerald-600 border-slate-300 focus:ring-emerald-500 mr-4"
                                />
                                <span className="text-lg">{opt}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={handlePrev}
                            disabled={currentIdx === 0}
                            className="px-6 py-3 font-medium text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-colors hover:text-emerald-600"
                        >
                            &larr; Sebelumnya
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!answers[currentIdx]}
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all hover:-translate-y-1"
                        >
                            {currentIdx === questions.length - 1 ? 'Selesai & Kumpulkan' : 'Selanjutnya &rarr;'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function TestOnline() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-bold text-xl">Loading Ujian...</div>}>
            <TestContent />
        </Suspense>
    );
}
