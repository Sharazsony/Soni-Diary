"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BookList from "@/components/book-list"
import type { Book } from "@/lib/types"
import { bookService } from "@/lib/services"

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true)
        const fetchedBooks = await bookService.getAll()
        setBooks(fetchedBooks)
      } catch (err) {
        console.error('Error fetching books:', err)
        setError('Failed to load books')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
    
    // Set up automatic refresh every 30 seconds to catch admin changes
    const interval = setInterval(fetchBooks, 30000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let result = [...books]

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (book) => book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "author":
        result.sort((a, b) => a.author.localeCompare(b.author))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "recent":
      default:
        // Assuming newer books have higher IDs in our demo
        result.sort((a, b) => b.id.localeCompare(a.id))
        break
    }

    setFilteredBooks(result)
  }, [searchTerm, sortBy, books])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading books...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-red-300 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 pb-20">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-blue-200 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">My Reading Journey</h1>
          <p className="mb-8 text-lg text-blue-200">Explore the books that have shaped my thoughts and imagination</p>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search by title or author..."
                className="border-blue-500/50 bg-blue-900/30 text-white placeholder:text-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-blue-500/50 bg-blue-900/30 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <BookList books={filteredBooks} />
        </div>
      </div>
    </div>
  )
}

