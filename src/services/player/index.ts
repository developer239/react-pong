import { PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/components/Player/data'
import { IVector } from 'src/context/game/store/types'
import { minMax } from 'src/services/math'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const updatePlayerPosition = (
  position: IVector,
  velocity: IVector,
  deltaTime: number,
  index: 'x' | 'y' = 'y'
) => ({
  ...position,
  [index]: minMax(
    position[index] + velocity[index] * deltaTime,
    0,
    index === 'x' ? WINDOW_WIDTH - PLAYER_WIDTH : WINDOW_HEIGHT - PLAYER_HEIGHT
  ),
})
