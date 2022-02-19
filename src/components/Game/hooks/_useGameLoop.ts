import { useInterval } from 'src/hooks/useInterval'

export const useGameLoop = () => {
  useInterval(() => {
    // eslint-disable-next-line
    console.log('tick')
  }, 1000)
}
