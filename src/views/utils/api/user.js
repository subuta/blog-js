import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {user, userList} from 'src/views/utils/schema'

/* mat Custom action [start] */
export const update = (params) => {
  return request.put(`/users/me`, {user: params}).then(data => {
    return normalize(data, user)
  })
}

export const me = () => {
  return request.get(`/users/me`).then(data => {
    if (!data) return
    return normalize(data, user)
  })
}

export const create = (params) => {
  return request.post(`/users/me`, {user: params}).then(data => {
    return normalize(data, user)
  })
}
/* mat Custom action [end] */

let actions = {}

/* mat Custom exports [start] */
actions = {
  ...actions,
  update,
  me,
  create
}
/* mat Custom exports [end] */

export default actions
