import uuid from 'uuid/v4'
import path from 'path'
import {getSignedUrl} from 'src/utils/s3'
import Router from 'koa-router'
import _ from 'lodash'

const attachments = new Router()

attachments.post('/', async (ctx) => {
  const {Attachment} = ctx.state.models
  const {attachment} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  const ext = path.extname(attachment.name)

  const id = uuid()
  const tmpFileName = `${id}${ext}`

  const result = await getSignedUrl(tmpFileName, attachment.type)

  params = {
    id,
    url: result.url
  }
  /* mat Before create [end] */

  let response = await Attachment.query()
    .insert({
      ...attachment,
      ...params
    })
    .eager('')

  /* mat After create [start] */
  response = {
    result,
    attachment: response
  }
  /* mat After create [end] */

  ctx.body = response
})

export default {
  routes: () => _.cloneDeep(attachments.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
