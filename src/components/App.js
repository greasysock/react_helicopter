import React from 'react'

import Background from './Background'
import Helicopter from './Helicopter'
import Boundary from './Boundary'
import ObstacleField from './ObstacleField'
import Score from './Score'

import {PlayerHeightProvider} from '../contexts/PlayerHeightContext'
import {GameStateProvider} from '../contexts/GameStateContext'

const App = (props) => {
  return (
    <GameStateProvider>
    <PlayerHeightProvider>
    <Background>
      <Boundary>
        <Helicopter/>
        <ObstacleField/>
      </Boundary>
      <Score/>
    </Background>
    </PlayerHeightProvider>
    </GameStateProvider>
  )
}

export default App