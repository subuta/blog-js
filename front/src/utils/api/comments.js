// api
import _ from 'lodash'
import request from 'src/utils/request'

import { normalize } from 'normalizr'

import {
  comment,
  commentList
} from 'src/utils/schema'

export const indexByChannel = (channelId) => {
  return request.get(`/channels/${channelId}/comments`).then(data => normalize(data, commentList))
}

export const create = (channelId, params) => {
  return request.post(`/channels/${channelId}/comments`, {comment: params}).then(data => normalize(data, comment))
}

export default {
  indexByChannel,
  create
}
