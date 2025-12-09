import type { Metadata } from "next"
import ContinueWatchingPage from "@/components/continue-watching-page"

export const metadata: Metadata = {
  title: "Continue Watching | BlackStream",
  description: "Pick up where you left off",
}

export default function ContinueWatchingPageRoute() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <ContinueWatchingPage />
    </div>
  )
}
