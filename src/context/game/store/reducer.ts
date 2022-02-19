import { BALL_HEIGHT } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import { IState } from 'src/context/game/store/types'
import {
  denormalizeX,
  denormalizeXY,
  denormalizeY,
} from 'src/services/normalize'
import { getWindowHeight, getWindowWidth } from 'src/services/window'

export const defaultState = {
  ball: {
    ...denormalizeXY(getWindowWidth() / 2, getWindowHeight() / 2 - BALL_HEIGHT),
    deltaX: denormalizeX(3),
    deltaY: denormalizeY(3),
  },
  player1: denormalizeXY(100, getWindowHeight() / 2 - PLAYER_HEIGHT),
  player2: denormalizeXY(
    getWindowWidth() - 100,
    getWindowHeight() / 2 - PLAYER_HEIGHT
  ),
}

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'MOVE_UP': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          y: Math.min(
            Math.max(player.y - action.payload.deltaPx, 0),
            denormalizeY(getWindowHeight() - PLAYER_HEIGHT)
          ),
        },
      }
    }
    case 'MOVE_DOWN': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          y: Math.min(
            Math.max(player.y + action.payload.deltaPx, 0),
            denormalizeY(getWindowHeight()) - PLAYER_HEIGHT
          ),
        },
      }
    }
    case 'MOVE_BALL': {
      return {
        ...state,
        ball: {
          ...state.ball,
          x: state.ball.x + state.ball.deltaX * action.payload.deltaPx,
          y: state.ball.y + state.ball.deltaY * action.payload.deltaPx,
        },
      }
    }
    default:
      return state
  }
}
