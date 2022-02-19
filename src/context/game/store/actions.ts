export const moveUp = (player: 'player1' | 'player2') => ({
  type: 'MOVE_UP' as const,
  payload: { player },
})

export const moveDown = (player: 'player1' | 'player2') => ({
  type: 'MOVE_DOWN' as const,
  payload: { player },
})

export type IAction = ReturnType<typeof moveUp | typeof moveDown>
