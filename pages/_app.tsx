import { globalCss } from '@stitches/react'
import type { AppProps } from 'next/app'

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, height: '100%' },
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  globalStyles()

  return <Component {...pageProps} />
}

export default MyApp
