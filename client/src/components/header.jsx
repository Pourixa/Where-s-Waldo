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
        <div className={styles.targets} id="targets">
            <div>
                <img src={game.t1} alt="target1" />    
            </div>
            <div>
                <img src={game.t2} alt="target2" />        
            </div>
            <div>
                <img src={game.t3} alt="target3" />    
            </div>
        </div>
        <div>
            <a  className="btn" href="/">RETURN TO MENU</a>
            <h1>{game.name.replace("-"," ")}</h1>
        </div>
        <div>
            <span>
                {parseInt(time/3600).toString().padStart(2,"0")} : {parseInt(time/60).toString().padStart(2,"0")} : {(time%60).toString().padStart(2,"0")}
            </span>
            <button className="btn" command="show-modal" commandfor= "leaderboard">
                LEADERBOARD
            </button>
        </div>
        <div>
            <h4>TIP:</h4>
            <p>DOUBLE CLICK ON THE POSITION <br /> YOU WANT TO SELECT A TARGET</p>
        </div>
    </header>
}