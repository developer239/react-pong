import { THumanPlayer } from 'src/context/game/store/types'

export const moveUp = (player: THumanPlayer, deltaTime: number) => ({
  type: 'MOVE_UP' as const,
  payload: { player, deltaTime },
})

export const moveDown = (player: THumanPlayer, deltaTime: number) => ({
  type: 'MOVE_DOWN' as const,
  payload: { player, deltaTime },
})

export const moveBall = (deltaTime: number) => ({
  type: 'MOVE_BALL' as const,
  payload: { deltaTime },
})

export type IAction = ReturnType<
  typeof moveUp | typeof moveDown | typeof moveBall
>
