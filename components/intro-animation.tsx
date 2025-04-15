"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true)
  const [progress, setProgress] = useState(0)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const duration = 4000 // 4 seconds for the intro
  const router = useRouter()

  useEffect(() => {
    // Check if intro has been shown before
    const hasSeenIntro = localStorage.getItem("hasSeenIntro")
    if (hasSeenIntro) {
      setShowIntro(false)
      return
    }

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        const newProgress = Math.min(progress + (deltaTime / duration) * 100, 100)
        setProgress(newProgress)

        if (newProgress >= 100) {
          cancelAnimationFrame(requestRef.current!)
          setTimeout(() => {
            setShowIntro(false)
            // Save that user has seen the intro
            localStorage.setItem("hasSeenIntro", "true")
          }, 500)
          return
        }
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [progress])

  const skipIntro = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }
    setShowIntro(false)
    localStorage.setItem("hasSeenIntro", "true")
  }

  if (!showIntro) return null

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative w-full h-full">
            {/* Fire background */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-red-600 to-black opacity-70"></div>

            {/* Animated flames */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 rounded-t-full"
                  style={{
                    left: `${i * 3.5 + Math.random() * 2}%`,
                    height: `${Math.random() * 20 + 15}vh`,
                    width: `${Math.random() * 3 + 2}vw`,
                    backgroundColor: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#ef4444" : "#f59e0b",
                  }}
                  animate={{
                    height: [
                      `${Math.random() * 20 + 15}vh`,
                      `${Math.random() * 30 + 20}vh`,
                      `${Math.random() * 20 + 15}vh`,
                    ],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Particles */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-orange-300 opacity-70"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  bottom: `${Math.random() * 30}%`,
                }}
                animate={{
                  y: [0, -100 - Math.random() * 200],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Logo reveal */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-4 tracking-wider"
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(255,165,0,0.8)",
                      "0 0 16px rgba(255,69,0,0.8)",
                      "0 0 8px rgba(255,165,0,0.8)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  STREAMFLIX
                </motion.h1>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500"
                  initial={{ width: "0%", left: "50%" }}
                  animate={{ width: "100%", left: "0%" }}
                  transition={{ duration: 1.2, delay: 1 }}
                />
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl mt-6 text-orange-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                Your Ultimate Streaming Experience
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            </div>

            {/* Skip button */}
            <button
              onClick={skipIntro}
              className="absolute bottom-16 right-8 text-white/80 text-sm hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
