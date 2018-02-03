import _ from 'lodash'
import request from 'src/utils/request'
import {normalize} from 'normalizr'
import {comment, commentList} from 'src/utils/schema'

export const index = () => {
  return request.get(`/comments`).then((data) => normalize(data, commentList))
}

export const create = (params) => {
  return request
    .post(`/comments`, {
      comment: params
    })
    .then((data) => normalize(data, comment))
}

export const destroy = (id) => {
  return request.delete(`/comments/${id}`)
}

/* mat Custom action [start] */
/* mat Custom action [end] */

let actions = {
  index,
  create,
  destroy
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */

export default actions
