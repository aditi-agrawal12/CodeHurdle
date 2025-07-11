
"use client"

import { useState } from "react"
import { BookOpen, Activity, LayoutList } from "lucide-react"
import logoImage from "../assets/logo-nav.png"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useProgress } from "@/app/dashboard/ProgressContext"

export const SideBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ name: string; email: string; profilePicture: string } | null>(null)
  const { showProgress, setShowProgress } = useProgress()

  const isDashboard = pathname === "/dashboard"
  const isProgress = isDashboard && showProgress
  const isProblems = isDashboard && !showProgress
  const isSheets = pathname.startsWith("/dashboard/sheet")

  const activeClasses =
    "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-md"

  const defaultClasses =
    "text-foreground/80 hover:text-foreground hover:bg-muted transition-all"

  return (
    <aside className="min-h-screen w-64 flex flex-col bg-background border-r border-border shadow-xl">
      <div className="flex-1 flex flex-col">
        {/* Logo */}
        <div className="px-6 pt-6 pb-3">
          <Image
            src={logoImage}
            alt="CodeHurdle Logo"
            className="w-40 brightness-110"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-6 px-4 text-sm font-medium">
          {/* Problems */}
          <button
            onClick={() => {
              setShowProgress(false)
              router.push("/dashboard")
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isProblems ? activeClasses : defaultClasses
            }`}
          >
            <BookOpen className="h-5 w-5 text-purple-400" />
            <span>Problems</span>
          </button>

          {/* Progress */}
          <button
            onClick={() => {
              setShowProgress(true)
              router.push("/dashboard")
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isProgress ? activeClasses : defaultClasses
            }`}
          >
            <Activity className="h-5 w-5 text-purple-400" />
            <span>Progress</span>
          </button>

          {/* Sheets */}
          <Link
            href="/dashboard/sheet"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isSheets ? activeClasses : defaultClasses
            }`}
          >
            <LayoutList className="h-5 w-5 text-purple-400" />
            <span>Topic Wise Sheets</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}
