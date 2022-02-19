import { Stage, Layer } from 'react-konva'
import { Ball } from 'src/components/Ball'
import { useGameLoop } from 'src/components/Game/hooks/_useGameLoop'
import { useSetup } from 'src/components/Game/hooks/_useSetup'
import { Player } from 'src/components/Player'

const Game = () => {
  const { stageRef, width, height } = useSetup()

  useGameLoop()

  return (
    <Stage ref={stageRef} width={width} height={height}>
      <Layer>
        <Player y={20} x={20} />
        <Player y={20} x={60} />
        <Ball y={20} x={100} />
      </Layer>
    </Stage>
  )
}

// We need this because of dynamic imports
// eslint-disable-next-line import/no-default-export
export default Game
