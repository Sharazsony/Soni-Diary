import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Quote } from "lucide-react"
import type { Book } from "@/lib/types"

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {books.map((book) => (
        <Card
          key={book.id}
          className="flex overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:shadow-glow"
        >
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
                  <h3 className="text-xl font-semibold text-white">{book.title}</h3>
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
              <div className="mb-2 flex items-center gap-2 text-sm text-blue-200">
                <Calendar className="h-4 w-4" />
                <span>Read in {book.readDate}</span>
              </div>

              {book.quote && (
                <div className="mb-3 flex gap-2 text-sm italic text-blue-100">
                  <Quote className="h-4 w-4 shrink-0" />
                  <p className="line-clamp-3">{book.quote}</p>
                </div>
              )}

              <p className="line-clamp-2 text-sm text-blue-200">{book.thoughts}</p>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-1 pt-2">
              {book.genres.map((genre) => (
                <Badge key={genre} variant="outline" className="border-blue-500/50 text-blue-200">
                  {genre}
                </Badge>
              ))}
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  )
}

