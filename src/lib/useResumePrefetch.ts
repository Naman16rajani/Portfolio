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
        // Prefetch may still be in-flight or was evicted — fetch live and store
        const fetched = await fetch(RESUME_URL)
        // Clone before consuming: one copy for cache, one for blob
        await cache.put(RESUME_URL, fetched.clone())
        response = fetched
      }

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      window.open(blobUrl, '_blank')

      // Revoke after browser has had time to read the URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
    } catch {
      // Fallback on any error
      window.open(RESUME_URL, '_blank')
    }
  }, [])

  return { openResume }
}
