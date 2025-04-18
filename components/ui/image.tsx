"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

export function Image({ src, alt, className, fallbackSrc = "/placeholder.svg", ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
    setError(false)
  }, [src])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <img
        src={error ? fallbackSrc : imgSrc}
        alt={alt || ""}
        className={cn("w-full h-full object-cover", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
          setImgSrc(fallbackSrc)
        }}
        {...props}
      />
    </div>
  )
}
