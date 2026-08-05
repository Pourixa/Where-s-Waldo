import styles from "../styles/Game.module.css";

export default function PlayerRecord({player,rank}) {
    return <div className={styles.record}>
        <h4>{rank} - {player.username}</h4>
        <div>
            <p>{player.record}</p>
            <p>{player.date}</p>
        </div>
    </div>
}