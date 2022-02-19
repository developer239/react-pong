import { BALL_HEIGHT } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import { IState } from 'src/context/game/store/types'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'src/services/window'

export const defaultState = {
  ball: {
    x: WINDOW_WIDTH / 2,
    y: WINDOW_HEIGHT / 2 - BALL_HEIGHT,
    deltaX: 2,
    deltaY: 2,
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
    case 'MOVE_UP': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          y: Math.min(
            Math.max(player.y - action.payload.deltaPx, 0),
            WINDOW_HEIGHT - PLAYER_HEIGHT
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
            WINDOW_HEIGHT - PLAYER_HEIGHT
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
