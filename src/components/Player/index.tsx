import { FC, memo } from 'react'
import { Rect } from 'react-konva'
import { PLAYER_HEIGHT, PLAYER_WIDTH } from 'src/components/Player/data'
import { IProps } from 'src/components/Player/types'

export const Player: FC<IProps> = memo(
  ({ x, y }) => (
    <Rect
      x={x}
      y={y}
      width={PLAYER_WIDTH}
      height={PLAYER_HEIGHT}
      fill="white"
    />
  ),
  (prevProps, nextProps) =>
    prevProps.x === nextProps.x && prevProps.y === nextProps.y
)
