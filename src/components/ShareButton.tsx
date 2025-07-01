"use client"

import { useState, useCallback } from "react"
import { Share2, Check } from "lucide-react"

interface ShareButtonProps {
  date: string
}

export function ShareButton({ date }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const url = `https://abhishekgusain.vercel.app/logs/${date}`
    
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [date])

  return (
    <button 
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 hover:bg-neutral-2 dark:hover:bg-neutral-dark-2 ${
        isCopied 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-neutral-6 dark:text-neutral-dark-6 hover:text-neutral-8 dark:hover:text-neutral-dark-8'
      }`}
    >
      {isCopied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {isCopied ? 'Copied!' : 'Share'}
    </button>
  )
} 