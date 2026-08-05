import {useParams} from "react-router"
import Header from "./header"
import Footer from "./footer"
import styles from "../styles/Game.module.css";
import { TransformWrapper, TransformComponent,useControls } from "react-zoom-pan-pinch";
import waldo from "../assets/waldo3.jpg"
import { MdOutlineZoomIn,MdOutlineZoomOut} from "react-icons/md";
import { TbZoomReset } from "react-icons/tb";

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
            t1:null,
            t2:null,
            t3:null,
            src:waldo,
        }
    return <>
        <Header game={game}/>
        <main className={styles.main}>
            <div className={styles.leaderboard} id="leaderboard">
                <h4>LEADER BOARD</h4>
                <div>
                </div>
            </div>
            <TransformWrapper>
                <Toolbar/>
                <TransformComponent >
                    <img className={styles.gameImg} id="gameImg" src={game.src} alt={game.name} />
                </TransformComponent>
            </TransformWrapper>
            <div className={styles.targets} id="targets">
            <div>
                <img src={game.t1} alt="target1" />
                <span>FOUND</span>    
            </div>
            <div>
                <img src={game.t2} alt="target2" />
                <span>FOUND</span>        
            </div>
            <div>
                <img src={game.t3} alt="target3" />
                <span>FOUND</span>    
            </div>
        </div>
        </main>
        <Footer/>
    </>
}