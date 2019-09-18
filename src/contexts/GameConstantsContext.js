import {createContext} from 'react'

const gameConstants = {
    helicopter: {
        width: window.innerHeight/6,
        height: window.innerHeight/12,
        left: window.innerWidth/5,
        right: window.innerWidth * (4/5),
        accelerationHigh: 6.3,
        accelerationLow: -9.8,
        viewHeight: 48
    },
    global: {
        speed: 1/2
    },
    obstacle: {
        width: window.innerHeight/10,
        height: window.innerHeight/3.5
    }
}

export default createContext(gameConstants)