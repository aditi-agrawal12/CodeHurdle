

// "use client"

// import { useUserStore } from "@/lib/stores/useUserStore"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import RedeemModal from "@/components/RedeemModal"
// import Image from "next/image"
// import { Coins } from "lucide-react"
// import tshirt from "@/assets/tshirt.jpg" // example image

// const rewardItems = [
//   {
//     id: 1,
//     name: "Prize1",
//     description: "Unlock exclusive problems for 24 hours",
//     price: 500,
//     image: tshirt
//   },
//   {
//     id: 2,
//     name: "Prize2",
//     description: "Special profile badge for 7 days streak",
//     price: 1000,
//     image: "",
//     gradient: "from-purple-900 to-purple-800",
//     text: "text-pink-300"
//   },
//   {
//     id: 3,
//     name: "Prize3",
//     description: "Featured on leaderboard for 3 days",
//     price: 1500,
//     image: "",
//     gradient: "from-cyan-900 to-cyan-800",
//     text: "text-cyan-300"
//   },
//   {
//     id: 4,
//     name:"Prize4",
//     description: "All perks + exclusive solutions are available",
//     price: 3000,
//     image: "",
//     gradient: "from-fuchsia-900 to-purple-800",
//     text: "text-violet-300"
//   },
//   {
//     id: 5,
//     name:"Prize5",
//     description: "All perks + exclusive solutions are available",
//     price: 3000,
//     image: "",
//     gradient: "from-fuchsia-900 to-purple-800",
//     text: "text-violet-300"
//   },
//   {
//     id: 6,
//     name:"Prize6",
//     description: "All perks + exclusive solutions are available",
//     price: 3000,
//     image: "",
//     gradient: "from-fuchsia-900 to-purple-800",
//     text: "text-violet-300"
//   },
//   {
//     id: 7,
//     name:"Prize7",
//     description: "All perks + exclusive solutions are available",
//     price: 3000,
//     image: "",
//     gradient: "from-fuchsia-900 to-purple-800",
//     text: "text-violet-300"
//   },
//   {
//     id: 8,
//     name:"Prize8",
//     description: "All perks + exclusive solutions are available",
//     price: 3000,
//     image: "",
//     gradient: "from-fuchsia-900 to-purple-800",
//     text: "text-violet-300"
//   }
// ]

// export function RewardsStore() {
//   const coins = useUserStore((state) => state.coins)
//   const deductCoins = useUserStore((state) => state.deductCoins)

//   const [selectedReward, setSelectedReward] = useState<number | null>(null)
//   const [showModal, setShowModal] = useState(false)

//   const purchaseReward = (rewardId: number, price: number) => {
//     if (coins < price) return
//     deductCoins(price)
//     setSelectedReward(rewardId)
//     setShowModal(true)
//   }

//   const handleFormSubmit = (data: {
//     fullName: string
//     email: string
//     contact: string
//   }) => {
//     console.log("✅ Order Placed:", {
//       rewardId: selectedReward,
//       ...data
//     })
//     setShowModal(false)
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-gray-950 to-purple-900/30">
//       <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-8 text-center">
//         Rewards Store
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {rewardItems.map((reward) => {
//           const canAfford = coins >= reward.price

//           return (
//             <motion.div
//               key={reward.id}
//               whileHover={{ scale: 1.02 }}
//               className="rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200 flex flex-col"
//             >
//               <div className="relative w-full h-48 sm:h-56 md:h-60 bg-gradient-to-br from-purple-900 to-purple-950">
//                 <Image
//                   src={reward.image}
//                   alt={reward.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-4 flex flex-col flex-grow justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     {reward.name}
//                   </h3>
//                   <p className="text-sm text-gray-600">{reward.description}</p>
//                 </div>

//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-sm font-medium text-yellow-600 flex items-center gap-1">
//                     <Coins className="w-4 h-4" />
//                     {reward.price}
//                   </span>

//                   <button
//                     onClick={() => purchaseReward(reward.id, reward.price)}
//                     disabled={!canAfford}
//                     className={`text-xs px-4 py-1 rounded-full font-medium transition ${
//                       canAfford
//                         ? "bg-green-600 text-white hover:bg-green-500"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     Redeem
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )
//         })}
//       </div>

//       <RedeemModal
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         onSubmit={handleFormSubmit}
//         rewardName={
//           rewardItems.find((r) => r.id === selectedReward)?.name || ""
//         }
//       />
//     </div>
//   )
// }


"use client"

import { useUserStore } from "@/lib/stores/useUserStore"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import RedeemModal from "@/components/RedeemModal"
import Image from "next/image"
import { Coins } from "lucide-react"
import tshirt from "@/assets/tshirt.jpg"
import { toast } from "sonner"

const rewardItems = [
  {
    id: 1,
    name: "Exclusive Problems",
    description: "Unlock exclusive problems for 24 hours",
    price: 500,
    image: tshirt,
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    id: 2,
    name: "Profile Badge",
    description: "Special profile badge for 7 days streak",
    price: 1000,
    gradient: "from-purple-600 to-fuchsia-600",
    text: "text-purple-100"
  },
  {
    id: 3,
    name: "Leaderboard Feature",
    description: "Featured on leaderboard for 3 days",
    price: 1500,
    gradient: "from-cyan-500 to-blue-600",
    text: "text-cyan-100"
  },
  {
    id: 4,
    name: "Premium Package",
    description: "All perks + exclusive solutions access",
    price: 3000,
    gradient: "from-violet-600 to-purple-600",
    text: "text-violet-100"
  },
  {
    id: 5,
    name: "Mentorship Session",
    description: "30-min 1:1 session with an expert",
    price: 2500,
    gradient: "from-emerald-500 to-teal-600",
    text: "text-emerald-100"
  },
  {
    id: 6,
    name: "Early Access Pass",
    description: "Early access to new features",
    price: 1800,
    gradient: "from-rose-500 to-pink-600",
    text: "text-rose-100"
  },
  {
    id: 7,
    name: "Custom Avatar",
    description: "Exclusive profile customization",
    price: 2200,
    gradient: "from-indigo-500 to-blue-600",
    text: "text-indigo-100"
  },
  {
    id: 8,
    name: "VIP Support",
    description: "Priority customer support",
    price: 1200,
    gradient: "from-orange-500 to-red-600",
    text: "text-orange-100"
  }
]

export function RewardsStore() {
  const coins = useUserStore((state) => 2000)
  const deductCoins = useUserStore((state) => state.deductCoins)

  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // Fix for Locomotive Scroll
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [showModal])

  const purchaseReward = (rewardId: number, price: number) => {
    if (coins < price) {
      toast.error("Not enough coins!")
      return
    }
    setSelectedReward(rewardId)
    setShowModal(true)
  }

  const handleFormSubmit = (data: {
    fullName: string
    email: string
    contact: string
  }) => {
    const reward = rewardItems.find(r => r.id === selectedReward)
    if (reward) {
      deductCoins(reward.price)
      toast.success(`Successfully redeemed ${reward.name}!`)
    }
    setShowModal(false)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-purple-950/30 to-cyan-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
          >
            Rewards Store
          </motion.h2>
          <div className="flex items-center justify-center gap-2">
            <Coins className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-medium text-white">
              Your Coins: <span className="text-yellow-400">{coins}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rewardItems.map((reward) => {
            const canAfford = coins >= reward.price

            return (
              <motion.div
                key={reward.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${reward.gradient} opacity-20`} />
                
                <div className="relative z-10 p-5 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${reward.text || 'text-white'}`}>
                      {reward.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">{reward.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className={`font-medium ${canAfford ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {reward.price}
                      </span>
                    </div>

                    <button
                      onClick={() => purchaseReward(reward.id, reward.price)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        canAfford
                          ? `bg-gradient-to-r ${reward.gradient} text-white hover:opacity-90 shadow-lg`
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <RedeemModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFormSubmit}
        rewardName={rewardItems.find((r) => r.id === selectedReward)?.name || ""}
      />
    </div>
  )
}