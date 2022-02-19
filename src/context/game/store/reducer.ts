import { BALL_HEIGHT } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IAction } from 'src/context/game/store/actions'
import { IState } from 'src/context/game/store/types'
import { denormalizeXY } from 'src/services/normalize'
import { getWindowHeight, getWindowWidth } from 'src/services/window'

export const defaultState = {
  ball: denormalizeXY(
    getWindowWidth() / 2,
    getWindowHeight() / 2 - BALL_HEIGHT
  ),
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
          y: player.y - action.payload.deltaPx,
        },
      }
    }
    case 'MOVE_DOWN': {
      const player = state[action.payload.player]

      return {
        ...state,
        [action.payload.player]: {
          ...player,
          y: player.y + action.payload.deltaPx,
        },
      }
    }
    default:
      return state
  }
}
