import _ from 'lodash'
import request from 'src/views/utils/request'
import {normalize} from 'normalizr'
import {tag, tagList} from 'src/views/utils/schema'

export const index = () => {
  return request.get(`/tags`)
}

/* mat Custom action [start] */
/* mat Custom action [end] */

let actions = {
  index
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */

export default actions
