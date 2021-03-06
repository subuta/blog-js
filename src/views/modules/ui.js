import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import storage from 'src/views/utils/storage'

// -------------
// Constants
// -------------
export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'
export const SET_UNREAD_COMMENT = 'SET_UNREAD_COMMENT'
export const REMOVE_UNREAD_COMMENT = 'REMOVE_UNREAD_COMMENT'
export const SET_EDITING_USERS = 'SET_EDITING_USERS'
export const REMOVE_EDITING_USER = 'REMOVE_EDITING_USER'

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

export const setUnreadComment = (channelId, commentId) => {
  return (dispatch, getState) => {
    const unreadComments = getUnreadComments(getState())
    // Skip if state has unreadComment for that channel already.
    if (unreadComments[channelId]) return

    storage.setItem(`unreadCommentId.${channelId}`, commentId)
    dispatch({
      type: SET_UNREAD_COMMENT,
      payload: {
        channelId,
        commentId
      }
    })
  }
}

export const removeUnreadComment = (channelId) => {
  storage.removeItem(`unreadCommentId.${channelId}`)
  return {
    type: SET_UNREAD_COMMENT,
    payload: {
      channelId
    }
  }
}

export const setEditingUsers = (channelId, user) => {
  return {
    type: SET_EDITING_USERS,
    payload: {
      channelId,
      user
    }
  }
}

export const removeEditingUser = (channelId, user) => {
  return {
    type: REMOVE_EDITING_USER,
    payload: {
      channelId,
      user
    }
  }
}

// -------------
// Reducers
// -------------
// Menu state for mobile.
export const isShowMenu = (state = false, action) => {
  if (action.type === SHOW_MENU) {
    return true
  } else if (action.type === HIDE_MENU) {
    return false
  }
  return state
}

// Unread comment per channel.
export const unreadComments = (state = {}, action) => {
  if (action.type === SET_UNREAD_COMMENT) {
    const {channelId, commentId} = action.payload
    return {
      ...state,
      [channelId]: commentId
    }
  } else if (action.type === REMOVE_UNREAD_COMMENT) {
    const {channelId} = action.payload
    return _.omit(state, channelId)
  }
  return state
}

// Editing users per channel
export const editingUsers = (state = {}, action) => {
  if (action.type === SET_EDITING_USERS) {
    const {channelId, user} = action.payload
    const users = state[channelId] || []
    return {
      ...state,
      [channelId]: _.uniqBy([
        ...users,
        user
      ], 'id')
    }
  } else if (action.type === REMOVE_EDITING_USER) {
    const {channelId, user} = action.payload
    const users = state[channelId] || []
    return {
      ...state,
      [channelId]: _.without(users, user)
    }
  }
  return state
}

let reducers = {
  isShowMenu,
  unreadComments,
  editingUsers
}

export default combineReducers(reducers)

// -------------
// Selectors
// -------------
export const getIsShowMenu = (state) => state.ui.isShowMenu
export const getUnreadComments = (state) => state.ui.unreadComments
export const getEditingUsers = (state) => state.ui.editingUsers
