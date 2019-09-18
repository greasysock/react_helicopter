import React, {useContext} from 'react'
import Styled from 'styled-components'

import GameStateContext from '../contexts/GameStateContext'

const right = window.innerWidth / 10
const bottom = window.innerHeight / 29

const ScoreBox = Styled.div({
    position: 'fixed',
    right,
    bottom,
    color: 'black',
    fontSize: `${window.innerHeight/26}px`
})

const Score = () => {
    const {gameScore} = useContext(GameStateContext) 
    return (
        <ScoreBox>
            {gameScore()}m
        </ScoreBox>
        )
}

export default Score