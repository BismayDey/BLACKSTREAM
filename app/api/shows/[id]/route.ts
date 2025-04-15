import { NextResponse } from "next/server"

// In a real application, this would come from a database
const shows = [
  {
    id: "1",
    title: "Cosmic Odyssey",
    genre: "Sci-Fi",
    duration: "45 min",
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
    duration: "50 min",
    releaseYear: "2022",
    rating: "TV-MA",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    videoSrc: "/videos/last-kingdom.mp4",
    description:
      "Set in the 9th century, this epic tale follows the journey of Uhtred, a Saxon-born warrior raised by Vikings who finds himself caught between two worlds.",
    cast: ["Alexander Dreymon", "Emily Cox", "David Dawson", "Eliza Butterworth"],
    director: "Edward Bazalgette",
  },
  // Add more shows here
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const show = shows.find((s) => s.id === id)

  if (!show) {
    return new NextResponse(JSON.stringify({ error: "Show not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return NextResponse.json(show)
}
