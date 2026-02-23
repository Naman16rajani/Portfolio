type MediaWithUrl = { url?: string | null } | { value?: { url?: string | null } }

export function getImageUrl(source: MediaWithUrl | string | number | null | undefined): string {
  if (source == null) return ''
  if (typeof source === 'string') return source
  if (typeof source === 'number') return ''
  const url = 'url' in source ? source.url : (source as { value?: { url?: string | null } }).value?.url
  return url || ''
}
