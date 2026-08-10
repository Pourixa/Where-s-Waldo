import { useEffect, useState } from "react";
import styles from "../styles/Game.module.css";

export default function Header({ game , founded,time,setTime }) {
  useEffect(() => {
    const inter = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(inter);
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.targets} id="targets">
        <div className={founded[0] ? styles.founded : ""}>
          <img  src={game.targets[0].src} alt="target1" />
          <p>{game.targets[0].name}</p>
        </div>
        <div className={founded[1] ? styles.founded : ""}>
          <img  src={game.targets[1].src} alt="target2" />
          <p>{game.targets[1].name}</p>
        </div>
        <div className={founded[2] ? styles.founded : ""}>
          <img src={game.targets[2].src} alt="target3" />
          <p>{game.targets[2].name}</p>
        </div>
      </div>
      <div>
        <a className="btn" href="/">
          RETURN TO MENU
        </a>
        <h1>{game.name.replace("-"," ")}</h1>
      </div>
      <div>
        <span>
          {parseInt(time / 3600)
            .toString()
            .padStart(2, "0")}{" "}
          :{" "}
          {parseInt(time / 60)
            .toString()
            .padStart(2, "0")}{" "}
          : {(time % 60).toString().padStart(2, "0")}
        </span>
        <button className="btn" command="show-modal" commandfor="leaderboard">
          LEADERBOARD
        </button>
      </div>
      <div>
        <h4>TIP:</h4>
        <p>
          DOUBLE CLICK ON THE POSITION <br /> YOU WANT TO SELECT A TARGET
        </p>
      </div>
    </header>
  );
}
