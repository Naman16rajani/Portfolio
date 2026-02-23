import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const seedUser = {
  email: process.env.SEED_USER_EMAIL ?? 'dev@payloadcms.com',
  password: process.env.SEED_USER_PASSWORD ?? 'test',
}

async function run() {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: seedUser.email,
      },
    },
  })

  await payload.create({
    collection: 'users',
    data: seedUser,
  })

  console.log(`Seeded user: ${seedUser.email}`)
}

run().catch((error) => {
  console.error('Failed to seed user data')
  console.error(error)
  process.exit(1)
})
