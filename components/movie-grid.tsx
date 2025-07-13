import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Movie } from "@/lib/types"

interface MovieGridProps {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          className="group overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:shadow-glow"
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={movie.poster || `/placeholder.svg?height=450&width=300`}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="line-clamp-3 text-sm">{movie.description}</p>
            </div>
          </div>

          <CardHeader className="pb-2">
            <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill={i < movie.rating ? "currentColor" : "none"} />
              ))}
            </div>
          </CardHeader>

          <CardContent className="pb-2">
            <p className="text-sm text-purple-200">
              {movie.year} • {movie.director}
            </p>
            <p className="mt-1 text-sm text-purple-300">Starring: {movie.actors.join(", ")}</p>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-1">
            {movie.genres.map((genre) => (
              <Badge key={genre} variant="outline" className="border-purple-500/50 text-purple-200">
                {genre}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

