import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {tag, tagList} from 'src/views/utils/schema'

export const index = (params) => {
  return request.get(`/tags`, {params})
}

/* mat Custom action [start] */
export const showByLabel = (label) => {
  return request.get(`/tags/${label}`)
}
/* mat Custom action [end] */

let actions = {
  index
}

/* mat Custom exports [start] */
actions = {
  ...actions,
  showByLabel
}
/* mat Custom exports [end] */

export default actions
