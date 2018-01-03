import Router from 'koa-router'
import _ from 'lodash'

const attachment = new Router()

attachment.post('/', async (ctx) => {
  const {Attachment} = ctx.state.models

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
  routes: () => _.cloneDeep(attachment.routes()),
  register: (routers) => {}
}
