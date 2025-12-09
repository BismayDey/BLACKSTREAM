"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, AlertCircle, CheckCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [isCompletingSignIn, setIsCompletingSignIn] = useState(false)

  const auth = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  // If auth is not available yet, show a loading state
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-auth-pattern bg-cover bg-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we set up your login</p>
        </div>
      </div>
    )
  }

  const { sendSignInLink, completeSignInWithEmailLink, signInWithGoogle, isSignInLink } = auth

  // Check if the URL is a sign-in link
  useEffect(() => {
    const handleEmailLinkSignIn = async () => {
      if (isSignInLink(window.location.href)) {
        setIsCompletingSignIn(true)
        let emailForSignIn = window.localStorage.getItem('emailForSignIn')
        
        if (!emailForSignIn) {
          // User opened the link on a different device, ask for email
          emailForSignIn = window.prompt('Please provide your email for confirmation')
        }
        
        if (emailForSignIn) {
          try {
            await completeSignInWithEmailLink(emailForSignIn, window.location.href)
            
            // Clear the URL parameters
            window.history.replaceState({}, document.title, window.location.pathname)
            
            toast({
              title: "Welcome!",
              description: "You have successfully signed in.",
            })
            router.push("/")
          } catch (error: any) {
            console.error("Error completing sign in:", error)
            
            // Clear the URL parameters even on error
            window.history.replaceState({}, document.title, window.location.pathname)
            
            // Handle specific error codes
            if (error.code === 'auth/invalid-action-code') {
              setError("This sign-in link has expired or been used already. Please request a new one.")
            } else if (error.code === 'auth/expired-action-code') {
              setError("This sign-in link has expired. Please request a new one.")
            } else {
              setError("Failed to complete sign in. Please try again.")
            }
            setIsCompletingSignIn(false)
          }
        } else {
          // User cancelled the prompt
          window.history.replaceState({}, document.title, window.location.pathname)
          setIsCompletingSignIn(false)
        }
      }
    }

    handleEmailLinkSignIn()
  }, [completeSignInWithEmailLink, isSignInLink, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await sendSignInLink(email)
      setEmailSent(true)
      toast({
        title: "Email sent!",
        description: "Check your inbox for the sign-in link.",
      })
    } catch (error: any) {
      console.error("Login error:", error)
      setError("Failed to send sign-in link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      await signInWithGoogle()
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      setError("Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCompletingSignIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-auth-pattern bg-cover bg-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Completing sign in...</h2>
          <p className="text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-pattern bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="auth-overlay absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {emailSent ? "Check your email" : "Sign in to continue to BLACKSTREAM"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {emailSent && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
              <CheckCircle className="h-4 w-4" />
              <div>
                <p className="font-medium">Sign-in link sent!</p>
                <p className="text-xs mt-1">Check your email and click the link to sign in.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={emailSent}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || emailSent}>
              {isLoading ? "Sending..." : emailSent ? "Email Sent - Check Your Inbox" : "Send Sign-In Link"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading || emailSent}
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Google
              </Button>
            </div>
          </div>

          {emailSent && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setEmailSent(false)
                  setEmail("")
                }}
                className="text-sm text-primary hover:underline"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-auth-pattern bg-cover bg-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we set up your login</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
