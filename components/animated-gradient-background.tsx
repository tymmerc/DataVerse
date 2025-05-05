"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode
}

export function AnimatedGradientBackground({ children }: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.1, y: canvas.height * 0.1, vx: 0.2, vy: 0.3, radius: canvas.width * 0.4 },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, vx: -0.1, vy: 0.2, radius: canvas.width * 0.3 },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, vx: 0.15, vy: -0.2, radius: canvas.width * 0.35 },
    ]

    // Animation loop
    const animate = () => {
      // Clear canvas with a dark background
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw gradient points
      gradientPoints.forEach((point) => {
        // Move points
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Create radial gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        // Different colors for each point
        if (gradientPoints.indexOf(point) === 0) {
          gradient.addColorStop(0, "rgba(29, 78, 216, 0.15)") // blue
          gradient.addColorStop(1, "rgba(29, 78, 216, 0)")
        } else if (gradientPoints.indexOf(point) === 1) {
          gradient.addColorStop(0, "rgba(124, 58, 237, 0.12)") // purple
          gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
        } else {
          gradient.addColorStop(0, "rgba(6, 95, 70, 0.1)") // green
          gradient.addColorStop(1, "rgba(6, 95, 70, 0)")
        }

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" style={{ opacity: 0.8 }} />
      {children}
    </div>
  )
}
