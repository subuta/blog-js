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
export const upload = (file, signedRequest, url) => {
  return request.put(signedRequest, file).then((response) => {
    return response.data
  })
}
/* mat Custom action [end] */

let actions = {
  create
}

/* mat Custom exports [start] */
actions = {
  ...actions,
  upload
}
/* mat Custom exports [end] */

export default actions
