"use client"

import type React from "react"
import { useState, useRef } from "react"
import { uploadFile } from "@uploadcare/upload-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Copy, Upload, Check, AlertCircle, DollarSign, Bitcoin, Wallet } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { updateAfterDeposit } from "@/actions/User"

export default function PaymentForm() {
  const [amount, setAmount] = useState(0)
  const [receipt, setReceipt] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const walletAddresses = [
    { id: 1, address: "0x2709a94b97bfa4fe2055f240fc449694655f9c1e", type: "USDT" },
    { id: 2, address: "bc1qynpxz4em4qmqzqth286s4uqawldj4ze4r0mur5", type: "BTC" },
    { id: 3, address: "0x2709a94b97bfa4fe2055f240fc449694655f9c1e", type: "ETH" },
  ]

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
    alert('wallet copied')
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    setReceipt(file)
    setIsUploading(true)
    const publicKey = process.env.UPLOADCARE_PUBKEY;
if (!publicKey) {
  throw new Error("UPLOADCARE_PUBKEY is not set in the environment variables");
}


    try {
      const result = await uploadFile(file, {
        publicKey, // 🔁 Replace with your actual Uploadcare public key
        store: "auto",
      });

      if (result.cdnUrl) {
        setPreviewUrl(result.cdnUrl)
        toast({
          title: "Upload Successful",
          description: "Your receipt was uploaded successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload receipt. Please try again.",
        variant: "destructive",
      })
      console.error("Uploadcare error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !previewUrl) {
      toast({
        title: "Missing Information",
        description: "Please enter an amount and upload a receipt",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    await updateAfterDeposit(amount, previewUrl)

    toast({
      title: "Deposit Submitted",
      description: "Your deposit has been submitted for verification",
    })

    setIsUploading(false)
    setAmount(0)
    setReceipt(null)
    setPreviewUrl("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Deposit Funds</h1>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-xl">Make a Deposit</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="amount" className="text-lg font-medium">
                  How much Are you Depositing:
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="pl-10 py-6 text-lg bg-gray-800 border-gray-700 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Please choose your currency and make payment to any of the wallets
                </h3>
                <p>To ensure seamless transactions all deposits are to crpto wallets</p>

                <Tabs defaultValue="trc20" className="w-full">
                  <TabsList className="grid grid-cols-3 bg-gray-800">
                    <TabsTrigger value="trc20">TRC20</TabsTrigger>
                    <TabsTrigger value="btc">BTC</TabsTrigger>
                    <TabsTrigger value="eth">ETH</TabsTrigger>
                  </TabsList>

                  {walletAddresses.map((wallet) => (
                    <TabsContent
                      key={wallet.id}
                      value={wallet.type.toLowerCase()}
                      className="mt-4"
                    >
                      <Card className="bg-gray-800 border-gray-700">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-gray-400">
                            Wallet Address {wallet.id}:
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-2">
                            {wallet.type === "BTC" && (
                              <Bitcoin className="h-5 w-5 text-orange-500" />
                            )}
                            {wallet.type === "TRC20" && (
                              <Wallet className="h-5 w-5 text-green-500" />
                            )}
                            {wallet.type === "ETH" && (
                              <Wallet className="h-5 w-5 text-blue-500" />
                            )}
                            <code className="bg-gray-900 p-3 rounded-md text-sm font-mono w-full overflow-x-auto">
                              {wallet.address}
                            </code>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            className="w-full bg-gray-700 hover:bg-gray-600 border-gray-600"
                            onClick={() => handleCopyAddress(wallet.address)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Address {wallet.id}
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800">
                <Label htmlFor="receipt" className="text-lg font-medium">
                  Upload Payment Receipt for Verification
                </Label>

                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    id="receipt"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />

                  {previewUrl ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-green-500">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Receipt uploaded</span>
                      </div>
                      <div className="relative max-w-xs mx-auto">
                        <img
                          src={previewUrl}
                          alt="Receipt preview"
                          className="max-h-48 rounded-md mx-auto object-contain"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-gray-800/80"
                          onClick={(e) => {
                            e.stopPropagation()
                            setReceipt(null)
                            setPreviewUrl("")
                            if (fileInputRef.current)
                              fileInputRef.current.value = ""
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-10 w-10 mx-auto text-gray-500" />
                      <p className="text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Upload a screenshot or photo of your payment receipt
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 bg-blue-900/20 border border-blue-800/30 rounded-md p-3">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-300">
                    Your deposit will be processed after receipt verification.
                    Please ensure your receipt clearly shows the transaction
                    details.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                disabled={isUploading || !amount || !previewUrl}
              >
                {isUploading ? "Processing..." : "Submit Deposit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
