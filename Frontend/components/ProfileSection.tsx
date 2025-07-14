"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Heatmap } from "@/components/Heatmap";
import { Header } from "@/components/Header";
import { useUserStore } from "@/lib/stores/useUserStore";

export default function ProfileSection() {
  const router = useRouter();
  const profile = useUserStore((state) => state.profile);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [heatmapData] = useState<Record<string, number>>({});

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <div className="flex-1 flex flex-col overflow-auto max-w-[1600px] mx-auto w-full">
        <Header />
        <main className="p-4 md:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative p-6 rounded-xl border border-border backdrop-blur-lg bg-card hover:shadow-lg transition duration-300">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Profile Preview"
                        fill
                        unoptimized
                        priority
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-800/30 to-cyan-900/30 flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-semibold text-purple-300">@{profile.username}</p>
                  </div>

                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
                        Bio
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10  text-sm text-muted-foreground leading-relaxed">
                      {profile.bio || "No bio added yet."}
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <InfoBlock label="Name" value={profile.name} />
                  <InfoBlock label="Email" value={profile.email} />
                  <InfoBlock label="Location" value={profile.location} />
                  <InfoBlock label="College" value={profile.college} />
                  <InfoBlock label="Passout Batch" value={profile.batch} />

                  <Button
                    onClick={() => router.push(`/profile/${profile.username}/edit`)}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-600 hover:to-purple-800 font-light"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Contest Card */}
                <div className="relative p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] shadow-md transition-all duration-300 hover:scale-[1.03] cursor-pointer hover:shadow-[0_10px_20px_var(--card-shadow)]">
                  <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white mb-4">
                    Contests
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    Contests Attended
                  </h3>
                  <p className="text-4xl font-extrabold text-foreground mb-4">
                    0
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Last attended: Never
                  </p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-10 rounded-tl-3xl rounded-br-xl" />
                </div>

                {/* Problems Solved Card */}
                <div className="relative p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] shadow-md transition-all duration-300 hover:scale-[1.03] cursor-pointer hover:shadow-[0_10px_20px_var(--card-shadow)]">
                  <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white mb-4">
                    Practice
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    Problems Solved
                  </h3>
                  <p className="text-4xl font-extrabold text-foreground mb-4">
                    0
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Last solved: Never
                  </p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 opacity-10 rounded-tl-3xl rounded-br-xl" />
                </div>
              </div>

              {/* Submissions Heatmap */}
              <div className="relative p-5 rounded-xl border border-border backdrop-blur-lg bg-card hover:shadow-lg transition duration-300">
                <div className="inline-block px-3 py-1 text-xs font-light rounded-full bg-gradient-to-r from-emerald-500 to-green-400 text-white mb-4">
                  Submissions
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[300px] p-4">
                    <h2 className="text-muted-foreground font-light text-sm mb-6">
                      {Object.values(heatmapData).reduce((sum, count) => sum + count, 0)} submissions in the past year
                    </h2>
                    <Heatmap data={heatmapData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable small component for info items
const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h3 className="text-sm text-purple-300 mb-1">{label}</h3>
    <p className="text-white break-words">{value}</p>
  </div>
);