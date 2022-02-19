import { createContext, Dispatch } from 'react'
import { IAction } from 'src/context/game/store/actions'
import { IState } from 'src/context/game/store/types'

export const GameContext = createContext<{
  state: IState
  dispatch: Dispatch<IAction>
}>(undefined as never)
