import {useParams} from "react-router"
import Header from "./header"
import Footer from "./footer"

export default function Game() {
    const params = useParams()
    const game = {
            name:"Robot-City",
            t1:"",
            t2:"",
            t3:"",
            img:"",
        }
    return <>
        <Header game={game}/>
        <main>
            <div>
                <h4>LEADER BOARD</h4>
                <div>

                </div>
            </div>
            <img src="" alt="" />
            <div>
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