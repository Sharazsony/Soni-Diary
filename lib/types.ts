export interface Poem {
  id: string
  title: string
  content: string
  date: string
  tags: string[]
}

export interface Movie {
  id: string
  title: string
  poster?: string
  year: number
  director: string
  actors: string[]
  genres: string[]
  rating: number
  description: string
}

export interface Book {
  id: string
  title: string
  author: string
  cover?: string
  readDate: string
  rating: number
  genres: string[]
  thoughts: string
  quote?: string
}

