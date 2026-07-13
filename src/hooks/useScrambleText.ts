import { useEffect, useState } from 'react'

const scrambleCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]'

export function useScrambleText(
  words: readonly string[],
  intervalMs = 2400,
) {
  const [displayText, setDisplayText] = useState(words[0] ?? '')

  useEffect(() => {
    if (words.length <= 1) {
      return
    }

    let wordIndex = 0
    let scrambleInterval: number | undefined

    function scrambleToNextWord() {
      wordIndex = (wordIndex + 1) % words.length

      const targetWord = words[wordIndex]
      let frame = 0

      if (scrambleInterval) {
        window.clearInterval(scrambleInterval)
      }

      scrambleInterval = window.setInterval(() => {
        const resolvedCharacters = Math.floor(frame / 2)

        const scrambledText = targetWord
          .split('')
          .map((character, characterIndex) => {
            if (character === ' ') {
              return ' '
            }

            if (characterIndex < resolvedCharacters) {
              return character
            }

            const randomIndex = Math.floor(
              Math.random() * scrambleCharacters.length,
            )

            return scrambleCharacters[randomIndex]
          })
          .join('')

        setDisplayText(scrambledText)
        frame += 1

        if (resolvedCharacters >= targetWord.length) {
          window.clearInterval(scrambleInterval)
          setDisplayText(targetWord)
        }
      }, 36)
    }

    const wordInterval = window.setInterval(
      scrambleToNextWord,
      intervalMs,
    )

    return () => {
      window.clearInterval(wordInterval)

      if (scrambleInterval) {
        window.clearInterval(scrambleInterval)
      }
    }
  }, [intervalMs, words])

  return displayText
}