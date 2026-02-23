'use client'

import { IoIosDocument } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
// resume downloads now handled by direct link
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useResumePrefetch } from '@/lib/useResumePrefetch'
import './About.scss'

type AboutItem = {
  title: string
  description: SerializedEditorState
  imgUrl: string
}

type AboutProps = {
  about: AboutItem[]
  hasResume: boolean
  email?: string
  githubUrl?: string
  linkedinUrl?: string
}

export function About({ about, hasResume, email, githubUrl, linkedinUrl }: AboutProps) {
  const { openResume } = useResumePrefetch(hasResume)
  return (
    <div id="about" className="app__about">
      <div className="app__about-image">
        {about.map((a, index) => (
          <img key={index} src={a.imgUrl} alt={a.title} />
        ))}
      </div>
      <div className="app__about-description">
        <h5>About Me</h5>
        <h4>WHO AM I?</h4>
        {about.map((a, index) => (
          <div key={index} className="p-text">
            <RichText data={a.description} />
          </div>
        ))}
        {/* spacing below kept from original component */}
        <br />
        <br />

        <div className="app__about-buttons">
          {hasResume && (
            <button className="app__about-button" onClick={() => openResume()}>
              <IoIosDocument />
              Resume
              <span className="app__about-button-ripple" />
            </button>
          )}

          {email && (
            <a href={`mailto:${email}`}>
              <button className="app__about-button">
                <MdEmail />
                Email
                <span className="app__about-button-ripple" />
              </button>
            </a>
          )}

          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="app__about-button">
                <FaGithub />
                GitHub
                <span className="app__about-button-ripple" />
              </button>
            </a>
          )}

          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <button className="app__about-button">
                <FaLinkedin />
                LinkedIn
                <span className="app__about-button-ripple" />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
