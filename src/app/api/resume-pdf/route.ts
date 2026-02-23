import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'resume',
    limit: 1,
    depth: 1,
  })
  const resume = docs[0] as {
    pdfFile?: { url?: string; value?: { url?: string } }
  }

  if (!resume || !resume.pdfFile) {
    return new NextResponse(null, { status: 404 })
  }

  const rawUrl = resume.pdfFile.url ?? resume.pdfFile.value?.url

  if (!rawUrl) {
    return new NextResponse(null, { status: 404 })
  }

  // Resolve relative paths (e.g. /api/media/file/...) to absolute using the incoming request origin
  const absoluteUrl = new URL(rawUrl, request.url).toString()

  return NextResponse.redirect(absoluteUrl)
}
