import {combineReducers} from 'redux'
import _ from 'lodash'
import channel from './channel'
import article from './article'
import comment from './comment'
import attachment from './attachment'
import tag from './tag'
import user from './user'

const reducers = {
  channel,
  article,
  comment,
  attachment,
  tag,
  user
}

// extract entities from reducers.
export const fetchEntities = (state) => {
  return _.transform(
    state,
    (result, s, key) => {
      if (!s.entities) return
      result[key] = _.get(s, 'entities', {})
    },
    {}
  )
}

export default combineReducers({
  ...reducers
})
