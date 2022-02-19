import { useState } from 'react'
import { useEventListener } from 'src/hooks/useEventListener'

export const useKeyPress = () => {
  const [keys, setKeys] = useState<string[]>([])

  const addKey = (key: string) =>
    setKeys((currentKeys) => [...currentKeys, key])

  const clearKeys = () => setKeys([])

  const hasPressed = (key: string) => keys.includes(key)

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    addKey(key)
  }

  useEventListener('keydown', handleKeyPress)

  return { keys, clearKeys, hasPressed }
}
