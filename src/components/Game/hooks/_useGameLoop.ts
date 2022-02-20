import { useContext } from 'react'
import { GameContext } from 'src/context/game/GameContext'
import {
  moveBall,
  moveDown,
  moveUp,
  playAI,
} from 'src/context/game/store/actions'
import { MS_PER_FRAME } from 'src/context/game/store/data'
import { useInterval } from 'src/hooks/useInterval'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { calculateDeltaTime } from 'src/services/time'

// TODO: useRef or test performance when stored in state
// !! We want to avoid React fiber re-renders

let msPreviousFrame = 0
let deltaTime = 0

// !!

export const useGameLoop = () => {
  const { dispatch } = useContext(GameContext)
  const { hasPressed, clearKeys } = useKeyPress()

  const processFrame = () => {
    deltaTime = calculateDeltaTime(msPreviousFrame)

    if (deltaTime < 1) {
      if (hasPressed('ArrowUp') || hasPressed('Up')) {
        dispatch(moveUp('player1', deltaTime))
      }

      if (hasPressed('ArrowDown') || hasPressed('Down')) {
        dispatch(moveDown('player1', deltaTime))
      }

      // Move roughly every 125ms
      if (msPreviousFrame % 125 < 15) {
        dispatch(playAI(deltaTime))
      }

      dispatch(moveBall(deltaTime))
    }

    msPreviousFrame = Date.now()

    clearKeys()
  }

  useInterval(processFrame, MS_PER_FRAME)
}
