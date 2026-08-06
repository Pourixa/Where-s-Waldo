import styles from '../styles/App.module.css'
import waldo1 from "../assets/robotCity.jpg"
import waldo2 from "../assets/spaceCon.jpeg"
import waldo3 from "../assets/vault0.jpeg"
import GameArticle from './gameArticle'
import { useEffect, useState } from 'react'

function makeurl(path) {
  const API = import.meta.env.VITE_API
  return API + path
}
function App() {
  const [games,setGames] = useState([])
  useEffect(() => {
     (async () => {
      const games = await ((await fetch( makeurl("/game")  , {cache:"force-cache"} )).json())
      console.log(games)
      setGames(games)
    })()
  },[])
   return <main className={styles.main}>
    {games.map((game) => {
      return <GameArticle game={game} key={game.name}/>
    })}
   </main>
}

export default App
