import 'zone.js'
import uuid from 'uuid/v4'

// Middleware for injecting req and uuid to current zone.
export const withZone = async (ctx, next) => {
  const requestZone = Zone.current.fork({name: 'request'})
  await requestZone.run(async () => {
    // init zone at each request.
    Zone.current.req = ctx.req
    Zone.current.uuid = uuid()
    await next()
  })
}

export default withZone
