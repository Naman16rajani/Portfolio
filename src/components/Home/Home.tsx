'use client'

import { Wave } from '../Wave/Wave'
import { TypingEffect } from './TypingEffect'
import './Home.scss'

type HomeProps = {
  roles: string[]
}

export function Home({ roles }: HomeProps) {
  const displayRoles = ['Human', ...roles]

  return (
    <div id="home" className="app__home">
      <div className="app__home-div">
        <h1 className="app__home-intro">Naman Rajani</h1>
        {/* <br /> */}
        <div className="TypingEffect">
          <p>
            {displayRoles.length > 0 && (
              <TypingEffect
                typingDelay={200}
                eraseDelay={1000}
                cursor="|"
                text={displayRoles}
                staticText="I'M"
              />
            )}
          </p>
        </div>
      </div>
      <Wave />
    </div>
  )
}
