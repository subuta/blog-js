import _ from 'lodash'
import request from 'src/utils/request'
import {normalize} from 'normalizr'
import {article, articleList} from 'src/utils/schema'

export const index = () => {
  return request.get(`/articles`)
}

export const show = (id) => {
  return request.get(`/articles/${id}`)
}

export const create = (params) => {
  return request.post(`/articles`, {
    article: params
  })
}

export const update = (id, params) => {
  return request.put(`/articles/${id}`, {
    article: params
  })
}

export const destroy = (id) => {
  return request.delete(`/articles/${id}`)
}

/* mat Custom action [start] */
/* mat Custom action [end] */

let actions = {
  index,
  show,
  create,
  update,
  destroy
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */

export default actions
