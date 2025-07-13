"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Film, PenTool, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import AdminHeader from "@/components/admin-header"

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <AdminHeader title="Admin Dashboard" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <PenTool className="mr-2 h-5 w-5" />
                Poetry Management
              </CardTitle>
              <CardDescription className="text-purple-200">Add, edit, or delete your poems</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-100">
                Manage your poetry collection. Add new poems, update existing ones, or remove poems you no longer want
                to display.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/poetry" className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Manage Poetry</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Film className="mr-2 h-5 w-5" />
                Movie Collection
              </CardTitle>
              <CardDescription className="text-purple-200">Update your favorite movies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-100">
                Add new movies to your collection, edit movie details like ratings and descriptions, or remove movies
                from your list.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/movies" className="w-full">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Manage Movies</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="mr-2 h-5 w-5" />
                Book Collection
              </CardTitle>
              <CardDescription className="text-purple-200">Manage your reading list</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-100">
                Keep your book collection up to date by adding new books you've read, updating details, or removing
                books.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/books" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage Books</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="mr-2 h-5 w-5" />
                Personal Details
              </CardTitle>
              <CardDescription className="text-purple-200">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-100">
                Manage your personal details, update your profile information, and control what information is
                displayed.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/personal" className="w-full">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Manage Details</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" className="text-purple-200 hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

