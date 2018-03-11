import _ from 'lodash'
import {combineReducers} from 'redux'
import {createSelector} from 'reselect'

// -------------
// Constants
// -------------
export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'

// -------------
// ActionCreators
// -------------
export const showMenu = () => {
  return {
    type: SHOW_MENU
  }
}

export const hideMenu = () => {
  return {
    type: HIDE_MENU
  }
}

// -------------
// Reducers
// -------------
export const isShowMenu = (state = false, action) => {
  if (action.type === SHOW_MENU) {
    return true
  } else if (action.type === HIDE_MENU) {
    return false
  }
  return state
}

let reducers = {
  isShowMenu
}

export default combineReducers(reducers)

// -------------
// Selectors
// -------------
export const getIsShowMenu = (state) => state.ui.isShowMenu
