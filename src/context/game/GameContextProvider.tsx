import { FC, useReducer } from 'react'
import { GameContext } from 'src/context/game/GameContext'
import { defaultState, reducer } from 'src/context/game/store/reducer'

export const GameContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// We need this because of dynamic imports
// eslint-disable-next-line import/no-default-export
export default GameContextProvider
