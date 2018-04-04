import _ from 'lodash'

export default async (ctx, next) => {
  await next()
  const method = _.toUpper(_.get(ctx, 'request.method'))
  const status = _.get(ctx, 'response.status')

  // ignore non 2XX status.
  if (status >= 300) return

  // throw 404 if response body of GET request is 'undefined'.
  if (method === 'GET' && !ctx.body) {
    return ctx.throw(404, {
      message: 'Resource Not Found'
    })
  }
}
