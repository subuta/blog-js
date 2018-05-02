import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {channel, channelList} from 'src/views/utils/schema'

export const index = (params) => {
  return request.get(`/channels`, {params})
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
export const showByName = (name) => {
  return request.get(`/channels/name/${name}`)
}
/* mat Custom action [end] */

let actions = {
  index,
  show,
  create
}

/* mat Custom exports [start] */
actions = {
  ...actions,
  showByName
}
/* mat Custom exports [end] */

export default actions
