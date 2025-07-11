
import { create } from "zustand";

export const useTopicsStore = create((set) => ({
  topics: [] as any[],
  setTopics: (topics: any[]) => set({ topics }),
  updateStatus: (qid: number, newStatus: string) =>
    set((state: any) => ({
      topics: state.topics.map((t: any) => ({
        ...t,
        subtopics: t.subtopics.map((s: any) => ({
          ...s,
          questions: s.questions.map((q: any) =>
            q.question_id === qid ? { ...q, status: newStatus } : q
          ),
        })),
      })),
    })),
}));
