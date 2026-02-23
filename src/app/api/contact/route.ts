import { NextRequest } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, message } = body
  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const payload = await getPayload({ config: configPromise })
  await payload.create({
    collection: 'contact',
    data: { name, email, message },
  })
  return Response.json({ success: true })
}
