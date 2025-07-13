

"use client"

import { RewardsStore } from "@/components/RewardsStore"
import { Header } from "@/components/Header"

export default function RewardsStorePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 px-4 sm:px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
            CodeHurdle Rewards Store
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground mt-2 sm:mt-3 mx-auto">
            Shop exclusive rewards and perks with your earned CodeCoins.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-2 xs:px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <RewardsStore />
        </div>
      </main>
    </div>
  )
}