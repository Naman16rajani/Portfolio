import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Roles } from './collections/Roles'
import { Abouts } from './collections/Abouts'
import { Resume } from './collections/Resume'
import { WorkExperience } from './collections/WorkExperience'
import { Projects } from './collections/Projects'
import { Contact } from './collections/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Roles, Abouts, Resume, WorkExperience, Projects, Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: (() => {
        const url = process.env.DATABASE_URL || ''
        if (!url || !url.startsWith('postgres')) return url
        const isLocalhost = /@(localhost|127\.0\.0\.1)(:\d+)?\//.test(url)
        if (isLocalhost) {
          if (/[?&]sslmode=/.test(url)) return url
          const separator = url.includes('?') ? '&' : '?'
          return `${url}${separator}sslmode=disable`
        }
        if (/[?&]sslmode=(require|prefer|verify-ca)(&|$)/.test(url)) {
          return url.replace(/sslmode=(require|prefer|verify-ca)/, 'sslmode=verify-full')
        }
        if (!/[?&]sslmode=/.test(url)) {
          const separator = url.includes('?') ? '&' : '?'
          return `${url}${separator}sslmode=verify-full`
        }
        return url
      })(),
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production' || !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: (() => {
        const t = process.env.BLOB_READ_WRITE_TOKEN
        if (process.env.NODE_ENV === 'production' && !t) {
          throw new Error('BLOB_READ_WRITE_TOKEN env var must be set in production')
        }
        return t
      })(),
    }),
  ],
})
