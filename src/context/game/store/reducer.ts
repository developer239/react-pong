/* eslint-disable complexity,max-lines-per-function */
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import { defaultState } from 'src/context/game/store/data'
import { IPlayer, IState } from 'src/context/game/store/types'
import { calculateNewBallPosition } from 'src/services/ball'
import { checkBallPlayerCollision } from 'src/services/collision'
import { mutateVelocity } from 'src/services/math'
import { updatePlayerPosition } from 'src/services/player'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'PLAY_AI': {
      const player: IPlayer = state.player2

      const newPosition = updatePlayerPosition(
        player.position,
        player.velocity,
        action.payload.deltaTime
      )
      const newVelocity = {
        ...player.velocity,
      }

      if (
        newPosition.y <= 0 ||
        newPosition.y + PLAYER_HEIGHT >= WINDOW_HEIGHT
      ) {
        newVelocity.y *= -1
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

      const newBallPosition = calculateNewBallPosition(
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

      // Check screen player collision

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
      }

      // Check score conditions

      const isLeftScreenSideCollision = newBallPosition.x <= 0
      if (isLeftScreenSideCollision) {
        newGameScore.player2 += 1

        newBallPosition.x = defaultState.ball.position.x
        newBallVelocity.x *= -1
      }

      const isRightScreenSideCollision =
        newBallPosition.x >= WINDOW_WIDTH - BALL_WIDTH
      if (isRightScreenSideCollision) {
        newGameScore.player1 += 1

        newBallPosition.x = defaultState.ball.position.x
        newBallVelocity.x *= -1
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
