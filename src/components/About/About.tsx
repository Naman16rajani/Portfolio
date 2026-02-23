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
}

export function About({ about, hasResume, email }: AboutProps) {
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

        {hasResume && (
          <button className="app__about-button" onClick={() => openResume()}>
            <IoIosDocument />
            <span
              style={{
                display: 'inline-block',
                width: '1px',
                height: '1px',
                backgroundColor: 'transparent',
              }}
            />
            Resume
            <span className="app__about-button-ripple" />
          </button>
        )}

        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            backgroundColor: 'transparent',
          }}
        />

        {email && (
          <a href={`mailto:${email}`}>
            <button className="app__about-button">
              <MdEmail />
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '3px',
                  backgroundColor: 'transparent',
                }}
              />
              Email
              <span className="app__about-button-ripple" />
            </button>
          </a>
        )}

        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            backgroundColor: 'transparent',
          }}
        />
        <a href="https://github.com/Naman16rajani" target="_blank" rel="noopener noreferrer">
          <button className="app__about-button">
            <FaGithub />
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '3px',
                backgroundColor: 'transparent',
              }}
            />
            GitHub
            <span className="app__about-button-ripple" />
          </button>
        </a>
        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            backgroundColor: 'transparent',
          }}
        />
        <a
          href="https://www.linkedin.com/in/naman-rajani/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="app__about-button">
            <FaLinkedin />
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '3px',
                backgroundColor: 'transparent',
              }}
            />
            LinkedIn
            <span className="app__about-button-ripple" />
          </button>
        </a>
      </div>
    </div>
  )
}
