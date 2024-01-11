import Head from 'next/head'
import { Game } from '../components/Game'

export default function Home() {
  return (
    <>
      <Head>
        <title>Memory Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game />
    </>
  )
}
