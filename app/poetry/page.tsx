"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenTool, ArrowLeft } from "lucide-react"
import PoetryList from "@/components/poetry-list"
import type { Poem } from "@/lib/types"
import { poemService } from "@/lib/services"

export default function PoetryPage() {
  const [poems, setPoems] = useState<Poem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPoems() {
      try {
        setLoading(true)
        const fetchedPoems = await poemService.getAll()
        setPoems(fetchedPoems)
      } catch (err) {
        console.error('Error fetching poems:', err)
        setError('Failed to load poems')
      } finally {
        setLoading(false)
      }
    }

    fetchPoems()
    
    // Set up automatic refresh every 30 seconds to catch admin changes
    const interval = setInterval(fetchPoems, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading poems...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-red-300 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 pb-20">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-purple-200 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">Poetry Collection</h1>
            <p className="text-lg text-purple-200">Explore my personal collection of poems and written expressions</p>
          </div>

          <Link href="/login">
            <Button variant="outline" className="border-purple-400 bg-purple-900/50 text-white hover:bg-purple-800/70">
              <PenTool className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PoetryList poems={poems} />
        </div>
      </div>
    </div>
  )
}

