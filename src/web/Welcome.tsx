import { useState } from 'react'
import { greeting } from './greetings.ts'

/** The empty chat: a greeting for the time of day, picked once as the chat opens. */
export function Welcome() {
  const [line] = useState(() => greeting())
  return (
    <div className="welcome">
      {/* Decoration only: soft light drifting behind the greeting. */}
      <div className="welcome-glows" aria-hidden="true">
        <span className="welcome-glow" />
        <span className="welcome-glow" />
        <span className="welcome-glow" />
      </div>
      <h1 className="tagline">{line}</h1>
    </div>
  )
}
