import load from 'src/model'

export default async (ctx, next) => {
  // expose waterline model to context.
  ctx.state.models = await load()
  return next()
}
