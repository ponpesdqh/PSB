'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-emerald-600 p-2"
                aria-label="Toggle menu"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg z-50">
                    <nav className="flex flex-col px-4 py-4 space-y-3">
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Beranda</Link>
                        <Link href="/pendaftaran" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Pendaftaran</Link>
                        <Link href="/status" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cek Status</Link>
                        <Link href="/pengumuman" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Pengumuman</Link>
                        <Link href="/test" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Test Online</Link>
                    </nav>
                </div>
            )}
        </>
    );
}
