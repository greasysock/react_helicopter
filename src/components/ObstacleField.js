import React, {useState, useEffect, useRef, useCallback} from 'react'
import useAnimationFrame from '../hooks/useAnimationFrame'

const getRandomHeight = () => {
    return window.innerHeight/(Math.random()*5+1)
}

const blockWidth = window.innerHeight/10
const blockHeight = window.innerHeight/3.5

const Obstacle = ({spawnCallback, destroyCallback, childKey}) => {
    const [right, setRight] = useState(-200)
    const [top] = useState(getRandomHeight())
    const spawnRef = useRef(false)    

    const animate = (deltaTime) => {
        const frameTime = deltaTime / 3
        setRight((r)=> r+frameTime)
    }
    useAnimationFrame(animate)

    if((right >= window.innerHeight/2.2) && !spawnRef.current){
        spawnCallback()
        spawnRef.current = true
    }
    if(right >= window.innerWidth){
        destroyCallback(childKey)
    }

    return (
        <div style={{
            width: blockWidth,
            height: blockHeight,
            position: 'fixed',
            right,
            top,
            background: 'white'
        }}/>
    )
}

const ObstacleField = ({gameState}) => {
    const [gameObstacles, setGameObstacles] = useState([])
    const objectsRef = useRef(0)

    const spawnCallback = useCallback(() => {
        setGameObstacles((obstacles)=>{
            objectsRef.current++
            obstacles.push(<Obstacle gameState={gameState} destroyCallback={destroyCallback} spawnCallback={spawnCallback} childKey={objectsRef.current} key={objectsRef.current}/>)
            return obstacles
        })
    }, [gameState])

    useEffect(()=>{
        if(gameState){
            spawnCallback()
        }
        return () => {
            setGameObstacles([])
        }
    },[gameState, spawnCallback])

    const destroyCallback = (key) => {
        setGameObstacles((obstacles) => obstacles.filter((obstacle)=>{
            return obstacle.props.childKey !== key
        }))
    }
    return gameObstacles
}

export default ObstacleField