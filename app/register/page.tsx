"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login since we use passwordless authentication
    router.replace("/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-pattern bg-cover bg-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Redirecting...</h2>
        <p className="text-muted-foreground">Taking you to the login page</p>
      </div>
    </div>
  )
}
