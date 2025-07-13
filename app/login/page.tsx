"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<Date | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if account is locked out
    if (lockoutUntil && new Date() < lockoutUntil) {
      const timeLeft = Math.ceil((lockoutUntil.getTime() - new Date().getTime()) / 1000 / 60)
      toast({
        title: "Account temporarily locked",
        description: `Too many failed attempts. Please try again in ${timeLeft} minutes.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(username)
        toast({
          title: "Login successful",
          description: "Welcome back to your dream diary!",
        })
        router.push("/admin/dashboard")
        // Reset login attempts on successful login
        setLoginAttempts(0)
      } else {
        // Increment failed login attempts
        const attempts = loginAttempts + 1
        setLoginAttempts(attempts)

        // If too many failed attempts, lock the account temporarily
        if (attempts >= 5) {
          const lockout = new Date()
          lockout.setMinutes(lockout.getMinutes() + 15) // Lock for 15 minutes
          setLockoutUntil(lockout)
          throw new Error("Too many failed login attempts. Account locked for 15 minutes.")
        }

        throw new Error(data.message || "Invalid credentials")
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-purple-200 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mx-auto max-w-md">
          <Card className="bg-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white">Admin Login</CardTitle>
              <CardDescription className="text-purple-200">Sign in to manage your dream diary content</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-purple-200">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-purple-500/50 bg-purple-900/30 text-white placeholder:text-purple-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-purple-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-purple-500/50 bg-purple-900/30 text-white placeholder:text-purple-300"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-purple-300">Secure login area - Please enter your credentials</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

