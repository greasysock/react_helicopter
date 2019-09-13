import React from 'react'
import Styled from 'styled-components'

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
    return(
        <div>
            <UpperBound/>
            {props.children}
            <LowerBound/>
        </div>
    )
}

export default Boundary