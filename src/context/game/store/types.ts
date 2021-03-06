export type THumanPlayer = 'player1' | 'player2'

export interface IVector {
  x: number
  y: number
}

export interface IBall {
  position: IVector
  velocity: IVector
}

export interface IPlayer {
  position: IVector
  velocity: IVector
}

export interface IState {
  score: {
    player1: number
    player2: number
  }
  ball: IBall
  player1: IPlayer
  player2: IPlayer
}
