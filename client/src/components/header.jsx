import { useEffect, useState } from "react"
import styles from "../styles/Game.module.css";

export default function Header({game}) {
    const [time,setTime] = useState(0)
    useEffect(() => {
        const inter = setInterval(() => {
            setTime(prev => prev + 1)
        },1000)
        return () => clearInterval(inter)
    },[])
    return <header className={styles.header}>
        <div>
            <a  className="btn" href="/">RETURN TO MENU</a>
            <h1>{game.name.replace("-"," ")}</h1>
        </div>
        <div>
            <span>
                {parseInt(time/3600).toString().padStart(2,"0")} : {parseInt(time/60).toString().padStart(2,"0")} : {(time%60).toString().padStart(2,"0")}
            </span>
            <button className="btn">
                LEADERBOARD
            </button>
        </div>
    </header>
}