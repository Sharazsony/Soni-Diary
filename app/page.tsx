"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Film, User, PenTool, Sparkles } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"
import CharacterFloating from "@/components/character-floating"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
        <AnimatedBackground />
        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-8 animate-float">
              <Sparkles className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="mb-6 animate-fade-in text-5xl font-bold tracking-tight text-white md:text-7xl">
              My Dream Diary
            </h1>
            <p className="mb-10 max-w-2xl animate-fade-in-delay text-xl text-purple-200">
              Loading...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Animated Poet Quotes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="poet-quote left-[10%] top-[15%] animate-float-slow">
              <span className="font-bold text-orange-300">Ghalib:</span>
              <p className="text-yellow-200 italic">"Hazaaron khwahishen aisi ke har khwahish pe dam nikle"</p>
            </div>
            <div className="poet-quote right-[15%] top-[25%] animate-float-delayed">
              <span className="font-bold text-pink-300">Faraz:</span>
              <p className="text-purple-200 italic">"Tum naraz ho to ho, mujhe kya"</p>
            </div>
            <div className="poet-quote left-[20%] bottom-[20%] animate-float-reverse">
              <span className="font-bold text-cyan-300">John Elia:</span>
              <p className="text-blue-200 italic">"Tum bilkul hum jaise nikle"</p>
            </div>
            <div className="poet-quote right-[10%] bottom-[30%] animate-pulse-slow">
              <span className="font-bold text-green-300">Rumi:</span>
              <p className="text-teal-200 italic">"What you seek is seeking you"</p>
            </div>
          </div>

          <div className="mb-8 animate-float">
            <Sparkles className="h-16 w-16 text-yellow-300" />
          </div>

          <h1 className="mb-6 animate-fade-in text-5xl font-bold tracking-tight text-white md:text-7xl">
            My Dream Diary
          </h1>

          <p className="mb-10 max-w-2xl animate-fade-in-delay text-xl text-purple-200">
            Welcome to my personal dreamscape - a magical collection of poetry, movies, books, and personal memories.
          </p>

          <div className="relative mb-16">
            <CharacterFloating />
          </div>

          {isAuthenticated && (
            <div className="mb-8 w-full max-w-md">
              <Link href="/admin/dashboard">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Go to Admin Dashboard</Button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/poetry" className="group">
              <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-glow">
                <div className="mb-4 rounded-full bg-purple-500 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                  <PenTool className="h-8 w-8" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-white">Poetry</h2>
                <p className="text-center text-purple-200">Explore my collection of poems and written expressions</p>
              </div>
            </Link>

            <Link href="/movies" className="group">
              <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-glow">
                <div className="mb-4 rounded-full bg-pink-500 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                  <Film className="h-8 w-8" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-white">Movies</h2>
                <p className="text-center text-purple-200">Browse my favorite films sorted by genre and actors</p>
              </div>
            </Link>

            <Link href="/books" className="group">
              <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-glow">
                <div className="mb-4 rounded-full bg-blue-500 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-white">Books</h2>
                <p className="text-center text-purple-200">Discover the books that have shaped my imagination</p>
              </div>
            </Link>

            <Link href="/personal" className="group">
              <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-glow">
                <div className="mb-4 rounded-full bg-teal-500 p-3 text-white transition-transform duration-300 group-hover:scale-110">
                  <User className="h-8 w-8" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-white">Personal</h2>
                <p className="text-center text-purple-200">Private section for personal thoughts and memories</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

