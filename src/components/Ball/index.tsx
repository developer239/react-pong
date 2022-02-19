import { FC } from 'react'
import { Rect } from 'react-konva'
import { IProps } from 'src/components/Ball/types'
import { normalizeX, normalizeY } from 'src/services/normalize'

export const Ball: FC<IProps> = ({ x, y }) => (
  <Rect
    x={normalizeX(x)}
    y={normalizeY(y)}
    width={normalizeX(20)}
    height={normalizeY(20)}
    fill="white"
  />
)
