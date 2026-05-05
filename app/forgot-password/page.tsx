"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, AlertCircle, CheckCircle, ArrowLeft, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"

const SHOWCASE_POSTERS = [
  { src: "https://image.tmdb.org/t/p/w500/1vR79FQSrnC3XSTkJtBZ4yKnIGp.jpg", title: "The Witcher" },
  { src: "https://image.tmdb.org/t/p/w500/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg", title: "Stranger Things" },
  { src: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYrbaiDwuQwS.jpg", title: "Oppenheimer" },
  { src: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", title: "Wednesday" },
  { src: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMsiL.jpg", title: "The Godfather" },
  { src: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg", title: "Breaking Bad" },
  { src: "https://image.tmdb.org/t/p/w500/aSuOkA9NartxPnMBKS1xVVF25xU.jpg", title: "Squid Game" },
  { src: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg", title: "Avengers" },
]

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const auth = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await auth?.resetPassword(email)
      setEmailSent(true)
    } catch (err: any) {
      if (err.code === "auth/user-not-found") setError("No account found with this email address.")
      else if (err.code === "auth/invalid-email") setError("Please enter a valid email address.")
      else setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* ── LEFT: Form Panel ── */}
      <div className="flex-1 flex flex-col px-8 sm:px-12 lg:px-16 py-10 relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10 shrink-0">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-extrabold tracking-widest text-white">
              BLACK<span className="text-red-500">STREAM</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Movies
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm w-full mx-auto flex-1 flex flex-col justify-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Reset password</h1>
          <p className="text-slate-400 mb-8">
            {emailSent
              ? "Check your inbox for the reset link"
              : "Enter your email and we'll send you a reset link"}
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {emailSent ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3 text-green-400">
                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Reset email sent!</p>
                  <p className="text-sm mt-1 text-green-400/80">
                    We've sent a reset link to <strong className="text-green-300">{email}</strong>. Check your inbox and follow the instructions.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
                onClick={() => { setEmailSent(false); setEmail("") }}
              >
                Try a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-300 text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-red-500 focus-visible:border-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11 transition-all duration-200"
                disabled={isLoading || !auth}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}

          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: Movie Showcase Panel ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />

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
