import Konva from 'konva'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'src/components/Game/hooks/useWindowSize'

export const useGameStyles = () => {
  const stageRef = useRef(null)
  const { width, height } = useWindowSize()

  const getGameWidth = () => (width / 3) * 2

  const getGameHeight = () => (height / 3) * 2

  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current as Konva.Stage

      stage.container().style.backgroundColor = 'black'
      stage.container().style.height = 'auto'
      stage.container().style.width = `${getGameWidth()}px;`
      stage.container().style.height = `${getGameHeight()}px;`
    }
  }, [stageRef.current, width, height])

  return { stageRef, width: getGameWidth(), height: getGameHeight() }
}
