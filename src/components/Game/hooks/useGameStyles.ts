import Konva from 'konva'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'src/components/Game/hooks/useWindowSize'

export const useGameStyles = () => {
  const stageRef = useRef(null)
  const { width, height } = useWindowSize()

  const getWidth = () => (width / 3) * 2
  const getHeight = () => (height / 3) * 2

  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current as Konva.Stage

      stage.container().style.backgroundColor = 'black'
      stage.container().style.height = 'auto'
      stage.container().style.width = `${getWidth()}px;`
      stage.container().style.height = `${getHeight()}px;`
    }
  }, [stageRef.current, width, height])

  return { stageRef, width: getWidth(), height: getHeight() }
}