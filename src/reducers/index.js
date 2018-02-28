import { combineReducers } from 'redux'

export const reset = (initialState) => ({
  type: '@@RESET',
  payload: initialState
})

const counter = (state = 0, action) => {
  if (action.type === 'increment') {
    return state + 1
  } else if (action.type === 'decrement') {
    return state - 1
  }
  return state
}

const appReducer = combineReducers({
  counter
})

export default function rootReducer (state, action) {
  if (action.type === '@@RESET') {
    state = action.payload || undefined
  }

  return appReducer(state, action)
}