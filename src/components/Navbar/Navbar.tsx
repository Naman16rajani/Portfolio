'use client'

import { useState, useEffect } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { FaAddressBook, FaCode, FaPlus } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { IoIosDocument } from 'react-icons/io'
import { NavigationButton } from '../NavigationButton/NavigationButton'
// resume download is handled via API redirect so helper no longer needed
// import { downloadPdf } from '@/lib/downloadPdf'
import { useResumePrefetch } from '@/lib/useResumePrefetch'
import './Navbar.scss'

function getIcon(id: string) {
  switch (id) {
    case 'home':
      return <GoHomeFill />
    case 'project':
      return <HiMiniSquares2X2 />
    case 'about':
      return <IoPerson />
    case 'experience':
      return <FaCode />
    case 'skill':
      return <FaCode />
    case 'resume':
      return <IoIosDocument />
    case 'contact':
      return <FaAddressBook />
    default:
      return <FaCode />
  }
}

function getAction(id: string) {
  return '#' + id
}

export function Navbar({ hasResume }: { hasResume: boolean }) {
  const [active, setActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { openResume } = useResumePrefetch(hasResume)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  function handleClick() {
    setActive(!active)
  }

  async function handleItemClick(id: string) {
    if (id === 'resume') {
      await openResume()
    }
  }

  const ids = ['home', 'about', 'experience', 'project', 'contact']
  if (hasResume) ids.push('resume')

  if (isMobile) {
    return (
      <div className={`floating-menu ${active ? 'active' : ''}`}>
        {ids.map((id, index) => (
          <a
            href={id === 'resume' ? '#' : getAction(id)}
            key={index}
            className={`icon icon-${index + 1} ${active ? 'active' : ''}`}
            onClick={(e) => {
              if (id === 'resume') {
                e.preventDefault()
                openResume()
              }
            }}
          >
            {getIcon(id)}
          </a>
        ))}
        <div className={`menu-btn ${active ? 'active' : ''}`} onClick={handleClick}>
          <FaPlus />
        </div>
      </div>
    )
  }

  return (
    <nav className="app__navigation">
      {ids.map((id, index) => (
        <NavigationButton
          id={id}
          key={index}
          active=""
          getIcon={getIcon}
          action={getAction}
          onResumeClick={handleItemClick}
        />
      ))}
    </nav>
  )
}
