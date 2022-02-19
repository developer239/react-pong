import dynamic from 'next/dynamic'
import { Layout } from 'src/components/Layout'

// Konva doesn't work on server
const Game = dynamic(() => import('src/components/Game'), {
  ssr: false,
})

export const Home = () => (
  <Layout>
    <Game />
  </Layout>
)
