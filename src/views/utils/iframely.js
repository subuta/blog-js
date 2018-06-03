import axios from 'axios'

// SEE: https://iframely.com/docs/oembed-api
const IFRAMELY_ENDPOINT = process.env.IFRAMELY_ENDPOINT || 'http://localhost:8061'

export const oembed = (url) => axios.get(`${IFRAMELY_ENDPOINT}/oembed`, {
  params: {url}
}).then(({data}) => data)

export default (url) => axios.get(`${IFRAMELY_ENDPOINT}/iframely`, {
  params: {url}
}).then(({data}) => data)
