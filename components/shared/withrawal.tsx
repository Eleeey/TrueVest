"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, ArrowDownCircle, CheckCircle, Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { updateAfterWithdrawal } from "@/actions/User"
import { redirect } from "next/navigation"

type CryptoType = "bitcoin" | "ethereum" | "usdt"

interface WithdrawalFormProps {
  balance: number
  verified:number
  // onWithdraw?: (amount: number, cryptoType: CryptoType, walletAddress: string) => Promise<void> | void
}

export default function WithdrawalForm({ balance,verified }: WithdrawalFormProps) {
  const [amount, setAmount] = useState<string>("")
  const [cryptoType, setCryptoType] = useState<CryptoType>("bitcoin")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addressError, setAddressError] = useState<string | null>(null)

  const numericAmount = parseFloat(amount)
  const isAmountValid = !isNaN(numericAmount) && numericAmount > 0 && numericAmount <= balance
  const isWalletAddressValid = validateWalletAddress(walletAddress, cryptoType)
  const canSubmit = balance > 0 && isAmountValid && isWalletAddressValid && !isSubmitting

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
      setError(null)
    }
  }

  const handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setWalletAddress(value)
    setAddressError(null)
  }

  function validateWalletAddress(address: string, type: CryptoType): boolean {
    if (!address) return false

    switch (type) {
      case "bitcoin":
        // Basic Bitcoin address validation (starts with 1, 3, or bc1 and is 26-35 characters)
        return /^(1|3|bc1)[a-zA-Z0-9]{25,59}$/.test(address)
      case "ethereum":
      case "usdt": // USDT on ERC-20 uses Ethereum addresses
        // Basic Ethereum address validation (starts with 0x and is 42 characters)
        return /^0x[a-fA-F0-9]{40}$/.test(address)
      default:
        return false
    }
  }

  const validateAmount = () => {
    if (amount === "") {
      setError("Please enter an amount")
      return false
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount")
      return false
    }

    if (numericAmount > balance) {
      setError("Amount exceeds available balance")
      return false
    }

    return true
  }

  const validateAddress = () => {
    if (!walletAddress) {
      setAddressError("Please enter a wallet address")
      return false
    }

    if (!validateWalletAddress(walletAddress, cryptoType)) {
      setAddressError(`Invalid ${getCryptoName(cryptoType)} wallet address`)
      return false
    }

    return true
  }

  const getCryptoName = (type: CryptoType): string => {
    switch (type) {
      case "bitcoin":
        return "Bitcoin"
      case "ethereum":
        return "Ethereum"
      case "usdt":
        return "USDT (Tether)"
      default:
        return type
    }
  }

  const getCryptoIcon = (type: CryptoType): string => {
    switch (type) {
      case "bitcoin":
        return "₿"
      case "ethereum":
        return "Ξ"
      case "usdt":
        return "₮"
      default:
        return "$"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()



    try {
      if (!validateAmount()) return
      if (!validateAddress()) return

      setIsSubmitting(true)
      setError(null)
      setAddressError(null)
      await updateAfterWithdrawal(amount)

      // Show success s
      setSuccess(true)
      toast({
        title: "Withdrawal Initiated",
        description: `$${numericAmount.toFixed(2)} worth of ${getCryptoName(cryptoType)} has been sent to your wallet.`,
        variant: "default",
      })

      // Reset form after 2 seconds
      setTimeout(() => {
        setAmount("")
        setWalletAddress("")
        setSuccess(false)
      }, 2000)
      redirect("/")
    } catch (err) {
      setError("Failed to process withdrawal. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
      variant: "default",
    })
  }

  return (
    <>
    {verified !== 2 && (
  <div className="bg-amber-900/30 border-b border-amber-800/50 p-3 flex items-center justify-center text-sm rounded-t-md">
    <AlertCircle className="w-4 h-4 mr-2 text-amber-400" />
    <span className="text-amber-200">
      Please complete verification to access withdrawal features
    </span>
  </div>
)}
    <div className={verified !== 2 ? "pointer-events-none opacity-50" : ""}>
  <Card className="w-full max-w-md bg-slate-800 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="text-xl">Withdraw Funds</CardTitle>
        <CardDescription className="text-slate-400">
          Transfer money from your account to your crypto wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Available Balance</span>
            <span className="text-xl font-semibold">${balance}</span>
          </div>
        </div>

        {balance === 0 ? (
          <div className="flex items-start gap-2 p-3 bg-slate-900/50 rounded-lg mb-4">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
            <p className="text-sm text-slate-300">You have no funds available for withdrawal.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Withdrawal Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="pl-7 bg-slate-900 border-slate-700 text-white"
                    placeholder="0.00"
                    disabled={isSubmitting || balance === 0 || success}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" /> {error}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Select Cryptocurrency</Label>
                <RadioGroup
                  value={cryptoType}
                  onValueChange={(value) => setCryptoType(value as CryptoType)}
                  className="grid grid-cols-3 gap-2"
                  disabled={isSubmitting || success}
                >
                  <div>
                    <RadioGroupItem
                      value="bitcoin"
                      id="bitcoin"
                      className="peer sr-only"
                      disabled={isSubmitting || success}
                    />
                    <Label
                      htmlFor="bitcoin"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-900 p-3 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-900/20 [&:has([data-state=checked])]:border-orange-500"
                    >
                      <span className="text-2xl mb-1">₿</span>
                      <span className="text-sm font-medium">Bitcoin</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="ethereum"
                      id="ethereum"
                      className="peer sr-only"
                      disabled={isSubmitting || success}
                    />
                    <Label
                      htmlFor="ethereum"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-900 p-3 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-900/20 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <span className="text-2xl mb-1">Ξ</span>
                      <span className="text-sm font-medium">Ethereum</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="usdt"
                      id="usdt"
                      className="peer sr-only"
                      disabled={isSubmitting || success}
                    />
                    <Label
                      htmlFor="usdt"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-900 p-3 hover:bg-slate-800 hover:border-slate-600 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-900/20 [&:has([data-state=checked])]:border-green-500"
                    >
                      <span className="text-2xl mb-1">₮</span>
                      <span className="text-sm font-medium">USDT</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="walletAddress">{getCryptoName(cryptoType)} Wallet Address</Label>
                  {walletAddress && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 text-xs text-slate-400 hover:text-white"
                      onClick={handleCopyAddress}
                    >
                      <Copy className="h-3 w-3 mr-1" /> Copy
                    </Button>
                  )}
                </div>
                <Input
                  id="walletAddress"
                  type="text"
                  value={walletAddress}
                  onChange={handleWalletAddressChange}
                  className="bg-slate-900 border-slate-700 text-white font-mono text-sm"
                  placeholder={
                    cryptoType === "bitcoin"
                      ? "e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                      : "e.g. 0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                  }
                  disabled={isSubmitting || success}
                />
                {addressError && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" /> {addressError}
                  </p>
                )}
                <p className="text-xs text-slate-400">
                  {cryptoType === "bitcoin"
                    ? "Enter a valid Bitcoin (BTC) address"
                    : cryptoType === "ethereum"
                      ? "Enter a valid Ethereum (ETH) address"
                      : "Enter a valid USDT address (ERC-20)"}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                disabled={!canSubmit || success}
              >
                {isSubmitting ? (
                  "Processing..."
                ) : success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Withdrawal Initiated
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ArrowDownCircle className="h-4 w-4" /> Withdraw to {getCryptoName(cryptoType)} Wallet
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t border-slate-700 text-xs text-slate-400 pt-4">
        <p>Crypto withdrawals typically process within 10-30 minutes</p>
        <p className="text-amber-400">
          Important: Always double-check your wallet address before confirming the withdrawal
        </p>
      </CardFooter>
    </Card>
    </div>
    </>
  )
}
