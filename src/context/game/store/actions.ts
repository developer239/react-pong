export const moveUp = (player: 'player1' | 'player2', deltaPx: number) => ({
  type: 'MOVE_UP' as const,
  payload: { player, deltaPx },
})

export const moveDown = (player: 'player1' | 'player2', deltaPx: number) => ({
  type: 'MOVE_DOWN' as const,
  payload: { player, deltaPx },
})

export const moveBall = (delta: number) => ({
  type: 'MOVE_BALL' as const,
  payload: { delta },
})

export type IAction = ReturnType<
  typeof moveUp | typeof moveDown | typeof moveBall
>
