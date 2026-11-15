import { describe, expect, it } from 'vitest'
import { greeting, greetingsAt } from './greetings.ts'

describe('greetings', () => {
  it('suits the part of the day', () => {
    expect(greetingsAt(5)).toContain("Good morning. What's the case today?")
    expect(greetingsAt(11)).not.toContain("Good afternoon. What's the case?")
    expect(greetingsAt(12)).toContain("Good afternoon. What's the case?")
    expect(greetingsAt(17)).toContain("Good evening. What's the case?")
    expect(greetingsAt(22)).toContain("Still up. What's the case?")
    expect(greetingsAt(4)).toContain("Still up. What's the case?")
  })

  it('can greet at any time of day', () => {
    for (const hour of [3, 9, 14, 19]) expect(greetingsAt(hour)).toContain('Ready when you are.')
  })

  it('picks at random from those that suit the hour', () => {
    const morning = new Date(2026, 0, 1, 8)
    expect(greeting(morning, () => 0)).toBe("Good morning. What's the case today?")
    expect(greeting(morning, () => 0.999)).toBe("Like cures like. Let's begin.")
  })
})
