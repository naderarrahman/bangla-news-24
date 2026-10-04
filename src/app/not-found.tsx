'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="max-w-lg w-full flex flex-col items-center space-y-6">
        
        <div className="relative flex flex-col items-center">
          <h1 className="text-8xl sm:text-9xl font-black text-gray-200 dark:text-gray-800 tracking-widest select-none">
            404
          </h1>
          <span className="absolute top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-red-600/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
            ৪০৪ পৃষ্ঠা পাওয়া যায়নি
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            সংবাদটি বা লিংকটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            আপনি যে খবর বা পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি ভুল ছিল।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-md text-sm font-semibold text-white bg-red-700 hover:bg-red-800 active:bg-red-900 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            হোম পেজে ফিরে যান
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-md text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all cursor-pointer border border-gray-300 dark:border-gray-700"
          >
            পূর্বের পেজে যান
          </button>
        </div>

      </div>
    </main>
  );
}