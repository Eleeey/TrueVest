"use client";

import type React from "react";

import { useState, useRef, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  User,
  Mail,
  Phone,
  Shield,
  FileText,
  Check,
  Camera,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getClerkUser } from "@/actions/User";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  userName:z.string().min(2,{message:'username must be at least 2 characters'}),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
});


type ProfileFormParams = {
  firstName: any;
  lastName: any;
  email: any;
  verified: any;
  phone: any;
  fullName:any
};

export default function ProfileForm({firstName,lastName,email,verified,phone,fullName}:ProfileFormParams, ) {
  // const user= await getClerkUser()
  const [date, setDate] = useState<Date>();
  // const [kycStatus, setKycStatus] = useState<
  //   "not_started" | "pending" | "verified"
  // >("not_started");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      userName: fullName,
      email: email,
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Show success message
    alert("Profile updated successfully!");
  }



  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Account Settings</h1>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile">
            <Card className="bg-gray-900 border-gray-800 shadow-lg">
              <CardHeader className="border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-900/30 text-blue-400 border-blue-800 px-2 py-0"
                  >
                    Personal Info
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your account details and personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* <div className="w-full sm:w-auto flex flex-col items-center gap-3">
                    <div className="relative group">

                      <div className="absolute -bottom-2 -right-2 flex gap-2">
                        <Button
                          type="button"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
                          onClick={() => photoInputRef.current?.click()}
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Upload photo</span>
                        </Button>
                        {profilePhoto && (
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8 rounded-full shadow-lg"
                            onClick={handleRemovePhoto}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove photo</span>
                          </Button>
                        )}
                      </div>
                      <input
                        ref={photoInputRef}
                        type="file"
                        className="hidden"
                        onChange={handlePhotoChange}
                        accept="image/*"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Profile Photo</p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG or GIF (Max 2MB)
                      </p>
                    </div>
                  </div> */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-300">
                        First Name
                      </Label>
                      <div className="relative">
                        <Input
                          disabled
                          id="firstName"
                          defaultValue={firstName}
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                        />
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-300">
                        Last Name
                      </Label>
                      <div className="relative">
                        <Input
                          disabled
                          id="lastName"
                          defaultValue={lastName}
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                        />
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-300">
                        Username
                      </Label>
                      <div className="relative">
                        <Input
                          disabled
                          id="username"
                          defaultValue={fullName}
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                        />
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    {/*
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-gray-300">
                        Date of Birth
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white pl-10",
                              !date && "text-gray-500"
                            )}
                          >
                            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            {date ? format(date, "PPP") : "mm/dd/yyyy"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="bg-gray-800 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div> */}

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Input
                          disabled
                          id="email"
                          type="email"
                          placeholder={email}
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                        />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                  
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-6">
                <Button className="ml-auto bg-purple-600 hover:bg-purple-700 text-white">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-gray-900 border-gray-800 shadow-lg">
              <CardHeader className="border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-purple-900/30 text-purple-400 border-purple-800 px-2 py-0"
                  >
                    Security
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enhance your account security with 2FA protection.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-900/20 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">
                        Two-Factor Authentication (2FA)
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Add an extra layer of security to your account by
                        requiring both your password and an authentication code.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            twoFAEnabled
                              ? "bg-green-500 animate-pulse"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <span
                          className={`text-sm ${
                            twoFAEnabled ? "text-green-500" : "text-gray-500"
                          }`}
                        >
                          {twoFAEnabled ? "Enabled" : "Not enabled"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6 bg-gray-700" />
                  <Button
                    disabled={twoFAEnabled}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {twoFAEnabled ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> 2FA Enabled
                      </>
                    ) : (
                      <>OBTAIN KEY FOR 2FA</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <Card className="bg-gray-900 border-gray-800 shadow-lg">
              <CardHeader className="border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-900/30 text-green-400 border-green-800 px-2 py-0"
                  >
                    Verification
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">
                  KYC Verification
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Complete your identity verification to unlock all features.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-900/20 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">
                        Know Your Customer (KYC)
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Upload your identification documents to verify your
                        identity and comply with regulations.
                      </p>
                      {/* <div className="flex items-center gap-2 mt-2">
                        {kycStatus === "not_started" && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                            <span className="text-sm text-gray-500">
                              Not started
                            </span>
                          </>
                        )}
                        {kycStatus === "pending" && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                            <span className="text-sm text-yellow-500">
                              Verification in progress
                            </span>
                          </>
                        )}
                        {kycStatus === "verified" && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-green-500">
                              Verified
                            </span>
                          </>
                        )}
                      </div> */}
                    </div>
                  </div>
                  <Separator className="my-6 bg-gray-700" />
                  <Link href="/kyc">
                    <Button
                      disabled={verified === 0}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {verified === 2 ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Verification
                          complete
                        </>
                      ) : verified === 1 ? (
                        <>Processing...</>
                      ) : (
                        <>UPLOAD KYC</>
                      )}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
