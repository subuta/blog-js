import _ from 'lodash'
import request from 'src/utils/request'
import {normalize} from 'normalizr'
import {attachment, attachmentList} from 'src/utils/schema'

export const create = (params) => {
  return request.post(`/attachments`, {
    attachment: params
  })
}

/* mat Custom action [start] */
export const upload = (file, signedRequest, url) => {
  return request.put(signedRequest, file)
}

// get Signed-URL before upload to S3.
export const sign = (params) => {
  return request.post('/attachments/sign', {
    attachment: params
  })
}
/* mat Custom action [end] */

let actions = {
  create
}

/* mat Custom exports [start] */
actions = {
  ...actions,
  upload,
  sign
}
/* mat Custom exports [end] */

export default actions
