import React, {createContext, useState} from 'react'

const initialHeight = window.innerHeight/2

const PlayerHeightContext = createContext({playerHeight:initialHeight})

const PlayerHeightProviderPartial = PlayerHeightContext.Provider
export const PlayerHeightProvider = (props) => {
    const [playerHeight, setPlayerHeight] = useState(initialHeight)

    const resetHeight = () => {
        setPlayerHeight(initialHeight)
    }
    return (
    <PlayerHeightProviderPartial value={{playerHeight, setPlayerHeight, resetHeight}}>
        {props.children}
    </PlayerHeightProviderPartial>
    )
}
export const PlayerHeightConsumer = PlayerHeightContext.Consumer

export default PlayerHeightContext