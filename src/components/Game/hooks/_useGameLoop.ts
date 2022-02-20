import { useContext } from 'react'
import { GameContext } from 'src/context/game/GameContext'
import { moveBall, moveDown, moveUp } from 'src/context/game/store/actions'
import { useInterval } from 'src/hooks/useInterval'
import { useKeyPress } from 'src/hooks/useKeyPress'

// TODO: move to proper place 😅
const FPS = 60
const MILLISECONDS_PER_FRAME = 1000 / FPS

let millisecondsPreviousFrame = 0
let deltaTime = 0

export const useGameLoop = () => {
  const { dispatch } = useContext(GameContext)
  const { hasPressed, clearKeys } = useKeyPress()

  const cycle = () => {
    deltaTime = (Date.now() - millisecondsPreviousFrame) / 1000.0

    if (deltaTime < 1) {
      if (hasPressed('ArrowUp') || hasPressed('Up')) {
        dispatch(moveUp('player1', 2000 * deltaTime))
      }

      if (hasPressed('ArrowDown') || hasPressed('Down')) {
        dispatch(moveDown('player1', 2000 * deltaTime))
      }

      dispatch(moveBall(deltaTime))
    }

    millisecondsPreviousFrame = Date.now()

    clearKeys()
  }

  useInterval(cycle, MILLISECONDS_PER_FRAME)
}
