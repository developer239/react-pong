import { FC } from 'react'
import { Rect } from 'react-konva'
import { IProps } from 'src/components/Ball/types'

export const Ball: FC<IProps> = ({ x, y }) => (
  <Rect x={x} y={y} width={20} height={20} fill="white" />
)
