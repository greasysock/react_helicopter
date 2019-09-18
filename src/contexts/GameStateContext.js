import React, {createContext, useState, useRef} from 'react'

const GameStateContext = createContext({gameState:false})

const GameStateProviderPartial = GameStateContext.Provider
export const GameStateProvider = (props) => {
    const [gameState, setGameState] = useState(false)
    const [touchState, setTouchState] = useState(false)
    const [gameTime, setGameTime] = useState(0)
    const touchDown = () =>{
        if(!gameState){
            setGameState(true)
            setGameTime(performance.now())
        }
        setTouchState(true)
    }
    const touchUp = () => {
        setTouchState(false)
    }
    const resetGame = () =>{
        setGameState(false)
        setGameTime(0)
    }
    const collision = () =>{
        resetGame()
    }
    const gameScore = () =>{
        if(gameState){
            return ((performance.now()-gameTime) / 52).toFixed(0)
        }
        return 0
    }
    return (
    <GameStateProviderPartial value={{
        gameState, 
        touchDown, 
        resetGame, 
        touchState, 
        touchUp,
        collision,
        gameScore
        }}>
        {props.children}
    </GameStateProviderPartial>
    )
}
export const GameStateConsumer = GameStateContext.Consumer

export default GameStateContext