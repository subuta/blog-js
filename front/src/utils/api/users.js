// api
import _ from 'lodash'
import request from 'src/utils/request'

import { normalize } from 'normalizr'

import {
  user,
  userList
} from 'src/utils/schema'

export const update = (params) => {
  return request.put(`/users/me`, {user: params}).then(data => normalize(data, user))
}

export const me = () => {
  return request.get(`/users/me`).then(data => {
    if (!data) return
    return normalize(data, user)
  })
}

export default {
  update,
  me
}
