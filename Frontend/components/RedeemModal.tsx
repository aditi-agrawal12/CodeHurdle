"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { X } from "lucide-react"

export default function RedeemModal({
  open,
  onClose,
  onSubmit,
  rewardName
}: {
  open: boolean
  onClose: () => void
  onSubmit: (data: { fullName: string; email: string; contact: string; address: string }) => void
  rewardName: string
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    onSubmit(form)
    toast.success("Order Placed")
    onClose()
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[1000] bg-black/60 dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <div 
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none"
            onClick={onClose}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl w-full max-w-lg shadow-xl mx-auto my-auto pointer-events-auto max-h-[90vh] flex flex-col"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={handleModalClick}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex-shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    Redeem Your Reward
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    Claim your <span className="text-purple-600 font-medium">{rewardName}</span>
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <Input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contact Number
                      </label>
                      <Input
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Delivery Address
                      </label>
                      <Input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 "
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-400 text-white shadow-lg shadow-purple-500/20 hover:cursor-pointer"
                  >
                    Confirm Order
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}