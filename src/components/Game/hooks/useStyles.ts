import Konva from 'konva'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'src/hooks/useWindowSize'

export const useStyles = () => {
  const stageRef = useRef(null)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current as Konva.Stage

      stage.container().style.backgroundColor = 'black'
      stage.container().style.height = 'auto'
      stage.container().style.width = `${width}px;`
      stage.container().style.height = `${height}px;`
    }
  }, [stageRef.current, width, height])

  return { stageRef, width: window.innerWidth, height: window.innerHeight }
}
