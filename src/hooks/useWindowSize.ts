import { useState, useEffect } from 'react'
import { getWindowHeight, getWindowWidth } from 'src/services/window'

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
        width: getWindowWidth(),
        height: getWindowHeight(),
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
