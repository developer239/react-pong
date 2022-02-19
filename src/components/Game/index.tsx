import { useContext } from 'react'
import { Stage, Layer } from 'react-konva'
import { Ball } from 'src/components/Ball'
import { useGameLoop } from 'src/components/Game/hooks/_useGameLoop'
import { useSetup } from 'src/components/Game/hooks/_useSetup'
import { Player } from 'src/components/Player'
import { GameContext } from 'src/context/game/GameContext'

const Game = () => {
  const {
    state: { ball, player1, player2 },
  } = useContext(GameContext)
  const { stageRef, width, height } = useSetup()

  useGameLoop()

  return (
    <Stage ref={stageRef} width={width} height={height}>
      <Layer>
        <Player x={player1.x} y={player1.y} />
        <Player x={player2.x} y={player2.y} />
        <Ball x={ball.x} y={ball.y} />
      </Layer>
    </Stage>
  )
}

// We need this because of dynamic imports
// eslint-disable-next-line import/no-default-export
export default Game
