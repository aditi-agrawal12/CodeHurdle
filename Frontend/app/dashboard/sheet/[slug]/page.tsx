
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { useTopicsStore } from "@/lib/stores/useTopicsStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerifyingOverlay from "@/components/VerifyingOverlay";

export default function TopicPage({ params }: { params: { slug: string } }) {
  const router = useRouter();


  const topics = useTopicsStore((s) => s.topics);
  const updateStatus = useTopicsStore((s) => s.updateStatus);

  const slugTitle = decodeURIComponent(params.slug).replace(/-/g, " ");
  const topic = topics.find(
    (t: any) => t.title.toLowerCase() === slugTitle.toLowerCase()
  );

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-300">
        SubTopics will be added soon
      </div>
    );
  }


  const [verifying, setVerifying] = useState(false);
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  const handleVerify = async (qid: number) => {
    setVerifying(true);
    setVerifyingId(qid);

    try {

      await axios.post(
        "https://codehurdle.com/updatequestionstatus",
        { question_id: qid, status: "Solved" },
        { withCredentials: true }
      );

      updateStatus(qid, "Solved");
      toast.success("Verified your submission 🎉");
    } catch (err) {
      console.error("Verification failed", err);
      toast.error("Could not verify submission. Try again.");
    } finally {
      setVerifying(false);
      setVerifyingId(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black to-purple-950/90 text-white">
      {/* header */}
      <header className="mb-6 flex items-center gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-purple-300 capitalize">
          {topic.title}
        </h1>
        <button onClick={() => router.back()} className="text-sm text-purple-400 underline">
          ← back
        </button>
      </header>

      {/* sub‑topic sections */}
      <div className="space-y-10">
        {topic.subtopics.map((sub: any) => (
          <section key={sub.title} className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-200 border-b border-purple-700 pb-1">
              {sub.title}
            </h2>

            <div className="space-y-3">
              {sub.questions.map((q: any) => (
                <div
                  key={q.question_id}
                  className="flex justify-between items-center bg-gray-900/60 rounded-xl p-4 border border-purple-800/30 hover:shadow-lg hover:shadow-purple-800/20 transition-all"
                >
                  {/* title + status */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-white font-medium">{q.question_title}</span>
                    <Badge
                      className={`text-xs font-light px-3 py-1.5 rounded-xl border ${
                        q.status === "Solved"
                          ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                          : "bg-transparent text-white border-purple-600"
                      }`}
                    >
                      {q.status}
                    </Badge>
                  </div>

                  {/* actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={q.link}
                      target="_blank"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Solve
                    </Link>

                   
                        <Button
                          variant={q.status === "Solved" ? "secondary" : "outline"}
                          size="sm"
                          className="text-sm  bg-gradient-to-r from-purple-600 to-purple-400"
                          disabled={verifying && verifyingId === q.question_id || q.status === "Solved"}
                          onClick={() => handleVerify(q.question_id)}
                        >
                          {verifying && verifyingId === q.question_id ? "Verifying…" : q.status === "Solved" ? "Solved" : "Submit"}
                        </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* verifying overlay */}
      {verifying && <VerifyingOverlay/>}
    </div>
  );
}

