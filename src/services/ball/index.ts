import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { IVector } from 'src/context/game/store/types'
import { minMax } from 'src/services/math'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const calculateNewBallPosition = (
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
