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
import { useState } from "react";

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
    const [show,setShow] = useState({show:false,x:0,y:0})
    const game = {
            name:"Robot-City",
            t1:ebisu,
            t2:ebisu,
            t3:ebisu,
            src:waldo,
        }
    function selectTarget(e) {
        const x = e.pageX
        const y = e.pageY
        setShow({x:x,y:y,show:true})

    }    
    return <div onClick={() => {show.show ? setShow(prev => {return {...prev , show:false}}): ""}}>
        <Header game={game}/>
        <div style={{left:show.x , top:show.y}} className={`${styles.selectTarget} ${show.show ? "" : styles.close}`} id="selectTargets">
            <div>
                <img data-id={1} src={game.t1} alt="target1" />    
            </div>
            <div>
                <img data-id={2} src={game.t2} alt="target2" />        
            </div>
            <div>
                <img data-id={3} src={game.t3} alt="target3" />    
            </div>
        </div>
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
            <TransformWrapper doubleClick={{disabled:true}}>
                <Toolbar/>
                <TransformComponent>
                    <img className={styles.gameImg} id="gameImg" src={game.src} alt={game.name} onDoubleClick={(e) => selectTarget(e)} />
                </TransformComponent>
            </TransformWrapper>
        </main>
        <Footer/>
    </div>
}