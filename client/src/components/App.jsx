import '../styles/App.css'
import waldo1 from "../assets/waldo1.jpeg"
import waldo2 from "../assets/waldo2.jpeg"
import waldo3 from  "../assets/waldo3.jpg"
import GameArticle from './gameArticle'
function App() {
  const games = []
  const game = {}
   return <main>
    <GameArticle game={game}/>
    <a href='vault-0'>
      <img src={waldo2} alt="Vault 0" />
      <div>
        <span>Vault 0</span>
        <span>Played by "N" Players </span>
        </div>
    </a>
        <a>
      <img src={waldo3} alt="Robot City" />
      <div>
        <span>Robot City</span>
        <span>Played by "N" Players </span>
        </div>
    </a>
   </main>
}

export default App
