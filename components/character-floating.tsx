"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function CharacterFloating() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState({ x: 1, y: 1 })
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Random movement within a small range
        const newX = prev.x + (Math.random() * 2 - 1) * direction.x
        const newY = prev.y + (Math.random() * 2 - 1) * direction.y

        // Change direction occasionally
        if (Math.random() > 0.95) {
          setDirection((prev) => ({
            x: prev.x * (Math.random() > 0.5 ? 1 : -1),
            y: prev.y * (Math.random() > 0.5 ? 1 : -1),
          }))
        }

        // Slight rotation
        setRotation((prev) => prev + (Math.random() * 2 - 1))

        return { x: newX, y: newY }
      })
    }, 50)

    return () => clearInterval(interval)
  }, [direction])

  return (
    <div
      className="relative h-40 w-40 md:h-60 md:w-60"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        transition: "transform 0.5s ease-out",
      }}
    >
      <div className="absolute inset-0 animate-float">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-05%20at%2002.23.43_67fdda6f.jpg-YIHYiLoHdrxlcfOUBBpXmgHQxfetY7.jpeg"
          alt="Floating character"
          width={240}
          height={240}
          className="h-full w-full object-contain rounded-full"
        />
      </div>
      <div className="absolute -bottom-4 left-1/2 h-4 w-20 -translate-x-1/2 animate-pulse rounded-full bg-purple-500/30 blur-md" />
    </div>
  )
}

