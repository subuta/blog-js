export default async (ctx, next) => {
  await next()
  // throw 404 if body undefined.
  if (!ctx.body) {
    return ctx.throw(404, {
      message: 'Resource Not Found'
    })
  }
}
