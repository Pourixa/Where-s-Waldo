import { useEffect, useState } from "react"

export default function Header({game}) {
    const [time,setTime] = useState(0)
    useEffect(() => {
        const inter = setInterval(() => {
            setTime(time + 1)
        },1000)
        return clearInterval(inter)
    })
    return <header>
        <h1>{game.name}</h1>
        <span>
            {time}
        </span>
    </header>
}