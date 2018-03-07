import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {article, articleList} from 'src/views/utils/schema'

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
export const filterByTagId = (tagId) => {
  return request.get(`/articles?tagId=${tagId}`)
}
/* mat Custom action [end] */

let actions = {
  index,
  show,
  create,
  update,
  destroy
}

/* mat Custom exports [start] */
actions = {
  ...actions,
  filterByTagId
}
/* mat Custom exports [end] */

export default actions
