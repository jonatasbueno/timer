import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

// this interface has all methods and all properties, that will be used in the creacted context
interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  interruptCurrentCycle: () => void
  createNewCycle: (data: CreateCycleData) => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

// created context with object empty
export const CycleContext = createContext({} as CycleContextType) // using 'as' to force type

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  /** O terceiro parâmetro do useReducer é um callback que será executado uma única vez em sua construção,
   * o returno dessa função será o INITIAL_STATE
   */
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (inititalState) => {
      // essa função recebe como parametro o estado inicial definito no segundo paramtro do useReducer
      const stateAsJson = localStorage.getItem('@timer:cycles-state-1.0.0')

      if (stateAsJson) return JSON.parse(stateAsJson)

      return inititalState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle)
      return differenceInSeconds(
        new Date(),
        /** 'new Date' tenta transformar o parametro em uma data,
         * caso o parâmetro já seja uma data válida ele não será executado
         */
        new Date(activeCycle.startDate),
      )
    return 0
  })

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)

    /** dica para salvar no localstorage
     * iniciando com '@'
     * nome do app
     * nome do recurso
     * versão do recurso (isso evita que pessoa usando versoes antigas do softwares não sobre crash)
     */
    localStorage.setItem('@timer:cycles-state-1.0.0', stateJson)
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        interruptCurrentCycle,
        createNewCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
