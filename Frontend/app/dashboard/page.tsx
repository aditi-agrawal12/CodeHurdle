"use client"

import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
  ExternalLink,
  Filter,
  MoreHorizontal,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heatmap } from "@/components/Heatmap"
import { Popup } from "@/components/Popup"
import { useProgress } from "./ProgressContext"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import VerifyingOverlay from "@/components/VerifyingOverlay"


const RATINGS = [1200, 1350, 1500, 1650, 1800, 1950]
const ratingOptions = [{ value: "all", label: "All Ratings" }, ...RATINGS.map(r => ({ value: String(r), label: String(r) }))]

type Question = {
  question_id: number;
  question_title: string;
  rating: number;
  link: string;
  status: "Solved" | "Attempted" | "Unsolved";
};

type ProgressData = {
  total_solved: number;
  solved_by_rating: {
    [rating: string]: number;
  };
};

const TOTAL_PROBLEMS: { [rating: string]: number } = {
  "1350": 60,
  "1500": 60,
  "1650": 60,
  "1800": 60,
  "1950": 60,
};

export default function DashboardPage() {
  const { showProgress } = useProgress();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});
  const [progressData, setProgressData] = useState<ProgressData>({ total_solved: 0, solved_by_rating: {} });
  const [selectedRating, setSelectedRating] = useState("all");
  const [user, setUser] = useState<{ name: string; email: string; profilePicture: string } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyingQuestionId, setVerifyingQuestionId] = useState<number | null>(null);

  const filteredQuestions = questions.filter((question) => {
    const matchesRating = selectedRating === "all" || question.rating === Number(selectedRating);
    const matchesSearch = question.question_title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  // const dummyQuestions: Question[] = [
  //   {
  //     question_id: 1,
  //     question_title: "Two Sum Problem",
  //     rating: 1350,
  //     link: "https://leetcode.com/problems/two-sum/",
  //     status: "Solved",
  //   },
  //   {
  //     question_id: 2,
  //     question_title: "Longest Substring Without Repeating Characters",
  //     rating: 1500,
  //     link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  //     status: "Unsolved",
  //   },
  //   {
  //     question_id: 3,
  //     question_title: "Median of Two Sorted Arrays",
  //     rating: 1650,
  //     link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  //     status: "Unsolved",
  //   },
  //   {
  //     question_id: 4,
  //     question_title: "Reverse Linked List",
  //     rating: 1350,
  //     link: "https://leetcode.com/problems/reverse-linked-list/",
  //     status: "Solved",
  //   },
  //   {
  //     question_id: 5,
  //     question_title: "Valid Parentheses",
  //     rating: 1500,
  //     link: "https://leetcode.com/problems/valid-parentheses/",
  //     status: "Solved",
  //   },
  //   {
  //     question_id: 6,
  //     question_title: "Merge Two Sorted Lists",
  //     rating: 1350,
  //     link: "https://leetcode.com/problems/merge-two-sorted-lists/",
  //     status: "Solved",
  //   },
  //   {
  //     question_id: 7,
  //     question_title: "Best Time to Buy and Sell Stock",
  //     rating: 1500,
  //     link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  //     status: "Solved",
  //   },
  //   {
  //     question_id: 8,
  //     question_title: "Climbing Stairs",
  //     rating: 1350,
  //     link: "https://leetcode.com/problems/climbing-stairs/",
  //     status: "Solved",
  //   },
  //   {
  //     question_id: 9,
  //     question_title: "Binary Tree Inorder Traversal",
  //     rating: 1500,
  //     link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
  //     status: "Unsolved",
  //   },
  //   {
  //     question_id: 10,
  //     question_title: "Word Break",
  //     rating: 1800,
  //     link: "https://leetcode.com/problems/word-break/",
  //     status: "Unsolved",
  //   },
  // ];
  

  const fetchQuestions = useCallback(async (rating: string | number, pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get("https://codehurdle.com/getquestions", {
        withCredentials: true,
        params: { minRating: rating, maxRating: rating, page: pageNumber, limit: 20 },
      });
      const data = res.data;
      setQuestions(data);
      setHasMore(data.length >= 18);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchQuestions(selectedRating, page);
  }, [selectedRating, page]);
  // useEffect(() => {
  //   setQuestions(dummyQuestions);
  // }, []);
  

  const fetchProgressData = async () => {
    try {
      const res1 = await axios.get("https://codehurdle.com/getprogress", { withCredentials: true });
      const res2 = await axios.get("https://codehurdle.com/getheatmap", { withCredentials: true });
      setHeatmapData(res2.data || {});
      setProgressData({
        total_solved: res1.data?.total_solved || 0,
        solved_by_rating: res1.data?.SolvedByRating || {},
      });
    } catch (error) {
      console.error("Failed to fetch progress data:", error);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, [selectedRating]);
  
  // useEffect(() => {
  //   setProgressData({
  //     total_solved: 150,
  //     solved_by_rating: {
  //       "1350": 30,
  //       "1500": 25,
  //       "1650": 10,
  //       "1800": 15,
  //       "1950": 5,
  //     },
  //   });
  // }, []);
  


  const handleRatingSelect = (rating: string) => {
    setSelectedRating(rating);
    setQuestions([]);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(p => p - 1);
      fetchQuestions(selectedRating, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < 3) {
      setPage(p => p + 1);
      fetchQuestions(selectedRating, page + 1);
    }
  };

  const handleStatusUpdate = async (questionId: number, newStatus: "Solved" | "Unsolved", rating: number) => {
    try {
      setQuestions(prev => prev.map(q => q.question_id === questionId ? { ...q, status: newStatus } : q));
      await axios.post("https://codehurdle.com/updatequestionstatus", { question_id: questionId, status: newStatus, rating }, { withCredentials: true });
      fetchProgressData();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    setShowPopup(true); // force show for demo
  }, []);

  const handleProfileSubmit = async (data: { name: string; college: string; batch: string }) => {
    try {
      await axios.post("https://codehurdle.com/updateprofile", data, { withCredentials: true });
      setUser(prev => prev ? { ...prev, ...data } : null);
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const incrementHeatmap = async () => {
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];
    setHeatmapData(prev => ({ ...prev, [dateKey]: (prev[dateKey] || 0) + 1 }));
    try {
      await axios.post("https://codehurdle.com/incrementheatmap", {}, { withCredentials: true });
    } catch (error) {
      console.error("Failed to update heatmap data:", error);
    }
  }

  const decrementHeatmap = async () => {
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];
    setHeatmapData(prev => ({ ...prev, [dateKey]: Math.max((prev[dateKey] || 1) - 1, 0) }));
    try {
      await axios.post("https://codehurdle.com/decrementheatmap", {}, { withCredentials: true });
    } catch (error) {
      console.error("Failed to update heatmap data:", error);
    }
  }

  // Only show Solved/Unsolved in status
  const getStatus = (status: string) => (status === "Solved" ? "Solved" : "Unsolved");

  // Simulate verification (replace with real API if available)
  const handleVerifySubmission = async (question: Question) => {
    setVerifying(true);
    setVerifyingQuestionId(question.question_id);
    // Simulate network delay
    setTimeout(async () => {
      // Simulate verification result (always success for demo)
      const verified = true;
      setQuestions(prev => prev.map(q =>
        q.question_id === question.question_id
          ? { ...q, status: verified ? "Solved" : "Unsolved" }
          : q
      ));
      setVerifying(false);
      setVerifyingQuestionId(null);
      if (verified) {
        toast.success("Verified your submission Successfully 🎉");
      } else {
        toast.error("Could not verify your submission");
      }
      fetchProgressData();
    }, 2000);
  };

  return (
    <>
      {/* Rating Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 md:gap-4 mb-6">
      {Object.entries(TOTAL_PROBLEMS).map(([rating, total]) => {
      const solved = progressData.solved_by_rating?.[Number(rating)] || 0;
      const percentage = Math.round((solved / total) * 100);
      return (
        <motion.div
          key={rating}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
      <Card
        onClick={() => handleRatingSelect(rating)}
        className="relative p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] shadow-md transition-all duration-300 hover:scale-[1.03] cursor-pointer hover:shadow-[0_10px_20px_var(--card-shadow)]"
      >
        {/* Badge */}
        <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white ">
          Rating {rating}
        </div>

        {/* Title with progress count */}
        <h3 className="text-xl font-bold mb-2 text-foreground flex justify-between items-center">
          Problems Solved
          <Badge variant="outline" className="bg-purple-800/50 text-white text-xs border border-purple-400">
            {solved}/{total}
          </Badge>
        </h3>

        {/* Progress bar */}
        <div className="flex flex-col gap-2 ">
          <Progress value={percentage} className="h-2 bg-purple-900" />
          <p className="text-xs text-muted-foreground text-right">{percentage}% completed</p>
        </div>

        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 opacity-10 rounded-tl-3xl rounded-br-xl" />

        {/* Selected state indicator */}
        {selectedRating === rating && (
          <div className="absolute inset-0 ring-2 ring-purple-400 rounded-xl pointer-events-none" />
        )}
      </Card>
    </motion.div>
  );
})}
      </div>

      {/* Heatmap Progress Widget */}
      {showProgress && (
        <div className="mb-8">
          <h2 className="text-white font-semibold text-sm mb-2">
                {Object.values(heatmapData).reduce((sum, count) => sum + count, 0)} submissions in the past year
          </h2>
          <Heatmap data={heatmapData} />
        </div>
      )}

      {/* Problem Set Table */}
      <div className="rounded-xl border border-purple-300 dark:border-purple-800/30 bg-white dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-purple-950/30 overflow-hidden">
  {/* Header */}
  <div className="bg-gray-50 dark:bg-black/90 p-4 border-b border-gray-200 dark:border-purple-800/30">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        Problem Set
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-500 dark:text-purple-400" />
          <Input
            type="search"
            placeholder="Search problems..."
            className="pl-10 bg-white dark:bg-gray-900/50 border-gray-300 dark:border-purple-800/50 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-light">
              <Filter className="h-4 w-4 mr-2" />
              <span className="truncate">Rating: {selectedRating === "all" ? "All" : selectedRating}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-950 border-gray-200 dark:border-purple-800/30 w-[200px]">
            {ratingOptions.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => handleRatingSelect(range.value)}
                className={`${selectedRating === range.value ? "bg-purple-100 dark:bg-purple-900/50" : ""}`}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>

  {/* Table Content */}
  <div className="overflow-x-auto">
    <Table className="min-w-full bg-white dark:bg-black/50">
      <TableHeader className="bg-gray-100 dark:bg-black/30">
        <TableRow className="border-gray-200 dark:border-purple-800/30 dark:bg-black/90">
          <TableHead className="text-gray-700 dark:text-purple-300 px-4 py-3">Problem</TableHead>
          <TableHead className="text-gray-700 dark:text-purple-300 px-4 py-3 text-center">Rating</TableHead>
          <TableHead className="text-gray-700 dark:text-purple-300 px-4 py-3 text-center">Status</TableHead>
          <TableHead className="text-gray-700 dark:text-purple-300 px-4 py-3 text-center">Link</TableHead>
          <TableHead className="text-gray-700 dark:text-purple-300 px-4 py-3 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredQuestions.map((question) => (
          <TableRow key={question.question_id} className="border-gray-200 dark:bg-black/80 dark:border-purple-800/20 dark:hover:bg-gradient-to-r dark:from-purple-950/20 dark:to-cyan-600/10">
            <TableCell className="px-4 py-3">
              <span className="text-gray-900 dark:text-white font-medium">{question.question_title}</span>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <Badge className="text-md px-4 py-1 text-purple-700 dark:text-white border border-purple-300 dark:border-purple-600 bg-transparent">
                {question.rating}
              </Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <Badge
                className={`w-24 text-xs font-light border rounded-xl px-3 py-1.5 ${
                  getStatus(question.status) === "Solved"
                    ? "bg-gradient-to-r from-purple-600 to-purple-400 text-purple-800 text-white"
                    : "bg-transparent text-gray-800 dark:text-white border-gray-300 dark:border-purple-600"
                }`}
              >
                {getStatus(question.status)}
              </Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <a href={question.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300">
                <ExternalLink className="inline h-3 w-3 mr-1" />
                Solve
              </a>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500 dark:border-purple-700 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-800/30 hover:text-purple-700 dark:hover:text-white cursor-pointer text-sm"
                disabled={verifying && verifyingQuestionId === question.question_id || question.status === "Solved"}
                onClick={() => handleVerifySubmission(question)}
              >
                {verifying && verifyingQuestionId === question.question_id ? "Verifying…" : question.status === "Solved" ? "Solved" : "Submit"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* Pagination */}
  <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-purple-800/30 bg-gray-50 dark:bg-black/90 gap-3">
    <Button variant="outline" disabled={page === 1} onClick={handlePrevPage} className="gap-1 border-gray-300 dark:border-purple-700 text-gray-700 dark:text-purple-300 hover:bg-purple-400 dark:hover:bg-purple-900/30 w-full sm:w-auto cursor-pointer">
      <ChevronLeft className="h-4 w-4" />
      Previous
    </Button>
    <div className="text-sm text-gray-600 dark:text-purple-300">
      Page <span className="font-medium text-gray-900 dark:text-white">{page}</span> of 3
    </div>
    <Button variant="outline" disabled={!hasMore || page === 3} onClick={handleNextPage} className="gap-1 border-gray-300 dark:border-purple-700 text-gray-700 dark:text-purple-300 hover:bg-purple-400 dark:hover:bg-purple-900/30 w-full sm:w-auto cursor-pointer">
      Next
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
  
</div>
      <Popup open={showPopup} onClose={() => setShowPopup(false)} onSubmit={handleProfileSubmit} user={user} />
      {/* Loading Overlay */}
      {verifying && <VerifyingOverlay/>}
    </>
  );
}
