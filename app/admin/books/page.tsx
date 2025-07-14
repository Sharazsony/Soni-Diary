"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import type { Book } from "@/lib/types"
import { bookService } from "@/lib/services"
import AdminHeader from "@/components/admin-header"

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    readDate: "",
    rating: "3",
    genres: "",
    thoughts: "",
    quote: "",
    cover: "",
  })

  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    async function fetchBooks() {
      try {
        const fetchedBooks = await bookService.getAll()
        setBooks(fetchedBooks)
      } catch (error) {
        console.error('Error fetching books:', error)
        toast({
          title: "Error",
          description: "Failed to load books",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [isAuthenticated, router, toast])

  // Function to refresh books data
  const refreshBooks = async () => {
    try {
      const fetchedBooks = await bookService.getAll()
      setBooks(fetchedBooks)
    } catch (error) {
      console.error('Error refreshing books:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddBook = () => {
    setCurrentBook(null)
    setFormData({
      title: "",
      author: "",
      readDate: new Date().getFullYear().toString(),
      rating: "3",
      genres: "",
      thoughts: "",
      quote: "",
      cover: "",
    })
    setOpenDialog(true)
  }

  const handleEditBook = (book: Book) => {
    setCurrentBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      readDate: book.readDate,
      rating: book.rating.toString(),
      genres: book.genres.join(", "),
      thoughts: book.thoughts,
      quote: book.quote || "",
      cover: book.cover || "",
    })
    setOpenDialog(true)
  }

  const handleDeleteBook = (book: Book) => {
    setCurrentBook(book)
    setDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!currentBook) return

    try {
      await bookService.delete(currentBook.id)

      toast({
        title: "Book deleted",
        description: `"${currentBook.title}" has been removed from the database.`,
      })
      
      // Refresh data from database
      refreshBooks()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book from database",
        variant: "destructive",
      })
    }

    setDeleteDialog(false)
    setCurrentBook(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { title, author, readDate, rating, genres, thoughts, quote, cover } = formData

    const bookData = {
      title,
      author,
      readDate,
      rating: Number.parseInt(rating),
      genres: genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
      thoughts,
      quote: quote || undefined,
      cover: cover || undefined,
    }

    try {
      if (currentBook) {
        // Edit existing book
        await bookService.update(currentBook.id, bookData)

        toast({
          title: "Book updated",
          description: `"${title}" has been updated in the database.`,
        })
      } else {
        // Add new book
        await bookService.create(bookData)

        toast({
          title: "Book added",
          description: `"${title}" has been added to the database.`,
        })
      }
    } catch (error) {
      console.error('Book operation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast({
        title: "Error",
        description: currentBook ? `Failed to update book: ${errorMessage}` : `Failed to create book: ${errorMessage}`,
        variant: "destructive",
      })
    }

    setOpenDialog(false)
    refreshBooks()
  }

  if (!isAuthenticated || isLoading) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900">
      <AdminHeader title="Book Management" backLink="/admin/dashboard" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-bold text-white">Your Book Collection</h2>
          <Button onClick={handleAddBook} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {books.map((book) => (
            <Card key={book.id} className="flex overflow-hidden bg-white/10 backdrop-blur-sm">
              <div className="relative h-auto w-1/3 min-w-[120px] overflow-hidden">
                <Image
                  src={book.cover || `/placeholder.svg?height=300&width=200`}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{book.title}</CardTitle>
                      <p className="text-blue-300">by {book.author}</p>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4" fill={i < book.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-2">
                  <p className="text-sm text-blue-200">Read in {book.readDate}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-blue-100">{book.thoughts}</p>
                </CardContent>

                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-200 hover:text-white"
                    onClick={() => handleEditBook(book)}
                  >
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-300 hover:text-red-200"
                    onClick={() => handleDeleteBook(book)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        {/* Add/Edit Book Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-blue-950 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sticky top-0 bg-blue-950 pb-4 z-10">
              <DialogTitle>{currentBook ? "Edit Book" : "Add New Book"}</DialogTitle>
              <DialogDescription className="text-blue-300">
                {currentBook
                  ? "Update your book details below."
                  : "Fill in the details to add a new book to your collection."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-blue-200">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border-blue-700 bg-blue-900/50 text-white"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="author" className="text-blue-200">
                      Author
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="border-blue-700 bg-blue-900/50 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="readDate" className="text-blue-200">
                      Read Date
                    </Label>
                    <Input
                      id="readDate"
                      name="readDate"
                      value={formData.readDate}
                      onChange={handleInputChange}
                      className="border-blue-700 bg-blue-900/50 text-white"
                      placeholder="2023"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rating" className="text-blue-200">
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
                      className="border-blue-700 bg-blue-900/50 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="genres" className="text-blue-200">
                    Genres (comma separated)
                  </Label>
                  <Input
                    id="genres"
                    name="genres"
                    value={formData.genres}
                    onChange={handleInputChange}
                    className="border-blue-700 bg-blue-900/50 text-white"
                    placeholder="Fiction, Fantasy, Science Fiction"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thoughts" className="text-blue-200">
                    Your Thoughts
                  </Label>
                  <Textarea
                    id="thoughts"
                    name="thoughts"
                    value={formData.thoughts}
                    onChange={handleInputChange}
                    className="border-blue-700 bg-blue-900/50 text-white"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quote" className="text-blue-200">
                    Favorite Quote (optional)
                  </Label>
                  <Textarea
                    id="quote"
                    name="quote"
                    value={formData.quote}
                    onChange={handleInputChange}
                    className="border-blue-700 bg-blue-900/50 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cover" className="text-blue-200">
                    Cover URL (optional)
                  </Label>
                  <Input
                    id="cover"
                    name="cover"
                    value={formData.cover}
                    onChange={handleInputChange}
                    className="border-blue-700 bg-blue-900/50 text-white"
                    placeholder="https://example.com/book-cover.jpg"
                  />
                </div>
              </div>
              <DialogFooter className="sticky bottom-0 bg-blue-950 pt-4 mt-4 border-t border-blue-800">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {currentBook ? "Update Book" : "Add Book"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent className="bg-blue-950 text-white sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-blue-300">
                Are you sure you want to delete "{currentBook?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteDialog(false)}
                className="border-blue-700 text-blue-200 hover:bg-blue-900/50"
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

