/* eslint-disable max-params */
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/components/Player/data'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/context/game/store/data'
import { IVector } from 'src/context/game/store/types'
import { minMax } from 'src/services/math'

export const predictBallMovement = (
  x: number,
  y: number,
  vx: number,
  vy: number,
  h: number,
  b: number
) => {
  const m = vy / vx
  const c = -x * m + y
  const val = (((m * b + c) % (2 * h)) + 2 * h) % (2 * h)

  return Math.min(val, 2 * h - val)
}

// TODO: ‍🔧
export const movePlayerNearY = (
  targetY: number,
  currentPosition: IVector,
  newVelocity: IVector
) => {
  if (
    targetY > currentPosition.y + 80 &&
    targetY < currentPosition.y + PLAYER_HEIGHT - 80
  ) {
    newVelocity.y = 0
  } else {
    if (currentPosition.y < targetY) {
      newVelocity.y = 1000
    }

    if (currentPosition.y + PLAYER_HEIGHT / 2 > targetY) {
      newVelocity.y = -1000
    }
  }
}

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
