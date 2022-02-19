import { globalCss } from '@stitches/react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const GameContextProvider = dynamic(
  () => import('src/context/game/GameContextProvider'),
  {
    ssr: false,
  }
)

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, height: '100%' },
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  globalStyles()

  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  )
}

export default MyApp
