import React, {useState, useEffect, useRef} from 'react'
import Styled from 'styled-components'

const getRandomHeight = () => {
    return window.innerHeight/(Math.random()*5+1)
}

const Obstacle = ({gameState, spawnCallback, destroyCallback, childKey}) => {
    const [right, setRight] = useState(-200)
    const [top, setTop] = useState(getRandomHeight())
    const rightRef = useRef(-200)
    const spawnRef = useRef(false)
    useEffect(()=>{
        if(gameState){        
            requestAnimationFrame(animate)
        }
    },[gameState])

    const animate = (time) => {
        if(rightRef.current < window.innerWidth){
            setRight((r)=> r+14)
            rightRef.current = rightRef.current + 14
            requestAnimationFrame(animate)
        }
    }

    const Block = Styled.div({
    width:  window.innerHeight/10,
    height: window.innerHeight/3.5,
    position: 'fixed',
    right,
    top,
    background: 'white'}
    )

    if((right >= window.innerHeight/2.2) && !spawnRef.current){
        spawnCallback()
        spawnRef.current = true
    }
    if(right >= window.innerWidth){
        destroyCallback(childKey)
    }


    return (
        <Block right={right} height={100}/>
    )
}

const ObstacleField = ({gameState}) => {
    const [gameObstacles, setGameObstacles] = useState([])
    const objectsRef = useRef(1)
    useEffect(()=>{
        const obstacles = []
        obstacles.push(<Obstacle gameState={gameState} destroyCallback={destroyCallback} spawnCallback={spawnCallback} childKey={objectsRef.current} key={objectsRef.current}/>)
        objectsRef.current++
        setGameObstacles(obstacles)
    },[gameState])

    const spawnCallback = () => {
        setGameObstacles((obstacles)=>{
            objectsRef.current++
            obstacles.push(<Obstacle gameState={gameState} destroyCallback={destroyCallback} spawnCallback={spawnCallback} childKey={objectsRef.current} key={objectsRef.current}/>)
            return obstacles
        })
    }
    const destroyCallback = (key) => {
        setGameObstacles((obstacles) => obstacles.filter((obstacle)=>{
            return obstacle.props.childKey !== key
        }))
    }
    return gameObstacles
}

export default ObstacleField