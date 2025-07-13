"use client";

import Image from "next/image";

export default function VerifyingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl flex flex-col items-center gap-4 shadow-xl border border-gray-200 dark:border-purple-700/50">
        <div className="relative w-32 h-32">
          <Image 
            src="/cat.gif" 
            alt="Verifying" 
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <span className="text-gray-800 dark:text-white text-lg font-semibold text-center">
          Verifying your submission from LeetCode, Codeforces...
        </span>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}