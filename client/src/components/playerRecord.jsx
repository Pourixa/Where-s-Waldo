import styles from "../styles/Game.module.css";

export default function PlayerRecord({player,rank}) {
    const date = new Date(player.timeRecorded)

    return <div className={styles.record}>
        <h4>{rank+1} - {player.username}</h4>
        <div>
            <p>Record : {parseInt(player.record / 3600)
            .toString()
            .padStart(2, "0")}{" "}
          :{" "}
          {parseInt(player.record / 60)
            .toString()
            .padStart(2, "0")}{" "}
          : {(player.record % 60).toString().padStart(2, "0")}</p>
            <p>{date.toLocaleDateString("en-GB")}</p>
        </div>
    </div>
}