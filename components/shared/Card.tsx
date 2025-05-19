import React from 'react';
import Link from "next/link";


const plans = [
  {
    id: 1,
    name: "Tier 1",
    badge: "01",
    returnRate: "Weekly 50%",
    investment: "$50–$999",

  },
  {
    id: 2,
    name: "Tier 2",
    badge: "02",
    returnRate: "Weekly 60%",
    investment: "$1000–$2999",

  },
  {
    id: 3,
    name: "Tier 3",
    badge: "03",
    returnRate: "Weekly 65%",
    investment: "$3000–$4999"

  },
  {
    id: 4,
    name: "Tier 4",
    badge: "04",
    returnRate: "Weekly 70%",
    investment: "$5000–$9999",

  },
  {
    id: 5,
    name: "Tier 5",
    badge: "05",
    returnRate: "Weekly 75%",
    investment: "$10000–$19999",

  },
  {
    id: 6,
    name: "Tier 6",
    badge: "06",
    returnRate: "Weekly 80%",
    investment: "$20000–$49999",

  },
];
const InvestmentCard = () => {
  return (
    <div className="bg-[#0F2B36] min-h-screen flex flex-col space-around gap-10 justify-center p-4">
  {plans.map((plan) => (
    <div
      key={plan.id}
      className="bg-[#102D3E] text-white rounded-xl shadow-xl p-6 w-full max-w-md border border-pink-500 relative"
    >
      {/* Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-br from-pink-500 to-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
        {plan.badge}
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/favicon.png"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Plan Name */}
      <h2 className="text-xl font-semibold text-center">{plan.name}</h2>
      <p className="text-yellow-400 text-center text-sm mb-4">{plan.returnRate}</p>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Investment</span>
          <span className="bg-green-600 px-2 py-1 rounded-full text-white">{plan.investment}</span>
        </div>
        <div className="flex justify-between">
          <span>Capital Back</span>
          <span>Yes</span>
        </div>
        <div className="flex justify-between">
          <span>Return Type</span>
          <span>Period</span>
        </div>
        <div className="flex justify-between">
          <span>Number of Period</span>
          <span>1 Time</span>
        </div>
        <div className="flex justify-between">
          <span>Profit Withdraw</span>
          <span>Anytime</span>
        </div>
        <div className="flex justify-between">
          <span>Cancel</span>
          <span>No</span>
        </div>
      </div>

      {/* Note */}
      <p className="text-yellow-400 text-xs my-4 text-center">* No Profit Holidays</p>

      {/* Button */}
      <Link href="/Deposit" className="mt-10">
        <button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-full font-semibold">
          ✓ INVEST NOW
        </button>
      </Link>
    </div>
  ))}
</div>

  );
};

export default InvestmentCard;
