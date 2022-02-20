export interface IVector {
  x: number
  y: number
}

export interface IState {
  ball: {
    position: IVector
    velocity: IVector
  }
  player1: {
    position: IVector
  }
  player2: {
    position: IVector
  }
}
