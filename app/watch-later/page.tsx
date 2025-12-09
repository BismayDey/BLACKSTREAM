import type { Metadata } from "next"
import WatchLater from "@/components/watch-later"

export const metadata: Metadata = {
  title: "Watch Later | BlackStream",
  description: "View and manage your watch later list",
}

export default function WatchLaterPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <WatchLater />
    </div>
  )
}
