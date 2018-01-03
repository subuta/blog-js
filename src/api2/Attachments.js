import Router from 'koa-router'
import _ from 'lodash'
const attachments = new Router()

attachment.post('/', async (ctx) => {
  const {Attachment} = ctx.state.models

  const {attachment} = ctx.request.body

  let params = {}

  let response = await Attachment.query()
    .insert({
      ...attachment,
      ...params
    })
    .eager('')

  ctx.body = response
})

export default {
  routes: () => _.cloneDeep(attachments.routes()),
  register: (routers) => {}
}
