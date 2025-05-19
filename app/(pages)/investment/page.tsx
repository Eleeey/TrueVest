import { BarChart3, Check, Clock, DollarSign, HelpCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function InvestmentPlans() {
  const plans = [
    {
      id: "01",
      tier: "Tier 1",
      return: "50%",
      period: "Weekly",
      minMax: "$50-$999",
      capitalBack: "Yes",
      returnType: "Period",
      numberOfPeriod: "1 Time",
      profitWithdraw: "Anytime",
      cancel: "No",
    },
    {
      id: "02",
      tier: "Tier 2",
      return: "60%",
      period: "Weekly",
      minMax: "$1000-$2999",
      capitalBack: "Yes",
      returnType: "Period",
      numberOfPeriod: "1 Time",
      profitWithdraw: "Anytime",
      cancel: "No",
    },
    {
      id: "03",
      tier: "Tier 3",
      return: "65%",
      period: "Weekly",
      minMax: "$3000–$4999",
      capitalBack: "Yes",
      returnType: "Period",
      numberOfPeriod: "1 Time",
      profitWithdraw: "Anytime",
      cancel: "No",

    },
    {
      id: "04",
      tier: "Tier 4",
      return: "70%",
      period: "Weekly",
      minMax: "$5000–$9999",
      capitalBack: "Yes",
      returnType: "Period",
      numberOfPeriod: "1 Time",
      profitWithdraw: "Anytime",
      cancel: "No",
    },
    {
      id: "05",
      tier: "Tier 5",
      return: "75%",
      period: "Weekly",
      minMax: "$10000–$19999",
      capitalBack: "Yes",
      returnType: "Period",
      numberOfPeriod: "1 Time",
      profitWithdraw: "Anytime",
      cancel: "No",

    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-4 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Investment Plans</h1>
        <p className="text-slate-400">Choose a plan that fits your investment goals</p>
      </header>

      <div className="space-y-6 max-w-md mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="border-[1px] border-purple-500/30 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden"
          >
            

            <CardHeader className="pb-0">
              <div className="flex flex-col items-center">
                <div className="bg-indigo-600/20 p-3 rounded-full mb-2">
                  <BarChart3 className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{plan.tier}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400 font-bold">
                    {plan.period} {plan.return}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expected return over the investment period</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="bg-emerald-500/20 text-emerald-400 font-medium text-center py-1.5 rounded-md mb-4">
                {plan.minMax}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span>Capital Back</span>
                  </div>
                  <span className="text-white font-medium">{plan.capitalBack}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Return Type</span>
                  </div>
                  <span className="text-white font-medium">{plan.returnType}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <HelpCircle className="h-4 w-4 text-slate-400" />
                    <span>Number of Period</span>
                  </div>
                  <span className="text-white font-medium">{plan.numberOfPeriod}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span>Profit Withdraw</span>
                  </div>
                  <span className="text-white font-medium">{plan.profitWithdraw}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <HelpCircle className="h-4 w-4 text-slate-400" />
                    <span>Cancel</span>
                  </div>
                  <span className="text-white font-medium">{plan.cancel}</span>
                </div>
              </div>

              <div className="mt-4 text-yellow-500 text-xs flex items-center gap-1">
                <Info className="h-3 w-3" />
                <span>No Profit Holidays</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-orange-400 hover:from-fuchsia-600 hover:to-orange-500 text-white font-medium">
                <Check className="mr-2 h-4 w-4" /> INVEST NOW
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
