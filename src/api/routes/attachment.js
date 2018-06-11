import uuid from 'uuid/v4'
import path from 'path'
import {getSignedUrl} from 'src/api/utils/s3'
import Router from 'koa-router'
import _ from 'lodash'
import {authenticate as auth} from 'src/api/middlewares/auth'



const attachment = new Router({
  prefix: '/attachments'
})

attachment.post('/', auth, async (ctx) => {
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
attachment.post('/sign', auth, async (ctx) => {
  const {attachment} = ctx.request.body

  const ext = path.extname(attachment.name)

  const id = uuid()
  const tmpFileName = `attachment/${id}${ext}`

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
