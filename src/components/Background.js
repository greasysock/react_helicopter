import React, {useContext} from 'react'
import Styled from 'styled-components'
import GameStateContext from '../contexts/GameStateContext'

const BackgroundBlock = Styled.div({
    backgroundColor: 'black',
    width: window.innerWidth,
    height: window.innerHeight,
    overflow: 'hidden'
})

const Background = (props) => {
    const {touchDown, touchUp} = useContext(GameStateContext)
    return (
        <BackgroundBlock onMouseDown={touchDown} onMouseUp={touchUp}>
            {props.children}
        </BackgroundBlock>
    )
}

export default Background