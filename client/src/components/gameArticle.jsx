import styles from '../styles/App.module.css'
export default function GameArticle({game}) {
    return     <a className={styles.a} href={game.name} >
          <img src={`${game.src}`} alt={game.name} />
          <div>
            <span>{game.name.replace("-"," ")}</span>
            <span>Played by {game.players.length} Players </span>
            </div>
        </a>
}