import { FC } from 'react'
import { Rect } from 'react-konva'
import { IProps } from 'src/components/Player/types'
import { normalizeX, normalizeY } from 'src/services/normalize'

export const Player: FC<IProps> = ({ x, y }) => (
  <Rect
    x={normalizeX(x)}
    y={normalizeY(y)}
    width={normalizeX(20)}
    height={normalizeY(100)}
    fill="white"
  />
)
