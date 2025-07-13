import type { Poem, Movie, Book } from "./types"

export const poems: Poem[] = [
  {
    id: "poem1",
    title: "Whispers of the Stars",
    content:
      "In the silence of night,\nStars whisper ancient tales.\nCosmic dust and stardust dreams,\nEchoing through eternity's veils.",
    date: "2023-05-15",
    tags: ["night", "stars", "dreams"],
  },
  {
    id: "poem2",
    title: "Ocean's Embrace",
    content:
      "Waves crash upon the shore,\nA rhythmic lullaby of blue.\nSalt-kissed air and sandy toes,\nThe ocean's embrace, forever true.",
    date: "2023-07-22",
    tags: ["ocean", "nature", "peace"],
  },
  {
    id: "poem3",
    title: "Autumn Leaves",
    content:
      "Crimson, gold, and amber hues,\nDancing in the autumn breeze.\nWhispering secrets of the earth,\nAs they fall from aging trees.",
    date: "2023-10-10",
    tags: ["autumn", "nature", "change"],
  },
  {
    id: "poem4",
    title: "Midnight Thoughts",
    content:
      "When the world falls silent,\nAnd darkness claims the sky,\nThoughts wander freely,\nAsking questions of why.\n\nIn this quiet solitude,\nTruths begin to unfold,\nStories of the heart,\nThat daylight never told.",
    date: "2024-01-05",
    tags: ["night", "reflection", "solitude"],
  },
  {
    id: "poem5",
    title: "Digital Dreams",
    content:
      "In a world of ones and zeros,\nWhere reality blurs with code,\nWe build our digital castles,\nOn the information road.\n\nPixels paint our memories,\nAlgorithms guide our way,\nIn this realm of endless data,\nWhere dreams and nightmares play.",
    date: "2024-02-18",
    tags: ["technology", "digital", "modern"],
  },
  {
    id: "poem6",
    title: "Mountain Whispers",
    content:
      "Ancient peaks that touch the sky,\nSilent guardians of time,\nWhispering tales of ages past,\nIn a language sublime.\n\nRooted deep within the earth,\nReaching for the stars above,\nA testament to nature's strength,\nAnd its enduring love.",
    date: "2024-03-07",
    tags: ["mountains", "nature", "time"],
  },
]

export const movies: Movie[] = [
  {
    id: "movie1",
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    director: "Michel Gondry",
    actors: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst"],
    genres: ["Drama", "Romance", "Sci-Fi"],
    rating: 4,
    description:
      "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
  },
  {
    id: "movie2",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 5,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "movie3",
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    actors: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    genres: ["Adventure", "Comedy", "Crime"],
    rating: 4,
    description:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
  },
  {
    id: "movie4",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon Ho",
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    genres: ["Drama", "Thriller"],
    rating: 5,
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    id: "movie5",
    title: "Spirited Away",
    year: 2001,
    director: "Hayao Miyazaki",
    actors: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    genres: ["Animation", "Adventure", "Family"],
    rating: 5,
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
  },
  {
    id: "movie6",
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    genres: ["Drama"],
    rating: 5,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "movie7",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    genres: ["Adventure", "Drama", "Sci-Fi"],
    rating: 4,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "movie8",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    genres: ["Action", "Crime", "Drama"],
    rating: 5,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
]

export const books: Book[] = [
  {
    id: "book1",
    title: "Dune",
    author: "Frank Herbert",
    readDate: "2022",
    rating: 5,
    genres: ["Science Fiction", "Fantasy"],
    thoughts: "A masterpiece of world-building and political intrigue set in a fascinating universe.",
    quote: "Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
  },
  {
    id: "book2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    readDate: "2021",
    rating: 4,
    genres: ["Fiction", "Philosophy", "Adventure"],
    thoughts: "A beautiful fable about following your dreams and finding your personal legend.",
    quote: "When you want something, all the universe conspires in helping you to achieve it.",
  },
  {
    id: "book3",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    readDate: "2023",
    rating: 5,
    genres: ["Non-fiction", "History", "Science"],
    thoughts: "A thought-provoking exploration of human history and our impact on the world.",
    quote: "We study history not to know the future but to widen our horizons.",
  },
  {
    id: "book4",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    readDate: "2022",
    rating: 4,
    genres: ["Fantasy", "Romance", "Fiction"],
    thoughts: "A magical and enchanting story with beautiful prose and vivid imagery.",
    quote: "The finest of pleasures are always the unexpected ones.",
  },
  {
    id: "book5",
    title: "1984",
    author: "George Orwell",
    readDate: "2020",
    rating: 5,
    genres: ["Dystopian", "Classics", "Science Fiction"],
    thoughts: "A chilling and prophetic vision of a totalitarian future that remains relevant today.",
    quote: "Who controls the past controls the future. Who controls the present controls the past.",
  },
  {
    id: "book6",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    readDate: "2019",
    rating: 5,
    genres: ["Fantasy", "Adventure", "Classics"],
    thoughts: "A timeless adventure that sparked my love for fantasy literature.",
    quote: "Not all those who wander are lost.",
  },
]

export const personalInfo = {
  "Full Name": "Jane Doe",
  Birthday: "April 15, 1995",
  Location: "San Francisco, CA",
  Occupation: "UX Designer",
  Email: "jane.doe@example.com",
  Phone: "(555) 123-4567",
  "Favorite Color": "Teal",
  "Life Goals": "Travel to 50 countries, write a novel, learn to play the piano",
  "Personal Motto": "Create more than you consume",
}

