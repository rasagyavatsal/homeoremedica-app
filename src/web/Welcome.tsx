import { useState } from 'react'
import { greeting } from './greetings.ts'

/** The empty chat: a greeting for the time of day, picked once as the chat opens. */
export function Welcome() {
  const [line] = useState(() => greeting())
  return (
    <div className="welcome">
      <h1 className="tagline">
        <span className="tagline-text">{line}</span>
      </h1>
    </div>
  )
}
