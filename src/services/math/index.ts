import { IVector } from 'src/context/game/store/types'

export const minMax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const mutateVelocity = (index: 'x' | 'y', velocity: IVector) => {
  // !! this produces side effect

  // eslint-disable-next-line no-param-reassign
  velocity[index] = -velocity[index]
}
