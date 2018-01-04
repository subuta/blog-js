import uuid from 'uuid/v4'
import _ from 'lodash'
import {getSignedUrl} from 'src/utils/s3'
import Router from 'koa-router'
import lodash from '_'

const attachment = new Router()

attachment.post('/', async (ctx) => {
  const {Attachment} = ctx.state.models
  const {attachment} = ctx.request.body

  let params = {}

  /* mat Before create [start] */
  const ext = path.extname(name)

  const id = uuid()
  const tmpFileName = `${id}${ext}`

  const result = await getSignedUrl(tmpFileName, attachment.type)
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
  routes: () => _.cloneDeep(attachment.routes()),
  register: (routers) => {}
}
