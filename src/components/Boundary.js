import React, {useContext} from 'react'
import Styled from 'styled-components'

import PlayerHeightContext from '../contexts/PlayerHeightContext'
import GameStateContext from '../contexts/GameStateContext'

const UpperBound = Styled.div({
    width: window.innerWidth,
    height: window.innerHeight / 10,
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
})

const LowerBound = Styled.div({
    width: window.innerWidth,
    height: window.innerHeight / 10,
    backgroundColor: 'white',
    position: 'fixed',
    bottom: 0,
})

const Boundary = (props) => {
    const {playerHeight} = useContext(PlayerHeightContext)
    const {resetGame} = useContext(GameStateContext)
    if((playerHeight > window.innerHeight * (8/10))||(playerHeight < window.innerHeight * (1/10))){
        resetGame()
    }
    return(
        <div>
            <UpperBound/>
            {props.children}
            <LowerBound/>
        </div>
    )
}

export default Boundary