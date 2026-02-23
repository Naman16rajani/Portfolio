import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { GET } from '../../src/app/api/resume-pdf/route'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('fetches abouts with new fields', async () => {
    const abouts = await payload.find({
      collection: 'abouts',
      limit: 1,
    })
    expect(abouts).toBeDefined()
    if (abouts.docs.length > 0) {
      const about = abouts.docs[0]
      expect(about).toHaveProperty('name')
      expect(about).toHaveProperty('email')
      expect(about).toHaveProperty('phone')
    }
  })

  it('resume API returns 404 when none exists', async () => {
    await payload.delete({ collection: 'resume', where: {} })
    const res = await GET()
    expect(res.status).toBe(404)
  })

  it('resume API redirects when a resume exists', async () => {
    // clear and create fresh resume
    await payload.delete({ collection: 'resume', where: {} })
    const media = await payload.create({
      collection: 'media',
      data: { url: 'https://example.com/test.pdf' },
    })
    await payload.create({
      collection: 'resume',
      data: { name: 'Resume', pdfFile: media.id },
    })

    const res = await GET()
    expect(res.status).toBe(302)
    const loc = res.headers.get('location')
    expect(loc).toBe('https://example.com/test.pdf')
  })
})
