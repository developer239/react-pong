import { useContext, useRef } from 'react'
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

export const useGameLoop = () => {
  const msPreviousFrameRef = useRef(0)
  const deltaTimeRef = useRef(0)
  const { dispatch } = useContext(GameContext)
  const { hasPressed, clearKeys } = useKeyPress()

  const processFrame = () => {
    deltaTimeRef.current = calculateDeltaTime(msPreviousFrameRef.current)

    if (deltaTimeRef.current < 1) {
      if (hasPressed('ArrowUp') || hasPressed('Up')) {
        dispatch(moveUp('player1', deltaTimeRef.current))
      }

      if (hasPressed('ArrowDown') || hasPressed('Down')) {
        dispatch(moveDown('player1', deltaTimeRef.current))
      }

      // Move roughly every 125ms
      if (msPreviousFrameRef.current % 125 < 15) {
        dispatch(playAI(deltaTimeRef.current))
      }

      dispatch(moveBall(deltaTimeRef.current))
    }

    msPreviousFrameRef.current = Date.now()

    clearKeys()
  }

  useInterval(processFrame, MS_PER_FRAME)
}
