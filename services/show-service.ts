"use server"

import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore"

export async function getShowById(id: string) {
  try {
    const showRef = doc(db, "shows", id)
    const showSnap = await getDoc(showRef)

    if (showSnap.exists()) {
      return { id: showSnap.id, ...showSnap.data() }
    } else {
      throw new Error("Show not found")
    }
  } catch (error) {
    console.error("Error getting show:", error)
    throw new Error("Failed to get show")
  }
}

export async function getShows(category?: string, limit = 10) {
  try {
    let showsQuery

    if (category) {
      showsQuery = query(collection(db, "shows"), where("categories", "array-contains", category), limit(limit))
    } else {
      showsQuery = query(collection(db, "shows"), limit(limit))
    }

    const showsSnap = await getDocs(showsQuery)
    const shows = showsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return shows
  } catch (error) {
    console.error("Error getting shows:", error)
    throw new Error("Failed to get shows")
  }
}

export async function getTrendingShows(limit = 10) {
  try {
    const showsQuery = query(collection(db, "shows"), orderBy("views", "desc"), limit(limit))

    const showsSnap = await getDocs(showsQuery)
    const shows = showsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return shows
  } catch (error) {
    console.error("Error getting trending shows:", error)
    throw new Error("Failed to get trending shows")
  }
}

export async function getShowsByIds(ids: string[]) {
  try {
    if (!ids.length) return []

    const shows = await Promise.all(
      ids.map(async (id) => {
        try {
          return await getShowById(id)
        } catch (error) {
          console.error(`Error getting show ${id}:`, error)
          return null
        }
      }),
    )

    return shows.filter(Boolean)
  } catch (error) {
    console.error("Error getting shows by ids:", error)
    throw new Error("Failed to get shows by ids")
  }
}

export async function searchShows(query: string) {
  try {
    // Firestore doesn't support full-text search natively
    // This is a simple implementation that gets all shows and filters them
    // In a production app, you would use Algolia, Elasticsearch, or a similar service
    const showsSnap = await getDocs(collection(db, "shows"))
    const shows = showsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const searchTerms = query.toLowerCase().split(" ")

    return shows.filter((show) => {
      const title = show.title?.toLowerCase() || ""
      const description = show.description?.toLowerCase() || ""

      return searchTerms.some((term) => title.includes(term) || description.includes(term))
    })
  } catch (error) {
    console.error("Error searching shows:", error)
    throw new Error("Failed to search shows")
  }
}
