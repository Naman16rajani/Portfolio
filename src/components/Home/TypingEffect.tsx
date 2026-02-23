'use client'

import { useState, useEffect } from 'react'

type TypingEffectProps = {
  text: string[]
  typingDelay?: number
  eraseDelay?: number
  cursor?: string
  staticText?: string
}

export function TypingEffect({
  text,
  typingDelay = 200,
  eraseDelay = 1000,
  cursor = '|',
  staticText = '',
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (text.length === 0) return

    const currentWord = text[wordIndex]
    const timeout = isDeleting ? typingDelay / 2 : typingDelay

    const timer = setTimeout(() => {
      if (isDeleting) {
        const nextText = currentWord.substring(0, displayText.length - 1)
        setDisplayText(nextText)
        if (nextText.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % text.length)
        }
      } else {
        const nextText = currentWord.substring(0, displayText.length + 1)
        setDisplayText(nextText)
        if (nextText === currentWord) {
          setTimeout(() => setIsDeleting(true), eraseDelay)
        }
      }
    }, displayText.length === 0 && !isDeleting ? typingDelay : timeout)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, wordIndex, text, typingDelay, eraseDelay])

  return (
    <span>
      {staticText} {displayText}
      <span className="typing-cursor">{cursor}</span>
    </span>
  )
}
