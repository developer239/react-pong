import { FC } from 'react'
import { Rect } from 'react-konva'
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { IProps } from 'src/components/Ball/types'
import { normalizeX, normalizeY } from 'src/services/normalize'

export const Ball: FC<IProps> = ({ x, y }) => (
  <Rect
    x={normalizeX(x)}
    y={normalizeY(y)}
    width={normalizeX(BALL_WIDTH)}
    height={normalizeY(BALL_HEIGHT)}
    fill="white"
  />
)
