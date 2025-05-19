"use client"

import type React from "react"

import { ReactElement, useState } from "react"
import { FileText, Info, Shield, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { uploadFile } from "@uploadcare/upload-client"
import { redirect } from "next/navigation"

export default function SimplifiedKYC(verified:any) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [documentType, setDocumentType] = useState("passport")
  const [idFile, setIdFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setIdFile(file);
    setIsUploading(true);

    try {
      const result = await uploadFile(file, {
        publicKey: process.env.UPLOADCARE_PUBKEY, // 🔁 Replace with your actual Uploadcare public key
        store: "auto",
      });

      if (result.cdnUrl) {
        setPreviewUrl(result.cdnUrl);
        toast({
          title: "Upload Successful",
          description: "Your Id was uploaded successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload Id. Please try again.",
        variant: "destructive",
      });
      console.error("Uploadcare error:", error);
    } finally {
      setIsUploading(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // if (!firstName || !lastName) {
    //   toast({
    //     title: "Missing information",
    //     description: "Please provide your first and last name.",
    //     variant: "destructive",
    //   })
    //   return
    // }

    if (!idFile ) {
      toast({
        title: "Missing documents",
        description: "Please upload both front  side of your ID.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsVerified(true)
      toast({
        title: "Verification submitted",
        description: "Your ID verification has been submitted successfully.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {!isVerified ? (
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Identity Verification</CardTitle>
              <CardDescription>
                Please provide your information and upload your identification
                documents
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div> */}

                <div className="space-y-3">
                  <Label>Identification Document Type</Label>
                  <RadioGroup
                    defaultValue={documentType}
                    onValueChange={setDocumentType}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50">
                      <RadioGroupItem value="passport" id="passport" />
                      <Label
                        htmlFor="passport"
                        className="cursor-pointer flex-1"
                      >
                        Passport
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50">
                      <RadioGroupItem value="national_id" id="national_id" />
                      <Label
                        htmlFor="national_id"
                        className="cursor-pointer flex-1"
                      >
                        National ID Card
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50">
                      <RadioGroupItem
                        value="driving_license"
                        id="driving_license"
                      />
                      <Label
                        htmlFor="driving_license"
                        className="cursor-pointer flex-1"
                      >
                        Driving License
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-slate-50">
                      <RadioGroupItem
                        value="residence_permit"
                        id="residence_permit"
                      />
                      <Label
                        htmlFor="residence_permit"
                        className="cursor-pointer flex-1"
                      >
                        Residence Permit
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">Document Requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Documents must be valid and not expired</li>
                        <li>All information must be clearly visible</li>
                        <li>Files must be JPG, PNG, or PDF format (max 5MB)</li>
                        <li>No glare or shadows on the document</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Front of ID</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors">
                      {idFile ? (
                        <div className="space-y-2">
                          <FileText className="h-8 w-8 mx-auto text-emerald-500" />
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {idFile.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(idFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {verified === 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setIdFile(null)}
                            >
                              Change
                            </Button>
                          )}
                        </div>
                      ) : verified === 0 ? (
                        <label className="cursor-pointer block">
                          <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm font-medium text-slate-900">
                            Front side
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Click to upload
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={handleFileChange}
                          />
                        </label>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm font-medium text-slate-900">
                            Front side
                          </p>
                          <p className="text-xs text-slate-500 mt-1 text-muted">
                            Upload disabled
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <Label>Back of ID</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors">
                      {backIdFile ? (
                        <div className="space-y-2">
                          <FileText className="h-8 w-8 mx-auto text-emerald-500" />
                          <p className="text-sm font-medium text-slate-900 truncate">{backIdFile.name}</p>
                          <p className="text-xs text-slate-500">{(backIdFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          <Button type="button" variant="outline" size="sm" onClick={() => setBackIdFile(null)}>
                            Change
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm font-medium text-slate-900">Back side</p>
                          <p className="text-xs text-slate-500 mt-1">Click to upload</p>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={handleBackIdUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div> */}
                </div>

                <div className="flex items-center justify-center space-x-6 pt-2">
                  <div className="flex items-center text-sm text-slate-500">
                    <Shield className="h-4 w-4 mr-1.5" />
                    <span>Secure & Encrypted</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting || !idFile}
                >
                  {isSubmitting ? "Processing..." : "Submit Verification"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg  border-green-200 bg-green-50">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">
                Verification Submitted
              </CardTitle>
              <CardDescription className="text-green-700">
                Your identity verification has been submitted successfully
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center text-green-700">
              <p>We are reviewing your documents and will update you soon.</p>
              <p className="mt-2">This usually takes 24-48 hours.</p>

              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-medium text-slate-900">
                      {firstName} {lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Document Type</p>
                    <p className="font-medium text-slate-900 capitalize">
                      {documentType.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Submission Date</p>
                    <p className="font-medium text-slate-900">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <p className="font-medium text-amber-600">Under Review</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => redirect("/")}
              >
                Back to Verification
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
