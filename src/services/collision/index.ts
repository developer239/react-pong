/* eslint-disable max-params */

import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/components/Player/data'
import { IVector } from 'src/context/game/store/types'

export const checkAABBCollision = (
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
) => x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && h1 + y1 > y2

export const checkBallPlayerCollision = (
  ballPosition: IVector,
  playerPosition: IVector
) =>
  checkAABBCollision(
    ballPosition.x,
    ballPosition.y,
    BALL_WIDTH,
    BALL_HEIGHT,
    playerPosition.x,
    playerPosition.y,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  )
