import { useState, useEffect } from 'react'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/context/game/store/data'

export interface IWindowSize {
  width: number
  height: number
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
