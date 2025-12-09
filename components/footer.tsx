import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12">
                <Image
                  src="/icon.png"
                  alt="BLACKSTREAM"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
                BLACKSTREAM
              </h3>
            </div>
            <p className="text-muted-foreground">The ultimate streaming platform for all your entertainment needs.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shows" className="text-muted-foreground hover:text-primary">
                  Shows
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-muted-foreground hover:text-primary">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-muted-foreground hover:text-primary">
                  Series
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="text-muted-foreground hover:text-primary">
                  My List
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-muted-foreground hover:text-primary">
                  Subscription
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">&copy; {currentYear} BLACKSTREAM. All rights reserved.</p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">Created with ❤️ by BLACKSTREAM Team</p>
        </div>
      </div>
    </footer>
  )
}
