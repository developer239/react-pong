import { FC, memo } from 'react'
import { Text } from 'react-konva'
import { IProps } from 'src/components/ScoreBoard/types'
import { WINDOW_WIDTH } from 'src/services/window'

export const ScoreBoard: FC<IProps> = memo(
  ({ player1Score, player2Score }) => (
    <Text
      text={`${player1Score} : ${player2Score}`}
      fill="white"
      align="center"
      y={50}
      width={WINDOW_WIDTH}
      fontSize={100}
      opacity={0.3}
    />
  ),
  (prevProps, nextProps) =>
    prevProps.player1Score === nextProps.player1Score &&
    prevProps.player2Score === nextProps.player2Score
)
