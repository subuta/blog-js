import _ from 'lodash'

export default async (ctx, next) => {
  await next()
  const method = _.toUpper(_.get(ctx, 'request.method'))
  // throw 404 if response body of GET request is 'undefined'.
  if (method === 'GET' && !ctx.body) {
    return ctx.throw(404, {
      message: 'Resource Not Found'
    })
  }
}
