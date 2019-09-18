import React, {useEffect, useRef, useCallback, useContext} from 'react'
import useAnimationFrame from '../hooks/useAnimationFrame'
import PlayerHeightContext from '../contexts/PlayerHeightContext'
import GameStateContext from '../contexts/GameStateContext'
import GameConstantsContext from '../contexts/GameConstantsContext'

const Helicopter = () => {
    const {playerHeight, setPlayerHeight, resetHeight} = useContext(PlayerHeightContext)
    const {gameState, touchState} = useContext(GameStateContext)
    const {helicopter} = useContext(GameConstantsContext)

    const accelerationRef = useRef(0)
    const accelerationTarRef = useRef(0)
    const velocityRef = useRef(0)
    const rotRef = useRef(0)

    const animate = useCallback((deltaTime) => {
        const realTime = (deltaTime)/1000
        velocityRef.current = velocityRef.current + realTime*accelerationRef.current
        const height = (velocityRef.current*realTime + (accelerationRef.current*(realTime.toExponential(2)))/2) * helicopter.viewHeight
        setPlayerHeight((h)=> height+h)
    }, [setPlayerHeight, helicopter.viewHeight])

    const animateAcceleration = useCallback((deltaTime) =>{
        const direction = Math.abs(accelerationRef.current) / accelerationRef.current
        rotRef.current = Math.abs(accelerationRef.current/accelerationTarRef.current) * 12 * direction * -1
        if(accelerationRef.current===accelerationTarRef.current){
            return
        }

        if(accelerationRef.current < accelerationTarRef.current){
            accelerationRef.current = accelerationRef.current + .1 * deltaTime
            if(accelerationRef.current > accelerationTarRef.current){accelerationRef.current = accelerationTarRef.current}
            return
        }
        if(accelerationRef.current > accelerationTarRef.current){
            accelerationRef.current = accelerationRef.current - .1 * deltaTime
            if(accelerationRef.current < accelerationTarRef.current){accelerationRef.current = accelerationTarRef.current}
            return
        }
    }, [])

    useAnimationFrame(animate)
    useAnimationFrame(animateAcceleration)

    useEffect(()=>{
        if(gameState){
            touchState ? accelerationTarRef.current = helicopter.accelerationHigh : accelerationTarRef.current = helicopter.accelerationLow
        }else{
            resetHeight()
            accelerationRef.current = 0
            accelerationTarRef.current = 0
            velocityRef.current = 0
            rotRef.current = 0
        }
    }, [touchState, animateAcceleration, gameState, helicopter.accelerationLow, helicopter.accelerationHigh, resetHeight])
    
    const bottom = (playerHeight)
    const transform = `rotate(${rotRef.current}deg)`

    return (
        <div
            style={{
                width: helicopter.width,
                height: helicopter.height,
                backgroundColor: 'white',
                position: 'fixed',
                bottom,
                left: helicopter.left,
                transform
            }}
        />
    )
}

export default Helicopter