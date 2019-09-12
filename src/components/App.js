import React, {useState} from 'react'
import Background from './Background'
import Helicopter from './Helicopter'

const App = (props) => {
  const [mouseState, setMouseState] = useState(false)
  const [gameState, setGameState] = useState(false)

  return (
    <Background onKeyPress={(event)=>{console.log(event.keyCode)}} onMouseDown={()=>{setMouseState(true);setGameState(true)}} onMouseUp={()=>setMouseState(false)}>
      <Helicopter mouseState={mouseState} gameState={gameState}/>
    </Background>
  )
}

export default App