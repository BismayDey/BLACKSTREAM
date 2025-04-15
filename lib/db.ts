// This is a mock database service
// In a real application, you would use a real database like PostgreSQL, MongoDB, etc.

interface Show {
  id: string
  title: string
  genre: string
  duration: string
  releaseYear: string
  rating: string
  thumbnail: string
  videoSrc: string
  description: string
  cast: string[]
  director: string
}

// Mock data
const shows: Show[] = [
  {
    id: "1",
    title: "Cosmic Odyssey",
    genre: "Sci-Fi",
    duration: "45",
    releaseYear: "2023",
    rating: "TV-14",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/cosmic-odyssey.mp4",
    description:
      "A team of astronauts embarks on a journey to explore the farthest reaches of our galaxy, encountering strange new worlds and civilizations along the way.",
    cast: ["Emma Stone", "Ryan Gosling", "Idris Elba", "Zoe Saldana"],
    director: "Christopher Nolan",
  },
  {
    id: "2",
    title: "The Last Kingdom",
    genre: "Historical Drama",
    duration: "50",
    releaseYear: "2022",
    rating: "TV-MA",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/last-kingdom.mp4",
    description:
      "Set in the 9th century, this epic tale follows the journey of Uhtred, a Saxon-born warrior raised by Vikings who finds himself caught between two worlds.",
    cast: ["Alexander Dreymon", "Emily Cox", "David Dawson", "Eliza Butterworth"],
    director: "Edward Bazalgette",
  },
  {
    id: "3",
    title: "Midnight Shadows",
    genre: "Horror",
    duration: "42",
    releaseYear: "2023",
    rating: "TV-MA",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/midnight-shadows.mp4",
    description:
      "A group of friends discover an ancient artifact that unleashes a malevolent entity, forcing them to confront their deepest fears to survive the night.",
    cast: ["Florence Pugh", "Anya Taylor-Joy", "Dev Patel", "John Boyega"],
    director: "Mike Flanagan",
  },
  {
    id: "4",
    title: "Crown of Thorns",
    genre: "Drama",
    duration: "55",
    releaseYear: "2021",
    rating: "TV-MA",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/crown-of-thorns.mp4",
    description:
      "A political drama chronicling the rise and fall of a powerful dynasty as they navigate treachery, betrayal, and the corrupting influence of power.",
    cast: ["Cate Blanchett", "Jeremy Strong", "Mahershala Ali", "Olivia Colman"],
    director: "Denis Villeneuve",
  },
  {
    id: "5",
    title: "Neon Nights",
    genre: "Cyberpunk",
    duration: "48",
    releaseYear: "2024",
    rating: "TV-MA",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/neon-nights.mp4",
    description:
      "In a dystopian future where corporations rule and technology has transformed humanity, a hacker uncovers a conspiracy that could change the balance of power forever.",
    cast: ["Timothée Chalamet", "Jodie Comer", "Daniel Kaluuya", "Rinko Kikuchi"],
    director: "Bong Joon-ho",
  },
  {
    id: "6",
    title: "Echoes of Eternity",
    genre: "Fantasy",
    duration: "52",
    releaseYear: "2022",
    rating: "TV-14",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/echoes-of-eternity.mp4",
    description:
      "In a world where magic is dying, a young apprentice discovers she may be the key to restoring the ancient powers that once protected the realm from darkness.",
    cast: ["Millie Bobby Brown", "Tilda Swinton", "Dev Patel", "Pedro Pascal"],
    director: "Guillermo del Toro",
  },
  {
    id: "7",
    title: "Quantum Break",
    genre: "Sci-Fi",
    duration: "46",
    releaseYear: "2023",
    rating: "TV-14",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/quantum-break.mp4",
    description:
      "When a time travel experiment goes wrong, a physicist gains the ability to manipulate time but discovers that each alteration creates ripples that threaten the fabric of reality.",
    cast: ["Oscar Isaac", "Jodie Comer", "John David Washington", "Tessa Thompson"],
    director: "Alex Garland",
  },
  {
    id: "8",
    title: "Crimson Tide",
    genre: "Crime",
    duration: "58",
    releaseYear: "2021",
    rating: "TV-MA",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/crimson-tide.mp4",
    description:
      "A gritty crime drama following a detective who returns to her hometown to investigate a series of murders that bear an eerie resemblance to a cold case from her past.",
    cast: ["Viola Davis", "Mahershala Ali", "Elizabeth Olsen", "Giancarlo Esposito"],
    director: "David Fincher",
  },
  {
    id: "9",
    title: "Eternal Sunshine",
    genre: "Romance",
    duration: "110",
    releaseYear: "2023",
    rating: "PG-13",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/eternal-sunshine.mp4",
    description:
      "A heartwarming story about two souls who keep finding each other across different lifetimes, challenging the very nature of fate and destiny.",
    cast: ["Timothée Chalamet", "Zendaya", "Andrew Garfield", "Saoirse Ronan"],
    director: "Greta Gerwig",
  },
  {
    id: "10",
    title: "Savage Lands",
    genre: "Western",
    duration: "120",
    releaseYear: "2022",
    rating: "R",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/savage-lands.mp4",
    description:
      "In the harsh frontier of the American West, a former outlaw seeks redemption while being pursued by both the law and the gang he once called family.",
    cast: ["Idris Elba", "Regina King", "Jeffrey Wright", "Zazie Beetz"],
    director: "Chloé Zhao",
  },
  {
    id: "11",
    title: "Parallel Lives",
    genre: "Drama",
    duration: "135",
    releaseYear: "2024",
    rating: "R",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/parallel-lives.mp4",
    description:
      "An intimate portrait of two families from different backgrounds whose lives become intertwined through a series of unexpected events, exploring themes of privilege, identity, and connection.",
    cast: ["Cate Blanchett", "Daniel Kaluuya", "Michelle Yeoh", "Oscar Isaac"],
    director: "Barry Jenkins",
  },
  {
    id: "12",
    title: "The Abyss",
    genre: "Horror",
    duration: "95",
    releaseYear: "2023",
    rating: "R",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/the-abyss.mp4",
    description:
      "A team of marine biologists discover a mysterious entity at the bottom of the ocean that begins to manifest their deepest fears and darkest secrets.",
    cast: ["Florence Pugh", "Steven Yeun", "Lupita Nyong'o", "Bill Skarsgård"],
    director: "Ari Aster",
  },
  {
    id: "13",
    title: "Starfall",
    genre: "Sci-Fi",
    duration: "140",
    releaseYear: "2024",
    rating: "PG-13",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/starfall.mp4",
    description:
      "When mysterious objects begin falling from the sky worldwide, a linguist and a physicist race against time to decipher their purpose before global panic leads to catastrophe.",
    cast: ["Jodie Comer", "John Boyega", "Ke Huy Quan", "Tessa Thompson"],
    director: "Denis Villeneuve",
  },
  {
    id: "14",
    title: "Whispers in the Dark",
    genre: "Thriller",
    duration: "105",
    releaseYear: "2022",
    rating: "R",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/whispers-in-the-dark.mp4",
    description:
      "A child psychologist begins to question her own sanity when her new patient claims to hear the voices of people who died in her house decades ago.",
    cast: ["Ruth Negga", "Jessie Buckley", "Rami Malek", "Thomasin McKenzie"],
    director: "Robert Eggers",
  },
  {
    id: "15",
    title: "Golden Age",
    genre: "Historical Drama",
    duration: "150",
    releaseYear: "2023",
    rating: "PG-13",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/golden-age.mp4",
    description:
      "An epic tale of ambition, betrayal, and resilience set against the backdrop of the Renaissance, following the rise of a brilliant artist navigating the dangerous politics of patronage.",
    cast: ["Saoirse Ronan", "Timothée Chalamet", "Cate Blanchett", "Adam Driver"],
    director: "Yorgos Lanthimos",
  },
]

// Database service
export const db = {
  // Get all shows
  getAllShows: async (): Promise<Show[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return shows
  },

  // Get show by ID
  getShowById: async (id: string): Promise<Show | null> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return shows.find((show) => show.id === id) || null
  },

  // Search shows
  searchShows: async (query: string): Promise<Show[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400))
    const searchLower = query.toLowerCase()
    return shows.filter(
      (show) => show.title.toLowerCase().includes(searchLower) || show.description.toLowerCase().includes(searchLower),
    )
  },

  // Filter shows by genre
  filterShowsByGenre: async (genre: string): Promise<Show[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400))
    return shows.filter((show) => show.genre.toLowerCase() === genre.toLowerCase())
  },

  // Get related shows
  getRelatedShows: async (showId: string, limit = 4): Promise<Show[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    const show = shows.find((s) => s.id === showId)
    if (!show) return []

    return shows.filter((s) => s.id !== showId && s.genre === show.genre).slice(0, limit)
  },

  // Get shows
  getShows: async (): Promise<Show[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return shows
  },
}
