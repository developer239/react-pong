export const calculateDeltaTime = (msPreviousFrame: number) =>
  (Date.now() - msPreviousFrame) / 1000.0
