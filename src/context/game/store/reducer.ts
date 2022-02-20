/* eslint-disable complexity */
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import { IState } from 'src/context/game/store/types'
import { calculateNewBallPosition } from 'src/services/ball'
import { checkBallPlayerCollision } from 'src/services/collision'
import { minMax, mutateVelocity } from 'src/services/math'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const defaultState = {
  ball: {
    position: {
      x: WINDOW_WIDTH / 2,
      y: WINDOW_HEIGHT / 2 - BALL_HEIGHT,
    },
    velocity: {
      x: 200,
      y: 200,
    },
  },
  player1: {
    position: {
      x: 100,
      y: WINDOW_HEIGHT / 2 - PLAYER_HEIGHT,
    },
  },
  player2: {
    position: {
      x: WINDOW_WIDTH - 100,
      y: WINDOW_HEIGHT / 2 - PLAYER_HEIGHT,
    },
  },
}

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    // TODO: set velocityX and velocityY instead of speed
    case 'MOVE_UP': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          position: {
            ...player.position,
            y: minMax(
              player.position.y - action.payload.deltaPx,
              0,
              WINDOW_HEIGHT - PLAYER_HEIGHT
            ),
          },
        },
      }
    }
    // TODO: set velocityX and velocityY instead of speed
    case 'MOVE_DOWN': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          position: {
            ...player.position,
            y: minMax(
              player.position.y + action.payload.deltaPx,
              0,
              WINDOW_HEIGHT - PLAYER_HEIGHT
            ),
          },
        },
      }
    }
    // TODO: prevent ball from going inside paddle
    case 'MOVE_BALL': {
      // Update ball position

      const newPosition = calculateNewBallPosition(
        state.ball.position,
        state.ball.velocity,
        action.payload.delta
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
