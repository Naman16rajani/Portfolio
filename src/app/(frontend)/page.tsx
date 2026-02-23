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
    payload.find({ collection: 'abouts', limit: 1, depth: 1 }),
    payload.find({ collection: 'resume', limit: 1, depth: 1 }),
    payload.find({ collection: 'work-experience', limit: 50, depth: 1, sort: '-JoiningDate' }),
    payload.find({ collection: 'projects', limit: 50, depth: 1 }),
  ])

  const roles = rolesRes.docs.map((r) => r.title)
  // keep raw lexical data for rich-text rendering instead of html string
  // only use first about document if available
  const about = aboutsRes.docs[0]
  const aboutData = about
    ? {
        ...about,
        description: about.description, // SerializedEditorState
        imgUrl: getImageUrl(about.imgUrl),
        githubUrl: about.githubUrl ?? undefined,
        linkedinUrl: about.linkedinUrl ?? undefined,
      }
    : null
  // determine if a resume document with a usable file URL exists
  const resumeDoc = resumeRes.docs[0] as {
    pdfFile?: { url?: string; value?: { url?: string } }
  } | null

  const hasResume = Boolean(resumeDoc && (resumeDoc.pdfFile?.url || resumeDoc.pdfFile?.value?.url))

  const experiences = experiencesRes.docs
    .sort((a, b) => new Date(b.JoiningDate).getTime() - new Date(a.JoiningDate).getTime())
    .map((e) => ({
      ...e,
      companyHtml: serializeRichText(e.company),
      descHtml: serializeRichText(e.desc),
    }))
  const projects = projectsRes.docs.map((p) => ({
    ...p,
    description: p.description, // raw lexical value
    // imgUrl removed per new design
    githubLink: p.githubLink,
    demoLink: p.demoLink,
  }))

  return (
    <div className="app">
      <Navbar hasResume={hasResume} />
      <Home roles={roles} displayName={aboutData?.name ?? ''} />
      <About
        about={aboutData ? [aboutData] : []}
        hasResume={hasResume}
        email={aboutData?.email}
        githubUrl={aboutData?.githubUrl}
        linkedinUrl={aboutData?.linkedinUrl}
      />
      <Experience experiences={experiences} />
      <Project works={projects} />
      <Contact email={aboutData?.email ?? ''} phone={aboutData?.phone ?? ''} />
    </div>
  )
}
