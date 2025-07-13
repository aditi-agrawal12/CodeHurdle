

"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Gift } from "lucide-react"
import logoImage from "../assets/logo-nav.png"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { UserCoins } from "@/components/ui/UserCoins"
import ThemeToggle from "./ThemeToggle/ThemeToggle"

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<{
    name?: string
    email?: string
    profilePicture?: string
  }>({
    name: "abc",
    email: "abc@example.com",
    profilePicture: "",
  })

  const handleLogout = async () => {
    try {
      await fetch("http://codehurdle.com/logout", {
        credentials: "include",
      })
    } catch (err) {
      console.error("Logout failed", err)
    } finally {
      router.push("/")
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8080/getuser", {
          credentials: "include",
        })

        if (res.ok) {
          const data = await res.json()
          setUser({
            name: data.name,
            email: data.email,
            profilePicture: data.profile_picture || "",
          })
        } else {
          console.warn("Failed to fetch user info")
        }
      } catch (err) {
        console.error("Error fetching user info", err)
      }
    }

    fetchUserData()
  }, [])

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 sm:gap-6 min-h-20 px-4 md:px-6 border-b border-border bg-background text-foreground shadow-md backdrop-blur-md">
      {pathname?.startsWith("/profile") || pathname === "/rewardsstore" ? (
        <Link href="/dashboard" className="flex items-center min-w-[120px]">
          <Image
            src={logoImage}
            alt="CodeHurdle Logo"
            width={160}
            height={50}
            className="h-auto w-32 sm:w-40 hover:brightness-110 transition-all"
            priority
          />
        </Link>
      ) : (
        <div />
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* Rewards */}
        <Link
          href="/rewardsstore"
          className="text-foreground hover:text-primary transition-all hover:scale-110"
          title="Rewards Store"
        >
          <Gift className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        {/* Coins */}
        <UserCoins />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer group max-w-[160px]">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name || "Username"}
              </p>
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-border group-hover:scale-105 transition-transform object-cover"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center border-2 border-border group-hover:scale-105 transition-transform">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="min-w-[180px] mt-2 rounded-xl p-1 shadow-xl backdrop-blur-md bg-background border border-border"
          >
            <DropdownMenuItem
              onSelect={() => router.push("/profile")}
              className="text-sm text-foreground hover:bg-muted cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleLogout}
              className="text-sm text-red-500 hover:bg-red-500/20 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
