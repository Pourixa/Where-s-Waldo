    import {useParams} from "react-router"
    import Header from "./header"
    import Footer from "./footer"
    import styles from "../styles/Game.module.css";
    import { TransformWrapper, TransformComponent,useControls } from "react-zoom-pan-pinch";
    import { VscLoadingCompact } from "react-icons/vsc";
    import { MdOutlineZoomIn,MdOutlineZoomOut} from "react-icons/md";
    import { TbZoomReset } from "react-icons/tb";
    import PlayerRecord from "./playerRecord";
    import { useEffect, useState } from "react";

function makeurl(path) {
  const API = import.meta.env.VITE_API
  return API + path
}


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
        const [game,setGame] = useState(null)
        const [loading,setLoading] = useState(true)
        const [founded ,setFounded] = useState([false,false,false,0])
        const [gameOver,setGameOver] = useState(false)
       async function isOnTarget(id,target,click) 
            {
                const res = await fetch(makeurl(`/game/${game.name}`),
                {
                        headers: {
        "Content-Type": "application/json"
    },
                    body:JSON.stringify({
                    name:target.name,
                    click:click,
                }),method:"post"})
                const js = await res.json();
                console.log(js)
                if (js.found)
                    setFounded(prev => {
                        const a = [...prev]
                        a[id] = true
                        a[3] += 1
                        return a
                    })
            setGameOver(founded[3] + 1 === 3)  
            }
        useEffect(() => {
            (async () => {
                const game = await (await fetch(makeurl("/game/"+params.id))).json()
                setGame(game)
                setLoading(false)
            })()
        },[params.id])
        function selectTarget(e) {
            const img = e.currentTarget;
            const rect = img.getBoundingClientRect();
            
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;


            setClick({x:x,y:y})

            setShow({x:e.pageX,y:e.pageY,show:true})

        }   
          if(loading)
  return (<main>
    <div className='loading'>
      <VscLoadingCompact/>
      <h1>LOADING ...</h1>
    </div>
  </main>) 
  if (gameOver)
    return <h1>
        Hi
    </h1>
        return <div onClick={() => {show.show ? setShow(prev => {setClick({x:0,y:0}); return {...prev , show:false}}): ""}}>
            <Header game={game} founded={founded}/>
            <div style={{left:show.x , top:show.y}} className={`${styles.selectTarget} ${show.show ? "" : styles.close}`} id="selectTargets">
                <div className={founded[0] ? styles.founded : ""}>
                    <img  src={game.targets[0].src} alt="target1" onClick={() => isOnTarget(0,game.targets[0],click)}/>   
                </div>
                <div className={founded[1] ? styles.founded : ""}>
                    <img src={game.targets[1].src} alt="target2" onClick={() => isOnTarget(1,game.targets[1],click)}/>    
                </div>
                <div className={founded[2] ? styles.founded : ""}>
                    <img src={game.targets[2].src} alt="target3" onClick={() => isOnTarget(2,game.targets [2],click)}/>  
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