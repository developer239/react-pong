import { FC } from 'react'
import { Rect } from 'react-konva'
import { PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/components/Player/data'
import { IProps } from 'src/components/Player/types'
import { normalizeX, normalizeY } from 'src/services/normalize'

export const Player: FC<IProps> = ({ x, y }) => (
  <Rect
    x={normalizeX(x)}
    y={normalizeY(y)}
    width={normalizeX(PLAYER_WIDTH)}
    height={normalizeY(PLAYER_HEIGHT)}
    fill="white"
  />
)
