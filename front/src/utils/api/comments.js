// api
import _ from 'lodash'
import request from 'src/utils/request'

import { normalize } from 'normalizr'

import {
  comment,
  commentList
} from 'src/utils/schema'

export const index = () => {
  return request.get(`/comments`).then(data => normalize(data, commentList))
}

export const create = (params) => {
  return request.post(`/comments`, {comment: params}).then(data => normalize(data, comment))
}

export default {
  index,
  create
}