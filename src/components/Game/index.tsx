import { useContext } from 'react'
import { Stage, Layer } from 'react-konva'
import { Ball } from 'src/components/Ball'
import { useGameLoop } from 'src/components/Game/hooks/_useGameLoop'
import { useSetup } from 'src/components/Game/hooks/_useSetup'
import { Player } from 'src/components/Player'
import { ScoreBoard } from 'src/components/ScoreBoard'
import { GameContext } from 'src/context/game/GameContext'

const Game = () => {
  const {
    state: { score, ball, player1, player2 },
  } = useContext(GameContext)
  const { stageRef, width, height } = useSetup()

  useGameLoop()

  // TODO: further performance improvements
  return (
    <Stage ref={stageRef} width={width} height={height}>
      <Layer>
        <ScoreBoard player1Score={score.player1} player2Score={score.player2} />
        <Player x={player1.position.x} y={player1.position.y} />
        <Player x={player2.position.x} y={player2.position.y} />
        <Ball x={ball.position.x} y={ball.position.y} />
      </Layer>
    </Stage>
  )
}

// We need this because of dynamic imports
// eslint-disable-next-line import/no-default-export
export default Game
