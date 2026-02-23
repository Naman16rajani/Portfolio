'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import './Project.scss'

type ProjectItem = {
  title: string
  name: string
  description: SerializedEditorState // raw richtext data
  githubLink?: string | null
  demoLink?: string | null
  tags?: Array<{ tag: string }> | null
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
  const [animateCard, setAnimateCard] = useState<{ y: number; opacity: number }>({
    y: 0,
    opacity: 1,
  })

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

  const handleLinkClick = (url: string | null | undefined) => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="app__project" id="project">
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>

      <div className="app__project-filter">
        {tags.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__project-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__project-portfolio"
      >
        {filterWork.map((work, index) => {
          const workTags = getTagStrings(work.tags)
          return (
            <div className="app__project-item app__flex" key={index}>
              <div className="app__project-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                {/* tag badges */}
                <div className="tag-badges">
                  {workTags.map((t, i) => (
                    <span key={i} className="tag-badge">
                      {t}
                    </span>
                  ))}
                </div>
                {/* render rich text using Payload's RichText component */}
                <div>
                  <RichText data={work.description} />
                </div>
                <br />
                <div className="button-group">
                  {work.githubLink && (
                    <button
                      className="app__project-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLinkClick(work.githubLink)
                      }}
                    >
                      <FaGithub className="button-icon" />
                      <span className="button-text">GitHub</span>
                      <span className="app__project-button-ripple" />
                    </button>
                  )}
                  {work.demoLink && (
                    <button
                      className="app__project-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLinkClick(work.demoLink)
                      }}
                    >
                      <FaExternalLinkAlt className="button-icon" />
                      <span className="button-text">Demo</span>
                      <span className="app__project-button-ripple" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
