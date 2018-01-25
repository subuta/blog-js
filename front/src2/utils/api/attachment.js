import _ from 'lodash'
import request from 'src/utils/request'
import {normalize} from 'normalizr'
import {attachment, attachmentList} from 'src/utils/schema'

export const create = (params) => {
  return request
    .post(`/attachments`, {
      attachment: params
    })
    .then((data) => normalize(data, attachment))
}

/* mat Custom action [start] */
/* mat Custom action [end] */

let actions = {
  create
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */

export default actions
