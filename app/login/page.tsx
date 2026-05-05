"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Play } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

// Movie posters for the right panel
const SHOWCASE_POSTERS = [
  {
    src: "https://image.tmdb.org/t/p/w500/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg",
    title: "Stranger Things",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    title: "Wednesday",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/aSuOkA9NartxPnMBKS1xVVF25xU.jpg",
    title: "Squid Game",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    title: "Breaking Bad",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/1vR79FQSrnC3XSTkJtBZ4yKnIGp.jpg",
    title: "The Witcher",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMsiL.jpg",
    title: "The Godfather",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    title: "Avengers",
  },
  {
    src: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYrbaiDwuQwS.jpg",
    title: "Oppenheimer",
  },
]

const getErrorMessage = (code: string) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email. Please sign up."
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again."
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later."
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support."
    default:
      return "Failed to sign in. Please check your credentials and try again."
  }
}

export default function LoginPage() {
  // ── All hooks MUST be called unconditionally ──
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)

  const auth = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  // ─────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await auth?.signIn(email, password)
      toast({ title: "Welcome back!", description: "You have successfully signed in." })
      router.push("/")
    } catch (err: any) {
      setError(getErrorMessage(err.code))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)
    try {
      await auth?.signInWithGoogle()
      toast({ title: "Welcome!", description: "You have successfully signed in with Google." })
      router.push("/")
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Failed to sign in with Google. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* ── LEFT: Form Panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 relative z-10">
        {/* Logo */}
        <Link href="/" className="mb-10 inline-block">
          <span className="text-2xl font-extrabold tracking-widest text-white">
            BLACK<span className="text-red-500">STREAM</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm w-full"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 mb-8">Sign in to continue watching</p>

          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-300 text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300 text-sm">Password</Label>
                <Link href="/forgot-password" className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11 transition-all duration-200"
              disabled={isLoading || !auth}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 h-11"
            onClick={handleGoogleSignIn}
            disabled={isLoading || !auth}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-400 hover:text-red-300 font-medium transition-colors">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT: Movie Showcase Panel ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />

        {/* Poster collage grid */}
        <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2 opacity-90">
          {SHOWCASE_POSTERS.map((poster, i) => (
            <motion.div
              key={poster.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative overflow-hidden rounded-lg"
            >
              <Image
                src={poster.src}
                alt={poster.title}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5">
            <Play className="w-4 h-4 text-red-400 fill-red-400" />
            <span className="text-white text-sm font-medium">1000+ Movies & Series</span>
          </div>
          <p className="text-white/50 text-xs">Stream in HD · Anytime · Anywhere</p>
        </div>
      </div>
    </div>
  )
}