    import {useParams} from "react-router"
    import Header from "./header"
    import Footer from "./footer"
    import styles from "../styles/Game.module.css";
    import { TransformWrapper, TransformComponent,useControls } from "react-zoom-pan-pinch";
    import waldo from "../assets/spaceCon.jpeg"
    import ebisu from "../assets/spaceCon/t1.png"
    import mer from "../assets/spaceCon/t3.png"
    import egg from "../assets/spaceCon/t2.png"
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
        const [click,setClick] = useState({x:0,y:0})
        const game = {
                name:"Robot-City",
                t1:ebisu,
                t2:egg,
                t3:mer,
                src:waldo,
            }
        function selectTarget(e) {
            const img = e.currentTarget;
            const rect = img.getBoundingClientRect();
            
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            setClick({x:x,y:y})

            setShow({x:e.clientX,y:e.clientY,show:true})

        }    
        return <div onClick={() => {show.show ? setShow(prev => {setClick({x:0,y:0}); return {...prev , show:false}}): ""}}>
            <Header game={game}/>
            <div style={{left:show.x , top:show.y}} className={`${styles.selectTarget} ${show.show ? "" : styles.close}`} id="selectTargets">
                <div>
                    <img data-id={1} src={game.t1} alt="target1" />   
                    <p>{game.t1.name}</p> 
                </div>
                <div>
                    <img data-id={2} src={game.t2} alt="target2" />    
                    <p>{game.t1.name}</p>     
                </div>
                <div>
                    <img data-id={3} src={game.t3} alt="target3" />  
                    <p>{game.t1.name}</p>  
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