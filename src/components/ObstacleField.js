import React, {useState, useEffect, useRef, useCallback, useContext} from 'react'
import useAnimationFrame from '../hooks/useAnimationFrame'
import PlayerHeightContext from '../contexts/PlayerHeightContext'
import GameStateContext from '../contexts/GameStateContext'
import GameConstantsContext from '../contexts/GameConstantsContext'

const getRandomHeight = () => {
    return window.innerHeight/(Math.random()*5+1)
}

const Obstacle = ({spawnCallback, destroyCallback, childKey}) => {
    const [right, setRight] = useState(-200)
    const [top] = useState(getRandomHeight()) 
    const spawnRef = useRef(false)
    const {obstacle, global, helicopter} = useContext(GameConstantsContext)
    const {collision} = useContext(GameStateContext)
    const {playerHeight} = useContext(PlayerHeightContext)

    if((top <= playerHeight) && (top+obstacle.height >= playerHeight)){
        if((right >= helicopter.right-helicopter.width-obstacle.width)&&(right<=helicopter.right+obstacle.width)) {
            collision()
        }
    }
    
    const animate = (deltaTime) => {
        const frameTime = deltaTime * global.speed
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
        <>
        <div style={{
            width: obstacle.width,
            height: obstacle.height,
            position: 'fixed',
            right,
            bottom:top,
            background: 'white'
        }}/>
        </>
    )
}

const ObstacleField = () => {
    const [gameObstacles, setGameObstacles] = useState([])
    const objectsRef = useRef(0)
    const {gameState} = useContext(GameStateContext)
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