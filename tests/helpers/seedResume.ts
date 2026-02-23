import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

/**
 * Ensures a single resume document exists with a reachable PDF URL.
 */
export async function seedResume(): Promise<void> {
  const payload = await getPayload({ config })

  // remove any existing resumes
  await payload.delete({
    collection: 'resume',
    where: {},
  })

  // create a media entry for the PDF
  const media = await payload.create({
    collection: 'media',
    data: {
      alt: 'resume pdf',
      url: 'https://example.com/test.pdf',
      filename: 'test.pdf',
      mimeType: 'application/pdf',
      filesize: 123,
    },
  })

  await payload.create({
    collection: 'resume',
    data: {
      name: 'Resume',
      pdfFile: media.id,
    },
  })
}
