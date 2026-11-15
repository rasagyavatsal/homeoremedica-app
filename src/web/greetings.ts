// The empty chat's greetings, by the part of the day on the device's clock. The Android app keeps the same list.

const MORNING = [
  "Good morning. What's the case today?",
  'Morning. Who are we seeing first?',
  "Good morning. Let's find the remedy.",
  'A fresh morning, a fresh case.',
]

const AFTERNOON = [
  "Good afternoon. What's the case?",
  'Afternoon. Tell me about the patient.',
  'Good afternoon. Which symptoms are we working with?',
  "Afternoon. Let's take the case.",
]

const EVENING = [
  "Good evening. What's the case?",
  'Evening. Ready when you are.',
  'Good evening. Tell me about the patient.',
  "Evening. Let's find the remedy.",
]

const NIGHT = [
  "Working late? Let's find the remedy.",
  "Still up. What's the case?",
  'A quiet night for a careful case.',
  'Late hours. Tell me about the patient.',
]

const ANY_TIME = [
  "Hello. What's the case today?",
  'Ready when you are.',
  "Let's find the remedy.",
  "Describe the symptoms, and we'll begin.",
  "Like cures like. Let's begin.",
]

/** The greetings that suit [hour] (0 to 23): morning from 5, afternoon from 12, evening from 17, night from 22. */
export function greetingsAt(hour: number): string[] {
  const part = hour >= 5 && hour < 12 ? MORNING : hour >= 12 && hour < 17 ? AFTERNOON : hour >= 17 && hour < 22 ? EVENING : NIGHT
  return [...part, ...ANY_TIME]
}

/** One greeting for [now], picked at random from those that suit its hour. */
export function greeting(now = new Date(), random = Math.random): string {
  const choices = greetingsAt(now.getHours())
  return choices[Math.floor(random() * choices.length)]
}
