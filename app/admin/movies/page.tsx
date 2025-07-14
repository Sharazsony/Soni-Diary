"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import type { Movie } from "@/lib/types"
import { movieService } from "@/lib/services"
import AdminHeader from "@/components/admin-header"

export default function AdminMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    director: "",
    actors: "",
    genres: "",
    rating: "3",
    description: "",
    poster: "",
  })

  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    async function fetchMovies() {
      try {
        const fetchedMovies = await movieService.getAll()
        setMovies(fetchedMovies)
      } catch (error) {
        console.error('Error fetching movies:', error)
        toast({
          title: "Error",
          description: "Failed to load movies",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [isAuthenticated, router, toast])

  // Function to refresh movies data
  const refreshMovies = async () => {
    try {
      const fetchedMovies = await movieService.getAll()
      setMovies(fetchedMovies)
    } catch (error) {
      console.error('Error refreshing movies:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddMovie = () => {
    setCurrentMovie(null)
    setFormData({
      title: "",
      year: new Date().getFullYear().toString(),
      director: "",
      actors: "",
      genres: "",
      rating: "3",
      description: "",
      poster: "",
    })
    setOpenDialog(true)
  }

  const handleEditMovie = (movie: Movie) => {
    setCurrentMovie(movie)
    setFormData({
      title: movie.title,
      year: movie.year.toString(),
      director: movie.director,
      actors: movie.actors.join(", "),
      genres: movie.genres.join(", "),
      rating: movie.rating.toString(),
      description: movie.description,
      poster: movie.poster || "",
    })
    setOpenDialog(true)
  }

  const handleDeleteMovie = (movie: Movie) => {
    setCurrentMovie(movie)
    setDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!currentMovie) return

    try {
      await movieService.delete(currentMovie.id)

      toast({
        title: "Movie deleted",
        description: `"${currentMovie.title}" has been removed from the database.`,
      })
      
      // Refresh data from database
      refreshMovies()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete movie from database",
        variant: "destructive",
      })
    }

    setDeleteDialog(false)
    setCurrentMovie(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { title, year, director, actors, genres, rating, description, poster } = formData

    const movieData = {
      title,
      year: Number.parseInt(year),
      director,
      actors: actors
        .split(",")
        .map((actor) => actor.trim())
        .filter(Boolean),
      genres: genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
      rating: Number.parseInt(rating),
      description,
      poster: poster || undefined,
    }

    try {
      if (currentMovie) {
        // Edit existing movie
        await movieService.update(currentMovie.id, movieData)

        toast({
          title: "Movie updated",
          description: `"${title}" has been updated in the database.`,
        })
      } else {
        // Add new movie
        await movieService.create(movieData)

        toast({
          title: "Movie added",
          description: `"${title}" has been added to the database.`,
        })
      }
    } catch (error) {
      console.error('Movie operation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast({
        title: "Error",
        description: currentMovie ? `Failed to update movie: ${errorMessage}` : `Failed to create movie: ${errorMessage}`,
        variant: "destructive",
      })
    }

    setOpenDialog(false)
    refreshMovies()
  }

  if (!isAuthenticated || isLoading) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900">
      <AdminHeader title="Movie Management" backLink="/admin/dashboard" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-bold text-white">Your Movie Collection</h2>
          <Button onClick={handleAddMovie} className="bg-pink-600 hover:bg-pink-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Movie
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden bg-white/10 backdrop-blur-sm">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={movie.poster || `/placeholder.svg?height=450&width=300`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                  <p className="text-sm text-pink-200">{movie.year}</p>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="mb-2 flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill={i < movie.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="line-clamp-2 text-sm text-pink-100">{movie.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-pink-200 hover:text-white"
                  onClick={() => handleEditMovie(movie)}
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-300 hover:text-red-200"
                  onClick={() => handleDeleteMovie(movie)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add/Edit Movie Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-pink-950 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sticky top-0 bg-pink-950 pb-4 z-10">
              <DialogTitle>{currentMovie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
              <DialogDescription className="text-pink-300">
                {currentMovie
                  ? "Update your movie details below."
                  : "Fill in the details to add a new movie to your collection."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-pink-200">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border-pink-700 bg-pink-900/50 text-white"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year" className="text-pink-200">
                      Year
                    </Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="border-pink-700 bg-pink-900/50 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="director" className="text-pink-200">
                    Director
                  </Label>
                  <Input
                    id="director"
                    name="director"
                    value={formData.director}
                    onChange={handleInputChange}
                    className="border-pink-700 bg-pink-900/50 text-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="actors" className="text-pink-200">
                    Actors (comma separated)
                  </Label>
                  <Input
                    id="actors"
                    name="actors"
                    value={formData.actors}
                    onChange={handleInputChange}
                    className="border-pink-700 bg-pink-900/50 text-white"
                    placeholder="Tom Hanks, Meryl Streep"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="genres" className="text-pink-200">
                    Genres (comma separated)
                  </Label>
                  <Input
                    id="genres"
                    name="genres"
                    value={formData.genres}
                    onChange={handleInputChange}
                    className="border-pink-700 bg-pink-900/50 text-white"
                    placeholder="Drama, Comedy, Action"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rating" className="text-pink-200">
                    Rating (1-5)
                  </Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="border-pink-700 bg-pink-900/50 text-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-pink-200">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border-pink-700 bg-pink-900/50 text-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="poster" className="text-pink-200">
                    Poster URL (optional)
                  </Label>
                  <Input
                    id="poster"
                    name="poster"
                    value={formData.poster}
                    onChange={handleInputChange}
                    className="border-pink-700 bg-pink-900/50 text-white"
                    placeholder="https://example.com/movie-poster.jpg"
                  />
                </div>
              </div>
              <DialogFooter className="sticky bottom-0 bg-pink-950 pt-4 mt-4 border-t border-pink-800">
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                  {currentMovie ? "Update Movie" : "Add Movie"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent className="bg-pink-950 text-white sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-pink-300">
                Are you sure you want to delete "{currentMovie?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteDialog(false)}
                className="border-pink-700 text-pink-200 hover:bg-pink-900/50"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

