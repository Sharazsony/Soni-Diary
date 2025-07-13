"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Lock, Unlock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { personalInfoService } from "@/lib/services"

export default function PersonalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchPersonalInfo()
    }
  }, [isAuthenticated])

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true)
      const data = await personalInfoService.get()
      setPersonalInfo(data)
    } catch (err) {
      console.error('Error fetching personal info:', err)
      setError('Failed to load personal information')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate against a stored password
    // This is just for demonstration
    if (password === "password123") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-blue-900 pb-20">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-teal-200 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">Personal Space</h1>
            <p className="text-lg text-teal-200">
              {isAuthenticated ? "Welcome to your private personal space" : "This area is password protected"}
            </p>
          </div>

          {!isAuthenticated ? (
            <Card className="mx-auto max-w-md bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-center text-white">Authentication Required</CardTitle>
                <CardDescription className="text-center text-teal-200">
                  Please enter your password to access this section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-teal-500/50 bg-teal-900/30 pr-10 text-white placeholder:text-teal-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-teal-300 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                  <Button type="submit" className="mt-4 w-full bg-teal-600 hover:bg-teal-700">
                    Unlock
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <CardDescription className="text-teal-200">Your private details</CardDescription>
                  </div>
                  <Unlock className="h-5 w-5 text-teal-400" />
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-teal-500/30">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-05%20at%2002.23.43_67fdda6f.jpg-YIHYiLoHdrxlcfOUBBpXmgHQxfetY7.jpeg"
                        alt="Profile picture"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(personalInfo).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-4">
                        <div className="text-sm font-medium text-teal-300">{key}</div>
                        <div className="col-span-2 text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="border-teal-500/50 text-teal-200 hover:bg-teal-800/50 hover:text-white"
                  >
                    Edit Information
                  </Button>
                </CardFooter>
              </Card>

              <Button
                variant="ghost"
                className="text-teal-200 hover:text-white"
                onClick={() => setIsAuthenticated(false)}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

