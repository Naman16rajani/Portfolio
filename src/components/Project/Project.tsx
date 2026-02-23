'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'
import './Project.scss'

type ProjectItem = {
  title: string
  name: string
  descriptionHtml: string
  projectLink?: string | null
  tags?: Array<{ tag: string }> | null
  imgUrl: string
}

type ProjectProps = {
  works: ProjectItem[]
}

function getTagStrings(tags: ProjectItem['tags']): string[] {
  if (!tags) return []
  return tags.map((t) => (typeof t === 'string' ? t : t.tag))
}

export function Project({ works }: ProjectProps) {
  const [filterWork, setFilterWork] = useState(works)
  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState<{ y: number; opacity: number }>({ y: 0, opacity: 1 })

  const tags = ['All', ...Array.from(new Set(works.flatMap((w) => getTagStrings(w.tags))))]

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item)
    setAnimateCard({ y: 100, opacity: 0 })

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 })
      if (item === 'All') {
        setFilterWork(works)
      } else {
        setFilterWork(works.filter((work) => getTagStrings(work.tags).includes(item)))
      }
    }, 500)
  }

  const handleImageClick = (githubLink: string | null | undefined) => {
    if (githubLink) {
      window.open(githubLink, '_blank')
    }
  }

  return (
    <div className="app__work" id="project">
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>

      <div className="app__work-filter">
        {tags.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => {
          const workTags = getTagStrings(work.tags)
          return (
            <div
              className="app__work-item app__flex"
              key={index}
              onClick={() => handleImageClick(work.projectLink)}
            >
              <div className="app__work-img app__flex">
                <img className="clickable" src={work.imgUrl} alt={work.name} />
                <div className="app__work-tag app__flex">
                  <p className="p-text">{workTags[0] || 'Project'}</p>
                </div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" dangerouslySetInnerHTML={{ __html: work.descriptionHtml }} suppressHydrationWarning />
                <br />
                <button
                  className="app__work-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleImageClick(work.projectLink)
                  }}
                >
                  More info <FaArrowRightLong />
                  <span className="app__work-button-ripple" />
                </button>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
