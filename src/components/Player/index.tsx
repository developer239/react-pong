import { FC } from 'react'
import { Rect } from 'react-konva'
import { IProps } from 'src/components/Player/types'

export const Player: FC<IProps> = ({ x, y }) => (
  <Rect x={x} y={y} width={20} height={100} fill="white" />
)
