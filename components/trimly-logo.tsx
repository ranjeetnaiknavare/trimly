interface TrimlyLogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}

export function TrimlyLogo({ size = "md", withText = true, className = "" }: TrimlyLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-lg",
    md: "h-10 w-10 text-xl",
    lg: "h-12 w-12 text-2xl",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-rose-600 text-white rounded-lg flex items-center justify-center font-bold`}
      >
        T
      </div>
      {withText && <span className={`ml-2 font-bold text-rose-600 ${textSizeClasses[size]}`}>Trimly</span>}
    </div>
  )
}
