import React, {useState, useEffect, useRef} from 'react'
import Styled from 'styled-components'

const viewHeight = 100
const accelHi = 1.3
const accelLo = -1.8

const Helicopter = ({mouseState, gameState}) => {
    const [currentHeight, setCurrentHeight] = useState(viewHeight/2)

    const accelerationRef = useRef(0)
    const accelerationTarRef = useRef(accelLo)
    const velocityRef = useRef(0)
    const timeRef = useRef(0)
    const rotRef = useRef(0)

    useEffect(()=>{
        if(gameState){
            mouseState ? accelerationTarRef.current = accelHi : accelerationTarRef.current = accelLo
            requestAnimationFrame(animateAcceleration)
        }
    }, [mouseState])
    useEffect(()=>{
        requestAnimationFrame(animate)
    },[])

    const animateAcceleration = (time) =>{
        const direction = Math.abs(accelerationRef.current) / accelerationRef.current
        rotRef.current = Math.abs(accelerationRef.current/accelerationTarRef.current) * 20 * direction * -1
        if(accelerationRef.current===accelerationTarRef.current){
            requestAnimationFrame(animateAcceleration)
            return
        }

        if(accelerationRef.current < accelerationTarRef.current){
            accelerationRef.current = accelerationRef.current + .01
            if(accelerationRef.current > accelerationTarRef.current){accelerationRef.current = accelerationTarRef.current}
            requestAnimationFrame(animateAcceleration)

            return
        }
        if(accelerationRef.current > accelerationTarRef.current){
            accelerationRef.current = accelerationRef.current - .01
            if(accelerationRef.current < accelerationTarRef.current){accelerationRef.current = accelerationTarRef.current}
            requestAnimationFrame(animateAcceleration)

            return
        }
    }

    const animate = (time) => {
        const realTime = (timeRef.current - time)/1000
        velocityRef.current = velocityRef.current + realTime*accelerationRef.current
        const height = velocityRef.current*realTime + (accelerationRef.current*(realTime^2))/2
        setCurrentHeight((h)=> height+h)

        requestAnimationFrame(animate)
        timeRef.current = time
    }

    //console.log(`H:${currentHeight.toFixed(2)} V:${velocityRef.current.toFixed(2)} A:${accelerationRef.current.toFixed(2)}`)

    const Body = Styled.div({
        width: 100,
        height: 50,
        backgroundColor: 'white',
        position: 'fixed',
        bottom: (currentHeight/viewHeight)*window.innerHeight,
        left: window.innerWidth/5,
        transform: `rotate(${rotRef.current}deg)`
    })



    return (
        <Body/>
    )
}

export default Helicopter