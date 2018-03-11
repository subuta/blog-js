import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {comment, commentList} from 'src/views/utils/schema'

export const index = (params) => {
  const {channelId} = params
  return request.get(`/channels/${channelId}/comments`)
}

export const create = (params) => {
  return request.post(`/channels/${params.channelId}/comments`, {
    comment: params
  })
}

export const update = (id, params) => {
  return request.put(`/channels/${params.channelId}/comments/${id}`, {
    comment: params
  })
}

export const destroy = (id, params) => {
  return request.delete(`/channels/${params.channelId}/comments/${id}`)
}

/* mat Custom action [start] */
/* mat Custom action [end] */

let actions = {
  index,
  create,
  update,
  destroy
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */

export default actions
