/* eslint-disable complexity */
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { IAction } from 'src/context/game/store/actions'
import { IPlayer, IState } from 'src/context/game/store/types'
import { calculateNewBallPosition } from 'src/services/ball'
import { checkBallPlayerCollision } from 'src/services/collision'
import { mutateVelocity } from 'src/services/math'
import { updatePlayerPosition } from 'src/services/player'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'MOVE_DOWN':
    case 'MOVE_UP': {
      const player: IPlayer = {
        ...state[action.payload.player],
      }

      // Update player velocity

      if (action.type === 'MOVE_DOWN') {
        player.velocity.y = 2000
      }

      if (action.type === 'MOVE_UP') {
        player.velocity.y = -2000
      }

      // Update player position

      const newPosition = updatePlayerPosition(
        player.position,
        player.velocity,
        action.payload.deltaTime
      )

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          position: newPosition,
        },
      }
    }
    // TODO: prevent ball from going inside paddle
    case 'MOVE_BALL': {
      // Update ball position

      const newPosition = calculateNewBallPosition(
        state.ball.position,
        state.ball.velocity,
        action.payload.deltaTime
      )
      const newVelocity = {
        ...state.ball.velocity,
      }

      // Check screen LEFT / RIGHT collision

      const isTopOrBottomScreenCollision =
        newPosition.y <= 0 || newPosition.y >= WINDOW_HEIGHT - BALL_HEIGHT

      if (isTopOrBottomScreenCollision) {
        mutateVelocity('y', newVelocity)
      }

      // Check screen TOP / BOTTOM collision && player collision

      const isLeftOrRightScreenCollision =
        newPosition.x <= 0 || newPosition.x >= WINDOW_WIDTH - BALL_WIDTH

      const hasPlayer1Collided = checkBallPlayerCollision(
        newPosition,
        state.player1.position
      )
      const hasPlayer2Collided = checkBallPlayerCollision(
        newPosition,
        state.player2.position
      )

      if (
        isLeftOrRightScreenCollision ||
        hasPlayer1Collided ||
        hasPlayer2Collided
      ) {
        mutateVelocity('x', newVelocity)
      }

      return {
        ...state,
        ball: {
          ...state.ball,
          position: newPosition,
          velocity: newVelocity,
        },
      }
    }
    default:
      return state
  }
}
