import { FC, memo } from 'react'
import { Rect } from 'react-konva'
import { BALL_HEIGHT, BALL_WIDTH } from 'src/components/Ball/data'
import { IProps } from 'src/components/Ball/types'

export const Ball: FC<IProps> = memo(
  ({ x, y }) => (
    <Rect x={x} y={y} width={BALL_WIDTH} height={BALL_HEIGHT} fill="white" />
  ),
  (prevProps, nextProps) =>
    prevProps.x === nextProps.x && prevProps.y === nextProps.y
)
