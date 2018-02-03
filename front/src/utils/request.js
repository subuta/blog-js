import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import _ from 'lodash'
import {saveAs} from 'file-saver'
import auth0 from 'src/utils/auth0'

// switch baseURL
let baseURL = `${window.location.origin}/api`

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000/api'
} else if (process.env.NODE_ENV === 'test') {
  // set httpAdapter while testing.
  baseURL = 'http://localhost:3000/api'
  axios.defaults.adapter = httpAdapter
}

const request = axios.create({
  baseURL
})

// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    const {accessToken} = auth0.getSession()
    // add jwt to header
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function(response) {
    const {config, data, headers} = response

    if (config.responseType === 'blob') {
      const contentDisposition = headers['content-disposition']
      const isAttachment = _.startsWith(
        contentDisposition.toLowerCase(),
        'attachment'
      )
      if (!isAttachment) return response.data

      // for file-download
      const fileName =
        _.trim(contentDisposition.split('filename=')[1], '"') || null
      saveAs(data, fileName)
    }

    return response.data
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error.response)
  }
)

export default request
