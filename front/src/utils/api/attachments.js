// api
import axios from 'axios'

import _ from 'lodash'
import request from 'src/utils/request'

import { normalize } from 'normalizr'

import {
  attachment,
  attachmentList
} from 'src/utils/schema'

export const create = (params) => {
  return request.post(`/attachments`, {attachment: params}).then(data => {
    const normalized = normalize(data.attachment, attachment)
    return {
      result: data.result,
      normalized
    }
  })
}

export const upload = (file, signedRequest, url) => {
  const config = {
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log('percentCompleted = ', percentCompleted)
    }
  }
  return axios.put(signedRequest, file, config).then((response) => {
    return response.data
  })
}

export default {
  create,
  upload
}
