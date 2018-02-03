import _ from 'lodash'
import request from 'src/utils/request'
import {normalize} from 'normalizr'
import {channel, channelList} from 'src/utils/schema'

export const index = () => {
  return request.get(`/channels`).then((data) => normalize(data, channelList))
}

export const show = (id) => {
  return request.get(`/channels/${id}`).then((data) => normalize(data, channel))
}

export const create = (params) => {
  return request
    .post(`/channels`, {
      channel: params
    })
    .then((data) => normalize(data, channel))
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
