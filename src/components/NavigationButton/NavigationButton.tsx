'use client'

import './NavigationButton.scss'

type NavigationButtonProps = {
  id: string
  active: string
  getIcon: (id: string) => React.ReactNode
  action: (id: string) => string
  onResumeClick: (id: string) => void
}

export function NavigationButton({ id, active, getIcon, action, onResumeClick }: NavigationButtonProps) {
  return (
    <button
      className={`${active} app__navigation-button`}
      onClick={() => onResumeClick(id)}
    >
      <a className="app__navigation-icon" href={action(id)}>
        {getIcon(id)}
        <span className="app__navigation-button-ripple" />
      </a>
    </button>
  )
}
