import { getClerkUser, getUserHistory, getUserInfo } from "@/actions/User";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {
  BarChartIcon as ChartSpline,
  CreditCard,
  DollarSign,
  History,
  ArrowDown,
  ArrowUp,
  Settings,
  Superscript,
  Volume2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/shared/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    icon: <ChartSpline className="w-5 h-5" />,
    href: "/investment",
    label: "Investment",
  },
  {
    icon: <Superscript className="w-5 h-5" />,
    href: "/ranks",
    label: "Badges",
  },
  {
    icon: <Volume2 className="w-5 h-5" />,
    href: "/referral",
    label: "Referrals",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    href: "/settings",
    label: "Settings",
  },
];

export default async function Home() {
  const user = await getClerkUser();
  const bal = await getUserInfo();
  const userHistory = await getUserHistory();
  const estimatedAmmount = 0;
  const total = (estimatedAmmount / bal) * 100;
  const profit = bal?.Balance - bal?.deposit// Fallback to 15000 if no user or balance

  return (
    <>
      {/* Mobile Layout */}
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white ">
        {/* Header */}
        <header className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div>
              <h2 className="font-medium">Hello {user?.firstName || ""}</h2>
              <div className="flex items-center">
                <span className="text-xs text-emerald-400">Level 1</span>
              </div>
            </div>
          </div>
          <Link href={user ? "/settings" : "/sign-in"}>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Settings className="h-6 w-6" />
            </Button>
          </Link>
        </header>
        {bal?.verified === 0 && (
          <div className="bg-amber-900/30 border-b border-amber-800/50 p-3 flex items-center justify-center text-sm">
            
            <span className="text-amber-200">
              Please verify your identity to unlock all referral features
            </span>
            <Button variant="link" className="text-amber-400 font-medium ml-1 h-auto p-0">
              Submit Now <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        )}

        {/* Main Content */}
        <main className="container max-w-md mx-auto p-4 space-y-6">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400 flex items-center gap-1.5">
                <CreditCard className="h-4 w-4" />
                Balance in USD
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <h1 className="text-5xl font-bold tracking-tighter">
                    ${user ? Number(bal?.Balance).toLocaleString() : "0"}.00
                  </h1>
                  {/* <span className="absolute -top-2 right-0 text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                    +2.4%
                  </span> */}
                </div>
                {/* <div className="w-full mt-6">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Goal</span>
                    <span>$20,000</span>
                  </div>
                  <Progress value={total} className="h-2 bg-slate-700" />
                </div> */}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 pt-6">
              <Link href={user ? "/deposit" : "/sign-in"} className="flex-1">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Deposit
                </Button>
              </Link>
              <Link href={user ? "/withdrawal" : "/sign-in"} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-800"
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-3 flex flex-col items-center">
                <div className="bg-emerald-500/20 p-2 rounded-full mb-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">Capital</p>
                <p className="font-medium">
                  ${user ? Number(bal?.deposit).toLocaleString() : "0"}.00
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-3 flex flex-col items-center">
                <div className="bg-rose-500/20 p-2 rounded-full mb-2">
                  <ArrowUp className="h-5 w-5 text-rose-400" />
                </div>
                <p className="text-xs text-slate-400">Profit</p>
                <p className="font-medium">${profit}.00</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-3 flex flex-col items-center">
                <div className="bg-amber-500/20 p-2 rounded-full mb-2">
                  <History className="h-5 w-5 text-amber-400" />
                </div>
                <p className="text-xs text-slate-400">Withdrawable Balance</p>
                <p className="font-medium">{bal?.Balance}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700 flex flex-col space-around">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {userHistory && userHistory.length > 0 ? (
          userHistory.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-t-white py-1 mb-2">
              <div className="flex items-center gap-3">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      !item.confirmed ? "text-yellow-500" : item.type === "credit" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {!item.confirmed ? "Pending" : item.type === "credit" ? "Deposit" : "Withdrawal"}
                  </p>
                  <p className="text-xs text-slate-400">{new Date(item.date).toLocaleString()}</p>
                </div>
              </div>
              <p className={`font-medium ${item.type === "credit" ? "text-green-400" : "text-red-400"}`}>
                <span>{item.type === "credit" ? "+" : "-"}</span>
                {item.amount}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 h-full">Sorry, you don't have any transactions.</p>
        )}
      </CardContent>
    {/*  <CardFooter>
        <Link href={"/transactions"}>
          <Button  className="w-full text-slate-400 hover:text-white">
            View All Transactions
          </Button>
        </Link>
      </CardFooter>*/}
    </Card>
        </main>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2">
          <div className="flex justify-around max-w-md mx-auto">
            {navItems.map((item, i) => (
              <Link href={user ? item.href : "/sign-in"} key={i}>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center py-2 h-auto relative"
                >
                  <div className="relative">
                    {item.icon}
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400" />
                  </div>
                  <span className="text-xs mt-1">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
