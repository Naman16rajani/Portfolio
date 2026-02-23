import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export function serializeRichText(data: unknown): string {
  if (!data) return ''
  try {
    return convertLexicalToHTML({ data: data as Parameters<typeof convertLexicalToHTML>[0]['data'] })
  } catch {
    return ''
  }
}
