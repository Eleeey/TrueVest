"use client"

import { useState } from "react"
import {
  ClipboardCopy,
  Network,
  Share2,
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Facebook,
  Twitter,
  Mail,
  Linkedin,
  Copy,
  Check,
  ArrowUpRight,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

const ReferralDashboard = () => {
  const [referralUrl] = useState("https://securemonance.com/ref/{johndoe123}")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showShareOptions, setShowShareOptions] = useState(false)

  // Sample data for the dashboard
  const stats = [
    { title: "Total Referrals", value: "0", icon: Users, change: "+0%", color: "text-blue-500" },
    { title: "Active Referrals", value: "0", icon: Network, change: "+0%", color: "text-green-500" },
    { title: "Conversion Rate", value: "0%", icon: TrendingUp, change: "+0%", color: "text-purple-500" },
    { title: "Total Earnings", value: "$0.00", icon: DollarSign, change: "+$0.00", color: "text-pink-500" },
  ]

  const referralLevels = [
    { level: 1, commission: "5%", referrals: 0, earnings: "$0.00" },
    { level: 2, commission: "3%", referrals: 0, earnings: "$0.00" },
    { level: 3, commission: "1%", referrals: 0, earnings: "$0.00" },
  ]

  const recentReferrals = []

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    toast({
      title: "Referral link copied!",
      description: "Your referral link has been copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareVia = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent("Join me on SecureMonance!")}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent("Join me on SecureMonance!")}&body=${encodeURIComponent(`I thought you might be interested in this: ${referralUrl}`)}`
        break
    }

    if (shareUrl) window.open(shareUrl, "_blank")
    setShowShareOptions(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">


      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Referral Program</h1>
            <p className="text-gray-400">Invite friends and earn rewards</p>
          </div>
          <Badge
            variant="outline"
            className="bg-pink-950/30 text-pink-400 border-pink-900 px-3 py-1.5 text-sm font-medium"
          >
            TOTAL EARNINGS: $0.00 USD
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">{stat.change} this month</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color.replace("text", "bg")}/10`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Referral URL Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Referral Link</CardTitle>
            <CardDescription>Share this link with friends to earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input value={referralUrl} readOnly className="pr-10 bg-gray-800 border-gray-700 text-white" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={copyToClipboard}>
                  <ClipboardCopy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => setShowShareOptions(!showShareOptions)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>

                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                      <div className="p-2">
                        <button
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded-md text-left"
                          onClick={() => shareVia("facebook")}
                        >
                          <Facebook className="w-4 h-4 text-blue-500" />
                          <span>Facebook</span>
                        </button>
                        <button
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded-md text-left"
                          onClick={() => shareVia("twitter")}
                        >
                          <Twitter className="w-4 h-4 text-blue-400" />
                          <span>Twitter</span>
                        </button>
                        <button
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded-md text-left"
                          onClick={() => shareVia("linkedin")}
                        >
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <span>LinkedIn</span>
                        </button>
                        <button
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded-md text-left"
                          onClick={() => shareVia("email")}
                        >
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>Email</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-pink-900/20 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h4 className="font-medium">Referral Program Tiers</h4>
                  <p className="text-sm text-gray-400">Earn up to 5% commission on referrals</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {referralLevels.map((level, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-gray-800 h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium">
                      {level.level}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          Level {level.level} - {level.commission} Commission
                        </span>
                        <span className="text-gray-400">{level.referrals} referrals</span>
                      </div>
                      <Progress
                        value={0}
                        max={100}
                        className="h-1.5 mt-1 bg-gray-700"
              
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Referral Data */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 border-b border-gray-700 w-full justify-start rounded-none p-0 h-auto">
            <TabsTrigger
              value="overview"
              className={`rounded-none border-b-2 px-4 py-2 ${
                activeTab === "overview" ? "border-pink-500 text-pink-500" : "border-transparent text-gray-400"
              }`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tree"
              className={`rounded-none border-b-2 px-4 py-2 ${
                activeTab === "tree" ? "border-pink-500 text-pink-500" : "border-transparent text-gray-400"
              }`}
            >
              Referral Tree
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className={`rounded-none border-b-2 px-4 py-2 ${
                activeTab === "logs" ? "border-pink-500 text-pink-500" : "border-transparent text-gray-400"
              }`}
            >
              Referral Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Recent Referrals</CardTitle>
                  <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentReferrals.length > 0 ? (
                  <div className="space-y-4">{/* Referral list would go here */}</div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium text-gray-300">No referrals yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mt-1">
                      Share your referral link with friends to start earning rewards.
                    </p>
                    <Button className="mt-4 bg-pink-600 hover:bg-pink-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Your Link
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tree" className="pt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Referral Network</CardTitle>
                <CardDescription>Visualize your referral network structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Network className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                  <h3 className="text-lg font-medium text-gray-300">No referral network yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-1">
                    Your referral tree will be displayed here once you have active referrals.
                  </p>
                  <Button className="mt-4 bg-pink-600 hover:bg-pink-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="pt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Referral Logs</CardTitle>
                    <CardDescription>Track all your referral activities</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search logs..."
                        className="pl-9 bg-gray-800 border-gray-700 text-white w-[200px]"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-gray-800 border-gray-700">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem>All Logs</DropdownMenuItem>
                        <DropdownMenuItem>Commissions</DropdownMenuItem>
                        <DropdownMenuItem>Sign Ups</DropdownMenuItem>
                        <DropdownMenuItem>Conversions</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ClipboardCopy className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                  <h3 className="text-lg font-medium text-gray-300">No referral logs yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-1">
                    Your referral activities will be displayed here once you start referring users.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How It Works Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-pink-900/20 p-4 rounded-full mb-4">
                  <Share2 className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-medium mb-2">1. Share Your Link</h3>
                <p className="text-gray-400 text-sm">
                  Share your unique referral link with friends, on social media, or your website.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-pink-900/20 p-4 rounded-full mb-4">
                  <Users className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-medium mb-2">2. Friends Sign Up</h3>
                <p className="text-gray-400 text-sm">
                  When someone uses your link to sign up, they're added to your referral network.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-pink-900/20 p-4 rounded-full mb-4">
                  <DollarSign className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-medium mb-2">3. Earn Rewards</h3>
                <p className="text-gray-400 text-sm">
                  Earn commissions when your referrals make transactions on the platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ReferralDashboard
