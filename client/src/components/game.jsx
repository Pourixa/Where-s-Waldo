    import {useNavigate, useParams} from "react-router"
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
        const [notif,setNotif] = useState(null)
        const [time, setTime] = useState(0);
        const [error,setError] = useState(null)
        const navig = useNavigate()
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
                if (js.found)
                    setFounded(prev => {
                        const a = [...prev]
                        a[id] = true
                        a[3] += 1
                        return a
                    })
            setNotif(js)
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
        return <main>
            <div  className={styles.gameOver}>
                <h1>You've found them all !</h1>
                    <h4>If you want your name on the leaderboard fill the form.</h4>
                    <input id="username" type="text" placeholder="username" minLength={2} />
                    {
                    error && <p id="error" style={{backgroundColor:error.color}}>
                            {error.message}
                        </p>
                        }
                    <div>
                        <button onClick={async () => {
                        const value = document.querySelector("#username").value
                        if(value.length < 2 ) {
                            return setError({message:"Minimum username length is 2",color:"red"})
                        } 
                        const res = await fetch(makeurl(`/game/${game.name}/player`),{headers:{
                            "Content-Type": "application/json"
                        },method:"post",body:JSON.stringify({
                            username:value,
                            record:time
                        })})
                        if(res.ok)
                        {
                            setError({message:"You've been added. Redirecting...",color:"green"})
                            setTimeout(() => navig("/") , 1500)
                        }
                        else
                        {
                            const js = await res.json()
                            setError({message:js.message,color:"red"})
                        }
                                        }}>ADD ME</button>
                                        <button onClick={() => navig("/")}>HOME</button>
                    </div>
            </div>
        </main>

        return <div onClick={() => {show.show ? setShow(prev => {setClick({x:0,y:0}); return {...prev , show:false}}): ""}}>
            <Header game={game} founded={founded} time={time} setTime={setTime}/>
            {notif && <article className={styles.notif} style={{backgroundColor:notif.found ? "green" : "red"}}>
                {notif.message}
            </article>}
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
                        {game.players.map((player,idx) => {
                            return  <PlayerRecord player={player } rank={idx} key={player.username}/>
                        })}                        
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