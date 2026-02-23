'use client'

import { useEffect, useCallback } from 'react'

const CACHE_NAME = 'resume-pdf'
const RESUME_URL = '/api/resume-pdf'

export function useResumePrefetch(enabled: boolean) {
  // Silently warm the cache after the page renders
  useEffect(() => {
    if (!enabled) return
    if (typeof caches === 'undefined') return
    ;(async () => {
      try {
        const cache = await caches.open(CACHE_NAME)
        const existing = await cache.match(RESUME_URL)
        if (!existing) {
          // fetch() follows the redirect; the final PDF response is stored
          await cache.add(RESUME_URL)
        }
      } catch {
        // Non-critical — silently ignore (private mode, etc.)
      }
    })()
  }, [enabled])

  // Called when user clicks the Resume button
  const openResume = useCallback(async () => {
    // Fallback: no Cache API support
    if (typeof caches === 'undefined') {
      window.open(RESUME_URL, '_blank')
      return
    }

    try {
      const cache = await caches.open(CACHE_NAME)
      let response = await cache.match(RESUME_URL)

      if (!response) {
        // Prefetch missed or evicted — fetch live and store for next time
        const fetched = await fetch(RESUME_URL)
        await cache.put(RESUME_URL, fetched.clone())
        response = fetched
      }

      // response.url is the final resolved URL after following the redirect
      // (e.g. http://localhost:3000/api/media/file/Resume.pdf)
      // Open that directly — avoids blob:// URL PDF rendering issues
      const finalUrl = response.url || RESUME_URL
      window.open(finalUrl, '_blank')
    } catch {
      // Fallback on any error
      window.open(RESUME_URL, '_blank')
    }
  }, [])

  return { openResume }
}
