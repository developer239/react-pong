export const DEFAULT_WIDTH = 800
export const DEFAULT_HEIGHT = 600

export const normalizeX = (x: number) => x * (window.innerWidth / DEFAULT_WIDTH)

export const normalizeY = (y: number) =>
  y * (window.innerHeight / DEFAULT_HEIGHT)

export const normalizeXY = (x: number, y: number) => ({
  x: normalizeX(x),
  y: normalizeY(y),
})
