import React, {useState, useEffect, useRef} from 'react'
import Styled from 'styled-components'

const viewHeight = 15
const accelHi = 6.3
const accelLo = -9.8

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
            accelerationRef.current = accelerationRef.current + .1
            if(accelerationRef.current > accelerationTarRef.current){accelerationRef.current = accelerationTarRef.current}
            requestAnimationFrame(animateAcceleration)

            return
        }
        if(accelerationRef.current > accelerationTarRef.current){
            accelerationRef.current = accelerationRef.current - .1
            if(accelerationRef.current < accelerationTarRef.current){accelerationRef.current = accelerationTarRef.current}
            requestAnimationFrame(animateAcceleration)

            return
        }
    }

    const animate = (time) => {
        const realTime = (time-timeRef.current)/1000
        velocityRef.current = velocityRef.current + realTime*accelerationRef.current
        const height = velocityRef.current*realTime + (accelerationRef.current*(realTime.toExponential(2)))/2


        //console.log((accelerationRef.current*(realTime.toExponential(2)))/2)
        setCurrentHeight((h)=> height+h)

        requestAnimationFrame(animate)
        timeRef.current = time
    }

    //console.log(`T: ${timeRef.current.toPrecision(3)} H:${currentHeight.toFixed(2)} V:${velocityRef.current.toFixed(2)} A:${accelerationRef.current.toFixed(2)}`)

    const Body = Styled.div({
        width: window.innerHeight/6,
        height: window.innerHeight/12,
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