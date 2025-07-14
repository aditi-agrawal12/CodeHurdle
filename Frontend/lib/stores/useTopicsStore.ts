import { create } from "zustand";
import axios from "axios";

type Question = { question_id: number; status: string } & Record<string, any>;
type Subtopic = { questions: Question[] } & Record<string, any>;
type Topic = { subtopics: Subtopic[] } & Record<string, any>;

interface State {
  topics: Topic[];
  fetchTopics: () => Promise<void>;
  updateStatus: (qid: number, newStatus: string) => void;
}

export const useTopicsStore = create<State>((set) => ({
  topics: [],

  fetchTopics: async () => {
    try {
      const res = await axios.get("https://codehurdle.com/gettopics", {
        withCredentials: true,
      });
      set({ topics: res.data || [] });
    } catch (err) {
      console.error("Failed to fetch topics", err);
    }
  },

  updateStatus: (qid, newStatus) =>
    set((state) => ({
      topics: state.topics.map((t) => ({
        ...t,
        subtopics: t.subtopics.map((s) => ({
          ...s,
          questions: s.questions.map((q) =>
            q.question_id === qid ? { ...q, status: newStatus } : q
          ),
        })),
      })),
    })),
}));
