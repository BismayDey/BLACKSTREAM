"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FieryIntroProps {
  onComplete: () => void
  showIntro: boolean
}

export default function FieryIntro({ onComplete, showIntro }: FieryIntroProps) {
  const [progress, setProgress] = useState(0)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const duration = 3000 // 3 seconds for the intro

  useEffect(() => {
    if (!showIntro) return

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        const newProgress = Math.min(progress + (deltaTime / duration) * 100, 100)
        setProgress(newProgress)

        if (newProgress >= 100) {
          cancelAnimationFrame(requestRef.current!)
          setTimeout(() => {
            onComplete()
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
  }, [progress, showIntro, onComplete])

  if (!showIntro) return null

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full">
            {/* Fire background */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-red-600 to-black opacity-70"></div>

            {/* Animated flames */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 w-8 h-32 bg-yellow-500 rounded-t-full"
                  style={{
                    left: `${i * 5 + Math.random() * 2}%`,
                    height: `${Math.random() * 20 + 15}vh`,
                    backgroundColor: i % 2 === 0 ? "#f97316" : "#ef4444",
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

            {/* Logo reveal */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4 tracking-wider"
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
                className="w-64 h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} />
            </div>

            {/* Skip button */}
            <button onClick={onComplete} className="absolute bottom-16 right-8 text-white/80 text-sm hover:text-white">
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
