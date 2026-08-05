import {useParams} from "react-router"
import Header from "./header"
import Footer from "./footer"
import styles from "../styles/Game.module.css";
import { TransformWrapper, TransformComponent,useControls } from "react-zoom-pan-pinch";
import waldo from "../assets/waldo3.jpg"
import ebisu from "../assets/t1.png"
import { MdOutlineZoomIn,MdOutlineZoomOut} from "react-icons/md";
import { TbZoomReset } from "react-icons/tb";
import PlayerRecord from "./playerRecord";

    function Toolbar() {
        const { zoomIn, zoomOut, resetTransform } = useControls();

        return (
            <div className={styles.toolbar} id="toolbar">
            <div>
                <MdOutlineZoomIn onClick={() => zoomIn()} />
                <MdOutlineZoomOut onClick={() => zoomOut()} />
                <TbZoomReset onClick={() => resetTransform()} />
            </div>
            </div>
        );}

export default function Game() {
    const params = useParams()
    const game = {
            name:"Robot-City",
            t1:ebisu,
            t2:ebisu,
            t3:ebisu,
            src:waldo,
        }
    return <>
        <Header game={game}/>
        <main className={styles.main}>
            <dialog className={styles.leaderboard} id="leaderboard" close="true">
                <h4>LEADERBOARD</h4>
                <div>
                    <PlayerRecord player={{username:"ee",record:32443,date:"34/23/ee"}}rank={1}/>
                    <PlayerRecord player={{username:"ee",record:32443,date:"34/23/ee"}}/>
                    <PlayerRecord player={{username:"ee",record:32443,date:"34/23/ee"}}/>
                    <PlayerRecord player={{username:"ee",record:32443,date:"34/23/ee"}}/>
                    <PlayerRecord player={{username:"ee",record:32443,date:"34/23/ee"}}/>
                    <PlayerRecord player={{username:"ee",record:32443,date:"34/23/ee"}}/>
                </div>
                <button className="btn" commandfor="leaderboard" command="close">CLOSE</button>
            </dialog>
            <TransformWrapper>
                <Toolbar/>
                <TransformComponent >
                    <img className={styles.gameImg} id="gameImg" src={game.src} alt={game.name} />
                </TransformComponent>
            </TransformWrapper>
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
        </main>
        <Footer/>
    </>
}