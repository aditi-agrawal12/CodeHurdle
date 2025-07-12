"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { useTopicsStore } from "@/lib/stores/useTopicsStore";

export default function SheetsPage() {
  const { topics, setTopics } = useTopicsStore();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("https://codehurdle.com/gettopics", {
          withCredentials: true
        });
        setTopics(response.data || []);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };

    if (topics.length === 0) {
      fetchTopics();
    }
  }, [topics.length, setTopics]);

  const progress = (qs: any[]) => {
    const total = qs.length;
    const solved = qs.filter((q) => q.status === "Solved").length;
    const pct = total ? Math.round((solved / total) * 100) : 0;
    return { total, solved, pct };
  };

  const allQs = topics.flatMap((t: any) =>
    t.subtopics.flatMap((s: any) => s.questions)
  );
  const { total: allTot, solved: allSol, pct: allPct } = progress(allQs);

  if (topics.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Coming Soon
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-800 to-purple-600 text-transparent bg-clip-text">
          Topic-Wise Sheets
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Solve problems topic-wise and track your preparation progress.
        </p>
      </div>

      {/* Overall progress card */}
      <div className="relative p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] shadow-md w-full mb-8">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              Overall Progress
            </div>
            <span className="text-sm text-muted-foreground">{allPct}%</span>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {allSol}/{allTot} Problems Solved
            </h3>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" 
                style={{ width: `${allPct}%` }} 
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 rounded-tl-2xl rounded-br-2xl" />
      </div>

      {/* Topic cards */}
      <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {topics.map((t: any) => {
          const { total, solved, pct } = progress(
            t.subtopics.flatMap((s: any) => s.questions)
          );
          
          const gradient = pct >= 75 ? "from-green-500 to-teal-500" :
                          pct >= 50 ? "from-blue-500 to-cyan-500" :
                          pct >= 25 ? "from-yellow-500 to-amber-500" :
                          "from-purple-500 to-pink-500";

          return (
            <Link
              key={t.title}
              href={`/dashboard/sheet/${t.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] shadow-md transition-all duration-300 cursor-pointer hover:shadow-[0_10px_20px_var(--card-shadow)] h-full"
              >
                <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${gradient} text-white mb-4`}>
                  {t.title}
                </div>

                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {solved}/{total} Solved
                </h3>
                
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
                <p className="text-muted-foreground text-sm text-right">{pct}%</p>

                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-tl-3xl rounded-br-xl`} />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </>
  );
}