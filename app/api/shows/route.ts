import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    let shows = await db.getShows()

    // If search parameter is provided, filter the shows
    if (search && search.trim() !== "") {
      const searchLower = search.toLowerCase()
      shows = shows.filter(
        (show) =>
          show.title.toLowerCase().includes(searchLower) ||
          show.description.toLowerCase().includes(searchLower) ||
          show.genre.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json(shows)
  } catch (error) {
    console.error("Error fetching shows:", error)
    return NextResponse.json({ error: "Failed to fetch shows" }, { status: 500 })
  }
}
