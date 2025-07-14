"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieGrid from "@/components/movie-grid"
import type { Movie } from "@/lib/types"
import { movieService } from "@/lib/services"

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true)
        const fetchedMovies = await movieService.getAll()
        setMovies(fetchedMovies)
      } catch (err) {
        console.error('Error fetching movies:', err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
    
    // Set up automatic refresh every 30 seconds to catch admin changes
    const interval = setInterval(fetchMovies, 30000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMovies(movies)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(term) ||
        movie.director.toLowerCase().includes(term) ||
        movie.actors.some((actor) => actor.toLowerCase().includes(term)) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(term)),
    )

    setFilteredMovies(filtered)
  }, [searchTerm, movies])

  // Get unique genres
  const genres = Array.from(new Set(movies.flatMap((movie) => movie.genres)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 flex items-center justify-center">
        <div className="text-red-300 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 pb-20">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-purple-200 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">My Movie Collection</h1>
          <p className="mb-8 text-lg text-purple-200">Browse through my favorite films by genre, title, or actor</p>

          <div className="mb-8 max-w-md">
            <Input
              type="search"
              placeholder="Search by title, actor, or genre..."
              className="border-purple-500/50 bg-purple-900/30 text-white placeholder:text-purple-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto bg-purple-900/30">
              <TabsTrigger value="all">All Movies</TabsTrigger>
              {genres.map((genre) => (
                <TabsTrigger key={genre} value={genre}>
                  {genre}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <MovieGrid movies={filteredMovies} />
            </TabsContent>

            {genres.map((genre) => (
              <TabsContent key={genre} value={genre}>
                <MovieGrid movies={filteredMovies.filter((movie) => movie.genres.includes(genre))} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

