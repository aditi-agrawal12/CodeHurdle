

"use client";

import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useTopicsStore } from "@/lib/stores/useTopicsStore";

export default function SheetsPage() {
  const { topics, setTopics } = useTopicsStore();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("https://codehurdle.com/gettopics", {
          withCredentials: true,
        });
        setTopics(res.data || []);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
      }
    };

    fetchTopics();
  }, [setTopics]);

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

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-purple-950/90">
      <h1 className="text-2xl font-bold text-purple-300 mb-2">Topic‑Wise Sheet</h1>
      <p className="text-sm text-gray-400 mb-6">Solve problems topic‑wise and track your progress</p>

      {/* overall bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-purple-300 font-semibold">Overall</span>
          <span>{allSol}/{allTot} solved</span>
        </div>
        <div className="w-full h-3 bg-purple-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500" style={{ width: `${allPct}%` }} />
        </div>
        <p className="text-xs text-purple-400 mt-1">{allPct}%</p>
      </div>

      {/* topic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((t: any) => {
          const { total, solved, pct } = progress(
            t.subtopics.flatMap((s: any) => s.questions)
          );
          return (
            <Link
              key={t.title}
              href={`/dashboard/sheet/${t.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="block rounded-xl border border-purple-800/30 bg-gray-900/60 p-6 shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-purple-300">{solved}/{total}</span>
                <span className="text-purple-400">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-purple-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${pct}%` }} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

