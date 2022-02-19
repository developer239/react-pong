import { useStyles } from 'src/components/Game/hooks/useStyles'

export const useSetup = () => {
  const { stageRef, width, height } = useStyles()

  return {
    stageRef,
    width,
    height,
  }
}
