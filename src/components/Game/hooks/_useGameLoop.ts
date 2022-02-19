import { useContext } from 'react'
import { GameContext } from 'src/context/game/GameContext'
import { moveDown, moveUp } from 'src/context/game/store/actions'
import { useInterval } from 'src/hooks/useInterval'
import { useKeyPress } from 'src/hooks/useKeyPress'

export const useGameLoop = () => {
  const { dispatch } = useContext(GameContext)
  const { hasPressed, clearKeys } = useKeyPress()

  useInterval(() => {
    if (hasPressed('ArrowUp') || hasPressed('Up')) {
      dispatch(moveUp('player1'))
    }

    if (hasPressed('ArrowDown') || hasPressed('Down')) {
      dispatch(moveDown('player1'))
    }

    clearKeys()
  }, 16.6)
}
