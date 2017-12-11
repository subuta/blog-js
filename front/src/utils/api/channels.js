// api
import _ from 'lodash'
import request from 'src/utils/request'

import { normalize } from 'normalizr'

import {
  channel,
  channelList
} from 'src/utils/schema'

export const index = () => {
  return request.get(`/channels`).then(data => normalize(data, channelList))
}

export const show = (id) => {
  return request.get(`/channels/${id}`).then(data => normalize(data, channel))
}

export const create = (params) => {
  return request.post(`/channels`, {channel: params}).then(data => normalize(data, channel))
}

export default {
  index,
  show,
  create
}
