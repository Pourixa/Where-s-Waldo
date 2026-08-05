import styles from '../styles/App.module.css'
export default function GameArticle({game}) {
    return     <a className={styles.a} href={game.name} >
          <img src={game.src} alt={game.name} />
          <div>
            <span>{game.name}</span>
            <span>Played by {game.players} Players </span>
            </div>
        </a>
}