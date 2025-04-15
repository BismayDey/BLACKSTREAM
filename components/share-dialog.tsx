"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Facebook, Twitter, Linkedin, Mail, LinkIcon, Copy, Check } from "lucide-react"

interface ShareDialogProps {
  title: string
  id?: string
  url?: string
  onClose?: () => void
}

export default function ShareDialog({ title, id, url, onClose }: ShareDialogProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Use the provided URL or construct one based on the current location and show ID
  const shareUrl = url || (typeof window !== "undefined" ? `${window.location.origin}/shows/${id || ""}` : "")

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareViaTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${title} on BLACKSTREAM`)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const shareViaLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareViaEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(`Check out ${title} on BLACKSTREAM`)}&body=${encodeURIComponent(`I thought you might enjoy watching ${title}. Check it out here: ${shareUrl}`)}`,
      "_blank",
    )
  }

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Share "{title}"</h2>
        <p className="text-muted-foreground">Share this content with your friends and family</p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border-[#1877F2]/20"
          onClick={shareViaFacebook}
        >
          <Facebook className="h-5 w-5 text-[#1877F2]" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/20"
          onClick={shareViaTwitter}
        >
          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border-[#0A66C2]/20"
          onClick={shareViaLinkedin}
        >
          <Linkedin className="h-5 w-5 text-[#0A66C2]" />
          <span className="sr-only">Share on LinkedIn</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-primary/10 hover:bg-primary/20 border-primary/20"
          onClick={shareViaEmail}
        >
          <Mail className="h-5 w-5 text-primary" />
          <span className="sr-only">Share via Email</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex-1 bg-muted/30 border border-white/10 rounded-l-md p-3 truncate">
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm truncate">{shareUrl}</span>
            </div>
          </div>
          <Button className="rounded-l-none" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By sharing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  )
}

// Export as default and named export for compatibility
export { ShareDialog }
