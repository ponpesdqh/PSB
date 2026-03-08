import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'PSB - Pondok Pesantren Darul Quran wal Hadits OKU Timur',
  description: 'Penerimaan Santri Baru Pondok Pesantren',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} font-sans min-h-screen flex flex-col`}>
        {/* Navigation */}
        <header className="sticky top-0 z-50 glass border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  Ma'had Darul Qur'an <span className="text-slate-800 dark:text-slate-200">Wal Hadits</span>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 font-medium transition-colors">Beranda</Link>
                <Link href="/pendaftaran" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 font-medium transition-colors">Pendaftaran</Link>
                <Link href="/status" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 font-medium transition-colors">Cek Status</Link>
                <Link href="/pengumuman" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 font-medium transition-colors">Pengumuman</Link>
                <Link href="/test" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 font-medium transition-colors">Test Online</Link>
              </nav>
              <div className="md:hidden flex items-center">
                {/* Mobile menu button */}
                <button className="text-slate-600 hover:text-emerald-600 p-2">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
              <div className="mb-4 md:mb-0">
                <span className="text-lg font-semibold text-white">Ma'had Darul Qur'an Wal Hadits OKU Timur</span>
                <p className="mt-2 text-sm max-w-md">Mencetak generasi rabbani yang berpegang teguh pada Al-Qur'an dan As-Sunnah sesuai pemahaman Salafus Shalih.</p>
              </div>
              <div className="text-sm">
                &copy; {new Date().getFullYear()} Pondok Pesantren Darul Quran wal Hadits OKU Timur. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
