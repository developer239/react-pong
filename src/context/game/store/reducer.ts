/* eslint-disable complexity,max-lines-per-function */
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_WIDTH } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import {
  defaultState,
  WINDOW_CENTER,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'src/context/game/store/data'
import { IPlayer, IState } from 'src/context/game/store/types'
import { checkBallPlayerCollision } from 'src/services/collision'
import {
  moveAICloseToTargetY,
  moveBallToSafePosition,
  movePlayerToSafePosition,
  mutateVelocity,
  predictBallMovement,
} from 'src/services/movement'

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'PLAY_AI': {
      const player: IPlayer = {
        ...state.player2,
      }

      const newPosition = movePlayerToSafePosition(
        player.position,
        player.velocity,
        action.payload.deltaTime
      )
      const newVelocity = {
        ...player.velocity,
      }

      const predictionY = predictBallMovement(
        state.ball.position.x,
        state.ball.position.y,
        state.ball.velocity.x,
        state.ball.velocity.y,
        WINDOW_HEIGHT,
        WINDOW_WIDTH
      )

      if (state.ball.velocity.x < 0) {
        moveAICloseToTargetY(WINDOW_CENTER, newPosition, newVelocity)
      } else {
        moveAICloseToTargetY(
          predictionY + BALL_HEIGHT / 2,
          newPosition,
          newVelocity
        )
      }

      return {
        ...state,
        player2: {
          ...player,
          position: newPosition,
          velocity: newVelocity,
        },
      }
    }
    case 'MOVE_DOWN':
    case 'MOVE_UP': {
      const player: IPlayer = {
        ...state[action.payload.player],
      }

      // Update player velocity

      if (action.type === 'MOVE_DOWN') {
        player.velocity.y = Math.abs(player.velocity.y)
      }

      if (action.type === 'MOVE_UP') {
        player.velocity.y = Math.abs(player.velocity.y) * -1
      }

      // Update player position

      const newPosition = movePlayerToSafePosition(
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

      const newBallPosition = moveBallToSafePosition(
        state.ball.position,
        state.ball.velocity,
        action.payload.deltaTime
      )
      const newBallVelocity = {
        ...state.ball.velocity,
      }
      const newGameScore = {
        ...state.score,
      }

      // Check screen TOP / BOTTOM collision

      const isTopOrBottomScreenCollision =
        newBallPosition.y <= 0 ||
        newBallPosition.y >= WINDOW_HEIGHT - BALL_HEIGHT

      if (isTopOrBottomScreenCollision) {
        mutateVelocity('y', newBallVelocity)
      }

      // Check ball player collision

      const hasPlayer1Collided = checkBallPlayerCollision(
        newBallPosition,
        state.player1.position
      )
      const hasPlayer2Collided = checkBallPlayerCollision(
        newBallPosition,
        state.player2.position
      )

      if (hasPlayer1Collided || hasPlayer2Collided) {
        mutateVelocity('x', newBallVelocity)

        // glitching quick fix START
        if (hasPlayer1Collided) {
          newBallPosition.x = state.player1.position.x + PLAYER_WIDTH
        }

        if (hasPlayer2Collided) {
          newBallPosition.x = state.player2.position.x - BALL_WIDTH
        }
        // glitching quick fix END
      }

      // Check score conditions

      const isLeftScreenSideCollision = newBallPosition.x <= 0
      if (isLeftScreenSideCollision) {
        newGameScore.player2 += 1
      }

      const isRightScreenSideCollision =
        newBallPosition.x >= WINDOW_WIDTH - BALL_WIDTH
      if (isRightScreenSideCollision) {
        newGameScore.player1 += 1
      }

      if (isLeftScreenSideCollision || isRightScreenSideCollision) {
        newBallPosition.y = Math.random() * (WINDOW_HEIGHT - BALL_HEIGHT)

        newBallPosition.x = defaultState.ball.position.x

        newBallVelocity.x = -1 * Math.abs(defaultState.ball.velocity.x)
        newBallVelocity.y = defaultState.ball.velocity.y
      } else {
        newBallVelocity.x += newBallVelocity.x > 0 ? 0.1 : -0.1
        newBallVelocity.y += newBallVelocity.y > 0 ? 0.1 : -0.1
      }

      return {
        ...state,
        score: newGameScore,
        ball: {
          ...state.ball,
          position: newBallPosition,
          velocity: newBallVelocity,
        },
      }
    }
    default:
      return state
  }
}
