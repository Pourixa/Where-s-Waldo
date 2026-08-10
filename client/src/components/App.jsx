import styles from '../styles/App.module.css'
import GameArticle from './gameArticle'
import { VscLoadingCompact } from "react-icons/vsc";
import { useEffect, useState } from 'react'

function makeurl(path) {
  const API = import.meta.env.VITE_API
  return API + path
}
function App() {
  const [games,setGames] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
     (async () => {
      const games = await ((await fetch( makeurl("/game") )).json())
      setGames(games)
      setLoading(false)
    })()
  },[])
  if(loading)
  return (<main>
    <div className='loading'>
      <VscLoadingCompact/>
      <h1>LOADING ...</h1>
    </div>
  </main>)
  return  <main className={styles.main}>
    {games.map((game) => {
      return <GameArticle game={game} key={game.name}/>
    })}
   </main>

}

export default App
