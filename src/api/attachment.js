import uuid from 'uuid/v4'
import path from 'path'
import { getSignedUrl } from 'src/utils/s3'
import Router from 'koa-router'
import _ from 'lodash'

const attachment = new Router({
  prefix: '/attachments'
})

attachment.post('/', async (ctx) => {
  const {Attachment} = ctx.state.models
  const {attachment} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  /* mat Before create [end] */

  let response = await Attachment.query()
    .insert({
      ...attachment,
      ...params
    })
    .eager('')

  /* mat After create [start] */
  /* mat After create [end] */

  ctx.body = response
})

/* mat Custom actions [start] */
// call getSignedUrl before upload file.
attachment.post('/sign', async (ctx) => {
  const {attachment} = ctx.request.body

  /* mat Before create [start] */
  const ext = path.extname(attachment.name)

  const id = uuid()
  const tmpFileName = `${id}${ext}`

  let result = await getSignedUrl(tmpFileName, attachment.type)
  ctx.body = {
    ...result,
    id
  }
})
/* mat Custom actions [end] */

export default {
  routes: () => _.cloneDeep(attachment.routes()),
  register: (routers) => {
    /* mat Register [start] */
    /* mat Register [end] */
  }
}
