import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'resume',
    where: { name: { equals: 'resume' } },
    limit: 1,
    depth: 1,
  })
  const resume = docs[0]
  if (!resume?.pdfFile) {
    return Response.json({ url: null }, { status: 404 })
  }
  const pdf = resume.pdfFile as { url?: string } | { value?: { url?: string } }
  const url = typeof pdf === 'object' && pdf !== null && 'url' in pdf ? pdf.url : (pdf as { value?: { url?: string } }).value?.url
  return Response.json({ url: url || null })
}
