import type { Metadata } from "next"
import Watchlist from "@/components/watchlist"

export const metadata: Metadata = {
  title: "Your Watchlist | Lumina",
  description: "View and manage your saved shows and movies",
}

export default function WatchlistPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Watchlist />
    </div>
  )
}
