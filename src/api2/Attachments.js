import Router from 'koa-router'
import _ from 'lodash'
const attachments = new Router()

attachment.post('/', async (ctx) => {
  const {Attachment} = ctx.state.models

  const {attachment} = ctx.request.body

  let params = {}

  ctx.body = await Attachment.query()
    .insert({
      ...attachment,
      ...params
    })
    .eager('')
})

export default {
  routes: () => _.cloneDeep(attachments.routes()),
  register: (routers) => {}
}
