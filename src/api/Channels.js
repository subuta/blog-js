import Router from 'koa-router'
import _ from 'lodash'

const channels = new Router()

channels.get('/', async (ctx) => {
  const {Channel} = ctx.state.models
  ctx.body = await Channel.query()
})

channels.get('/:id', async (ctx) => {
  const {Channel} = ctx.state.models
  ctx.body = await Channel.query().first({id: ctx.params.id})
  // ctx.body = await Channel.findById(ctx.params.id, {
  //   include: [
  //     {
  //       model: models.Comment,
  //       include: [
  //         models.Attachment,
  //         {
  //           model: models.User,
  //           as: 'commentedBy'
  //         }
  //       ]
  //     }
  //   ]
  // })
})

channels.post('/', async (ctx) => {
  const {channel} = ctx.request.body
  const {Channel} = ctx.state.models
  ctx.body = await Channel.query().insert(channel)
})

// export default channels
export default {
  routes: () => _.cloneDeep(channels.routes()),
  register: (routers) => {
    channels.use('/:channelId/comments', routers.Comments.routes())
  }
}