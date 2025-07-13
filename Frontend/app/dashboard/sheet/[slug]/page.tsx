"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { useTopicsStore } from "@/lib/stores/useTopicsStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerifyingOverlay from "@/components/VerifyingOverlay";

export default function TopicPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { topics, fetchTopics, updateStatus } = useTopicsStore();
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  useEffect(() => {
    if (topics.length === 0) fetchTopics();
  }, [topics.length, fetchTopics]);

  const slugTitle = decodeURIComponent(params.slug).replace(/-/g, " ");
  const topic = topics.find(
    (t) => t.title.toLowerCase() === slugTitle.toLowerCase()
  );


  if (topics.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-400">
        SubTopics will be added soon
      </div>
    );

  if (!topic)
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-300">
        SubTopics will be added soon
      </div>
    );


  const handleVerify = async (qid: number) => {
    setVerifyingId(qid);
    try {
      await axios.post(
        "https://codehurdle.com/updatequestionstatus",
        { question_id: qid, status: "Solved" },
        { withCredentials: true }
      );
      updateStatus(qid, "Solved");
      toast.success("Verified your submission 🎉");
    } catch {
      toast.error("Could not verify submission.");
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      {/* header */}
      <header className="mb-6 flex items-center gap-4 flex-wrap">
        <h1 className="text-2xl font-bold capitalize">{topic.title}</h1>
        <button
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← back
        </button>
      </header>

      {/* sub‑topics */}
      <div className="space-y-8">
        {topic.subtopics.map((sub) => (
          <section key={sub.title} className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">{sub.title}</h2>

            <div className="space-y-3">
              {sub.questions.map((q) => (
                <div
                  key={q.question_id}
                  className="flex justify-between items-center p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-medium">{q.question_title}</span>
                    <Badge
                      className={`text-xs px-3 py-1.5 rounded-xl ${
                        q.status === "Solved"
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {q.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={q.link}
                      target="_blank"
                      className="text-primary hover:text-primary/80 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Solve
                    </Link>

                    <Button
                      variant={q.status === "Solved" ? "secondary" : "outline"}
                      size="sm"
                      disabled={
                        verifyingId === q.question_id || q.status === "Solved"
                      }
                      onClick={() => handleVerify(q.question_id)}
                    >
                      {verifyingId === q.question_id
                        ? "Verifying…"
                        : q.status === "Solved"
                        ? "Solved"
                        : "Submit"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {verifyingId && <VerifyingOverlay />}
    </div>
  );
}
