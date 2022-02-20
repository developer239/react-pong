/* eslint-disable complexity */
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import { IState } from 'src/context/game/store/types'
import { checkBallPlayerCollision } from 'src/services/collision'
import { minMax } from 'src/services/math'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const defaultState = {
  ball: {
    x: WINDOW_WIDTH / 2,
    y: WINDOW_HEIGHT / 2 - BALL_HEIGHT,
    velocityX: 200,
    velocityY: 200,
  },
  player1: {
    x: 100,
    y: WINDOW_HEIGHT / 2 - PLAYER_HEIGHT,
  },
  player2: {
    x: WINDOW_WIDTH - 100,
    y: WINDOW_HEIGHT / 2 - PLAYER_HEIGHT,
  },
}

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    // TODO: set velocityX and velocityY instead of speed
    case 'MOVE_UP': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          y: minMax(
            player.y - action.payload.deltaPx,
            0,
            WINDOW_HEIGHT - PLAYER_HEIGHT
          ),
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
          y: minMax(
            player.y + action.payload.deltaPx,
            0,
            WINDOW_HEIGHT - PLAYER_HEIGHT
          ),
        },
      }
    }
    // TODO: prevent ball from going inside paddle
    case 'MOVE_BALL': {
      const newY = minMax(
        state.ball.y + state.ball.velocityY * action.payload.delta,
        0,
        WINDOW_HEIGHT - BALL_HEIGHT
      )
      const newX = minMax(
        state.ball.x + state.ball.velocityX * action.payload.delta,
        0,
        WINDOW_WIDTH - BALL_WIDTH
      )

      const isTopOrBottom = newY <= 0 || newY >= WINDOW_HEIGHT - BALL_HEIGHT

      const newVelocityY = isTopOrBottom
        ? -state.ball.velocityY
        : state.ball.velocityY

      const isLeftOrRightScreen = newX <= 0 || newX >= WINDOW_WIDTH - BALL_WIDTH

      const hasPlayer1Collided = checkBallPlayerCollision(
        newX,
        newY,
        state.player1.x,
        state.player1.y
      )
      const hasPlayer2Collided = checkBallPlayerCollision(
        newX,
        newY,
        state.player2.x,
        state.player2.y
      )

      const newVelocityX =
        isLeftOrRightScreen || hasPlayer1Collided || hasPlayer2Collided
          ? -state.ball.velocityX
          : state.ball.velocityX

      return {
        ...state,
        ball: {
          ...state.ball,
          x: newX,
          y: newY,
          velocityX: newVelocityX,
          velocityY: newVelocityY,
        },
      }
    }
    default:
      return state
  }
}
