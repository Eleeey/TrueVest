"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Award, CheckCircle, LockIcon, TrendingUp, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function BadgesDisplay() {
  const [activeTab, setActiveTab] = useState("all")
  const [claimedRewards, setClaimedRewards] = useState<number[]>([])

  const badges = [
    {
      id: 1,
      name: "Monance Member",
      description: "Make your first deposit on the app",
      level: "bronze",
      icon: "🥉",
      category: "account",
      unlocked: false,
      reward: {
        type: "bonus",
        value: "$200 account credit",
        description: "Get a $200 bonus added to your account",
      },
    },
    {
      id: 2,
      name: "Monance Leader",
      description: "By earning $1000 from the site",
      level: "silver",
      icon: "🥈",
      category: "earnings",
      unlocked: false,
      reward: {
        type: "discount",
        value: "10% fee reduction",
        description: "Enjoy 10% off on all transaction fees",
      },
    },
    {
      id: 3,
      name: "Monance Champion",
      description: "By earning $5000 from the site",
      level: "gold",
      icon: "🥇",
      category: "earnings",
      unlocked: false,
      reward: {
        type: "premium",
        value: "Premium membership",
        description: "Access exclusive features and priority support",
      },
    },
    {
      id: 4,
      name: "Community Contributor",
      description: "By referring 10 new members",
      level: "bronze",
      icon: "🥉",
      category: "community",
      unlocked: false,
      reward: {
        type: "cashback",
        value: "2% cashback",
        description: "Earn 2% cashback on all transactions for 30 days",
      },
    },
  ]

  const filteredBadges = activeTab === "all" ? badges : badges.filter((badge) => badge.category === activeTab)
  const unlockedCount = badges.filter((badge) => badge.unlocked).length
  const progressPercentage = (unlockedCount / badges.length) * 100

  const handleClaimReward = (badgeId: number) => {
    if (!claimedRewards.includes(badgeId)) {
      setClaimedRewards([...claimedRewards, badgeId])

      const badge = badges.find((b) => b.id === badgeId)
      toast({
        title: "Reward Claimed!",
        description: `You've successfully claimed: ${badge?.reward.value}`,
        variant: "default",
      })
    }
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "bonus":
        return <Gift className="h-4 w-4 text-green-400" />
      case "discount":
        return <TrendingUp className="h-4 w-4 text-blue-400" />
      case "premium":
        return <Award className="h-4 w-4 text-purple-400" />
      case "cashback":
        return <TrendingUp className="h-4 w-4 text-amber-400" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Achievement Badges</h1>
          <p className="text-slate-300">Track your progress and earn rewards</p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full bg-slate-800/50 rounded-xl p-1">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-slate-700">
              All
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-lg data-[state=active]:bg-slate-700">
              Account
            </TabsTrigger>
            <TabsTrigger value="earnings" className="rounded-lg data-[state=active]:bg-slate-700">
              Earnings
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg data-[state=active]:bg-slate-700">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBadges.map((badge) => (
                <div key={badge.id}>
                  <Card
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      badge.unlocked
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600"
                        : "bg-slate-900/50 border-slate-800 opacity-70"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`
                            flex items-center justify-center w-16 h-16 rounded-full
                            ${badge.level === "gold" ? "bg-gradient-to-br from-yellow-300 to-yellow-600" : ""}
                            ${badge.level === "silver" ? "bg-gradient-to-br from-slate-300 to-slate-500" : ""}
                            ${badge.level === "bronze" ? "bg-gradient-to-br from-amber-500 to-amber-700" : ""}
                          `}
                        >
                          <span className="text-3xl">{badge.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-white text-lg">{badge.name}</h3>
                            {badge.unlocked ? (
                              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" /> Unlocked
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-700">
                                <LockIcon className="h-3 w-3 mr-1" /> Locked
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm mt-1">{badge.description}</p>

                          {/* Reward Section */}
                          <div
                            className={`mt-4 p-3 rounded-lg ${badge.unlocked ? "bg-slate-800/70" : "bg-slate-900/70"}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {getRewardIcon(badge.reward.type)}
                              <span className="text-sm font-medium text-white">Reward: {badge.reward.value}</span>
                            </div>
                            <p className="text-xs text-slate-400">{badge.reward.description}</p>

                            {badge.unlocked && (
                              <Button
                                size="sm"
                                variant={claimedRewards.includes(badge.id) ? "outline" : "default"}
                                className={`mt-2 w-full ${
                                  claimedRewards.includes(badge.id)
                                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                                }`}
                                onClick={() => handleClaimReward(badge.id)}
                                disabled={claimedRewards.includes(badge.id)}
                              >
                                {claimedRewards.includes(badge.id) ? "Reward Claimed" : "Claim Reward"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-slate-800/30 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Your Progress</h2>
            <Badge variant="outline" className="bg-slate-800 border-slate-700">
              {unlockedCount} of {badges.length} completed
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-white text-sm">{progressPercentage.toFixed(0)}%</span>
          </div>

          <div className="mt-4 flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                {unlockedCount === 0
                  ? "Complete your first badge to earn rewards!"
                  : unlockedCount === badges.length
                    ? "Congratulations! You've unlocked all badges and rewards."
                    : `You've unlocked ${unlockedCount} of ${badges.length} badges. Keep going to earn more rewards!`}
              </p>
              {unlockedCount > 0 && claimedRewards.length < unlockedCount && (
                <p className="text-amber-400 text-xs mt-1">
                  You have {unlockedCount - claimedRewards.length} unclaimed rewards!
                </p>
              )}
            </div>
          </div>

          {unlockedCount < badges.length && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-white mb-2">Next achievements to unlock:</h3>
              <div className="space-y-2">
                {badges
                  .filter((b) => !b.unlocked)
                  .slice(0, 2)
                  .map((badge) => (
                    <div key={badge.id} className="flex items-center gap-2 text-sm text-slate-400">
                      <LockIcon className="h-3 w-3" />
                      <span>
                        {badge.name} - {badge.description}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
