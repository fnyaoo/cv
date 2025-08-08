import React from 'react'

interface LoaderProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({ 
  message = "Loading...", 
  size = 'md',
  fullScreen = false,
  className = ""
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  }

  const containerClasses = fullScreen 
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center min-h-[400px]"

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-gray-900 mx-auto mb-4 ${sizeClasses[size]}`} />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}