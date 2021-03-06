import { BALL_HEIGHT } from 'src/components/Ball/data'
import { PLAYER_HEIGHT } from 'src/components/Player/data'
import { IState } from 'src/context/game/store/types'

export const FPS = 60
export const MS_PER_FRAME = 1000 / FPS

export const WINDOW_WIDTH = window.innerWidth
export const WINDOW_HEIGHT = window.innerHeight
export const WINDOW_CENTER = WINDOW_HEIGHT / 2

export const defaultState: IState = {
  score: {
    player1: 0,
    player2: 0,
  },
  ball: {
    position: {
      x: WINDOW_WIDTH / 2,
      y: WINDOW_HEIGHT / 2 - BALL_HEIGHT / 2,
    },
    velocity: {
      x: -600,
      y: 600,
    },
  },
  player1: {
    position: {
      x: 100,
      y: WINDOW_HEIGHT / 2 - PLAYER_HEIGHT / 2,
    },
    velocity: {
      x: 0,
      y: 4000,
    },
  },
  player2: {
    position: {
      x: WINDOW_WIDTH - 100,
      y: WINDOW_HEIGHT / 2 - PLAYER_HEIGHT / 2,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  },
}
