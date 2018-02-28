import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {channel, channelList} from 'src/views/utils/schema'

export const index = () => {
  return request.get(`/channels`)
}

export const show = (id) => {
  return request.get(`/channels/${id}`)
}

export const create = (params) => {
  return request.post(`/channels`, {
    channel: params
  })
}

/* mat Custom action [start] */
/* mat Custom action [end] */

let actions = {
  index,
  show,
  create
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */

export default actions
