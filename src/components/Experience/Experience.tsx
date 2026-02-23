import './Experience.scss'

type ExperienceItem = {
  role: string
  JoiningDate: string
  endDate?: string | null
  companyHtml: string
  descHtml: string
}

type ExperienceProps = {
  experiences: ExperienceItem[]
}

function convertDate(a: string | null | undefined): string {
  if (a == null) return 'Current'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(a))
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <div id="experience" className="app__experience">
      <h2 className="head-text">Work Experience</h2>

      <div className="app__experience-description" suppressHydrationWarning>
        {experiences.map((a, index) => (
          <div className="timeline-block timeline-block-right" id={String(index)} key={index}>
            <div className="marker" />
            <div className="timeline-content">
              <h3>{a.role}</h3>
              <div className="app__experience-description-primary">
                <span
                  dangerouslySetInnerHTML={{ __html: a.companyHtml }}
                  className="app__experience-description-primary-name"
                  suppressHydrationWarning
                />
                <span className="app__experience-description-primary-date">
                  {convertDate(a.JoiningDate)} &nbsp;-&nbsp; {convertDate(a.endDate)}
                </span>
              </div>
              <p dangerouslySetInnerHTML={{ __html: a.descHtml }} suppressHydrationWarning />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
