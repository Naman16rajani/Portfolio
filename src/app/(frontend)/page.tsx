import { getPayloadClient } from '@/lib/payload'
import { serializeRichText } from '@/lib/richText'
import { getImageUrl } from '@/lib/imageUrl'

export const dynamic = 'force-dynamic'
import { Navbar } from '@/components/Navbar/Navbar'
import { Home } from '@/components/Home/Home'
import { About } from '@/components/About/About'
import { Experience } from '@/components/Experience/Experience'
import { Project } from '@/components/Project/Project'
import { Contact } from '@/components/Contact/Contact'

export default async function PortfolioPage() {
  const payload = await getPayloadClient()

  const [rolesRes, aboutsRes, resumeRes, experiencesRes, projectsRes] = await Promise.all([
    payload.find({ collection: 'roles', limit: 100 }),
    payload.find({ collection: 'abouts', limit: 10, depth: 1 }),
    payload.find({ collection: 'resume', where: { name: { equals: 'resume' } }, limit: 1 }),
    payload.find({ collection: 'work-experience', limit: 50, depth: 1, sort: '-JoiningDate' }),
    payload.find({ collection: 'projects', limit: 50, depth: 1 }),
  ])

  const roles = rolesRes.docs.map((r) => r.title)
  const about = aboutsRes.docs.map((a) => ({
    ...a,
    descriptionHtml: serializeRichText(a.description),
    imgUrl: getImageUrl(a.imgUrl),
  }))
  const hasResume = resumeRes.docs.length > 0
  const experiences = experiencesRes.docs
    .sort((a, b) => new Date(b.JoiningDate).getTime() - new Date(a.JoiningDate).getTime())
    .map((e) => ({
      ...e,
      companyHtml: serializeRichText(e.company),
      descHtml: serializeRichText(e.desc),
    }))
  const projects = projectsRes.docs.map((p) => ({
    ...p,
    descriptionHtml: serializeRichText(p.description),
    imgUrl: getImageUrl(p.imgUrl),
  }))

  return (
    <div className="app">
      <Navbar />
      <Home roles={roles} />
      <About about={about} hasResume={hasResume} />
      <Experience experiences={experiences} />
      <Project works={projects} />
      <Contact />
    </div>
  )
}
