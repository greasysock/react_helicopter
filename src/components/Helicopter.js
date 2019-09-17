import React, {useState, useEffect, useRef, useCallback} from 'react'
import useAnimationFrame from '../hooks/useAnimationFrame'

const viewHeight = 15
const accelHi = 6.3
const accelLo = -9.8
const helicopterWidth = window.innerHeight/6
const helicopterHeight = window.innerHeight/12
const helicopterLeft = window.innerWidth/5

const Helicopter = ({mouseState, gameState}) => {
    const [currentHeight, setCurrentHeight] = useState(viewHeight/2)

    const accelerationRef = useRef(0)
    const accelerationTarRef = useRef(0)
    const velocityRef = useRef(0)
    const rotRef = useRef(0)

    const animate = useCallback((deltaTime) => {
        const realTime = (deltaTime)/1000
        velocityRef.current = velocityRef.current + realTime*accelerationRef.current
        const height = velocityRef.current*realTime + (accelerationRef.current*(realTime.toExponential(2)))/2
        setCurrentHeight((h)=> height+h)
    }, [])

    const animateAcceleration = useCallback((deltaTime) =>{
        const direction = Math.abs(accelerationRef.current) / accelerationRef.current
        rotRef.current = Math.abs(accelerationRef.current/accelerationTarRef.current) * 20 * direction * -1
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
            mouseState ? accelerationTarRef.current = accelHi : accelerationTarRef.current = accelLo
        }
    }, [mouseState, animateAcceleration, gameState])
    
    const bottom = (currentHeight/viewHeight)*window.innerHeight
    const transform = `rotate(${rotRef.current}deg)`

    return (
        <div
            style={{
                width: helicopterWidth,
                height: helicopterHeight,
                backgroundColor: 'white',
                position: 'fixed',
                bottom,
                left: helicopterLeft,
                transform
            }}
        />
    )
}

export default Helicopter