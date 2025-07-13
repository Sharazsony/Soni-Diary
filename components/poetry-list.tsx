"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Poem } from "@/lib/types"

interface PoetryListProps {
  poems: Poem[]
}

export default function PoetryList({ poems }: PoetryListProps) {
  const [likedPoems, setLikedPoems] = useState<Record<string, boolean>>({})

  const toggleLike = (id: string) => {
    setLikedPoems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <>
      {poems.map((poem) => (
        <Card
          key={poem.id}
          className="overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:shadow-glow"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-white">{poem.title}</CardTitle>
            <CardDescription className="text-purple-300">
              {new Date(poem.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="whitespace-pre-line text-purple-100">{poem.content}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t border-purple-800/50 pt-3">
            <span className="text-sm text-purple-300">{poem.tags.join(", ")}</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300 hover:text-pink-400"
              onClick={() => toggleLike(poem.id)}
            >
              <Heart className={cn("mr-1 h-4 w-4", likedPoems[poem.id] ? "fill-pink-500 text-pink-500" : "")} />
              {likedPoems[poem.id] ? "Liked" : "Like"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

