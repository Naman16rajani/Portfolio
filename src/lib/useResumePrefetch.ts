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
    // Open the window immediately (synchronously in the user gesture) to avoid
    // mobile browsers (iOS Safari) blocking window.open() called after an await.
    const win = window.open('', '_blank')

    // Fallback: no Cache API support
    if (typeof caches === 'undefined') {
      if (win) win.location.href = RESUME_URL
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
      const finalUrl = response.url || RESUME_URL
      if (win) win.location.href = finalUrl
    } catch {
      // Fallback on any error
      if (win) win.location.href = RESUME_URL
    }
  }, [])

  return { openResume }
}
