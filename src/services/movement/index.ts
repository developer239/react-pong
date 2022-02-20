import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/components/Player/data'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/context/game/store/data'
import { IVector } from 'src/context/game/store/types'
import { minMax } from 'src/services/math'

export const moveBallToSafePosition = (
  ballPosition: IVector,
  ballVelocity: IVector,
  delta: number
) => ({
  y: minMax(
    ballPosition.y + ballVelocity.y * delta,
    0,
    WINDOW_HEIGHT - BALL_HEIGHT
  ),
  x: minMax(
    ballPosition.x + ballVelocity.x * delta,
    0,
    WINDOW_WIDTH - BALL_WIDTH
  ),
})

export const movePlayerToSafePosition = (
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

// !! this produces side effect
export const mutateVelocity = (
  index: 'x' | 'y',
  velocity: IVector // eslint-disable-next-line no-param-reassign
) => (velocity[index] = -velocity[index])
