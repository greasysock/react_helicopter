import React, {useState} from 'react'
import Background from './Background'
import Helicopter from './Helicopter'
import Boundary from './Boundary'
import ObstacleField from './ObstacleField'

const App = (props) => {
  const [mouseState, setMouseState] = useState(false)
  const [gameState, setGameState] = useState(false)

  return (
    <Background onTouchStart={()=>{setMouseState(true);setGameState(true)}} onTouchEnd={()=>{setMouseState(false)}} onKeyPress={(event)=>{console.log(event.keyCode)}} onMouseDown={()=>{setMouseState(true);setGameState(true)}} onMouseUp={()=>setMouseState(false)}>
      <Boundary>
        <Helicopter mouseState={mouseState} gameState={gameState}/>
        <ObstacleField gameState={gameState}/>
      </Boundary>
    </Background>
  )
}

export default App