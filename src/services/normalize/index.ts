export const DEFAULT_WIDTH = 800
export const DEFAULT_HEIGHT = 600

export const normalizeX = (x: number) => x * (window.innerWidth / DEFAULT_WIDTH)

export const denormalizeX = (x: number) =>
  x * (DEFAULT_WIDTH / window.innerWidth)

export const normalizeY = (y: number) =>
  y * (window.innerHeight / DEFAULT_HEIGHT)

export const denormalizeY = (y: number) =>
  y * (DEFAULT_HEIGHT / window.innerHeight)

export const normalizeXY = (x: number, y: number) => ({
  x: normalizeX(x),
  y: normalizeY(y),
})

export const denormalizeXY = (x: number, y: number) => ({
  x: denormalizeX(x),
  y: denormalizeY(y),
})
