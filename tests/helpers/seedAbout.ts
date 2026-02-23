import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const aboutSeed = {
  title: 'About me',
  name: 'Naman Rajani',
  email: 'rajaninaman16@gmail.com',
  phone: '+1 (341) 777-8615',
  description: [
    {
      type: 'paragraph',
      children: [{ text: 'Test description' }],
    },
  ],
  // imgUrl to be filled in dynamically in seed function
  imgUrl: null,
}

/**
 * Ensures a single about document exists with provided fields.
 */
export async function seedAbout(): Promise<void> {
  const payload = await getPayload({ config })

  // delete existing about documents
  await payload.delete({
    collection: 'abouts',
    where: {},
  })

  // also create a dummy media item for the required imgUrl relation
  const media = await payload.create({
    collection: 'media',
    data: {
      alt: 'placeholder',
      url: 'https://via.placeholder.com/150',
      filename: 'placeholder.png',
      mimeType: 'image/png',
      filesize: 123,
      width: 150,
      height: 150,
    },
  })

  // create a new about using the media id
  await payload.create({
    collection: 'abouts',
    data: {
      ...aboutSeed,
      imgUrl: media.id,
    },
  })
}
